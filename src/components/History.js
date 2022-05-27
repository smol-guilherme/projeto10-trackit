import Header from './shared/Header';
import Footer from './shared/Footer';

import { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import axios from "axios";
import styled from "styled-components";
import UserContext from './context/UserContext';

const HISTORY_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

export default function History() {
    const { userContext, setUserContext } = useContext(UserContext);
    const [progressHistory, setProgressHistory] = useState([])

    useEffect(() => {
        let dataToken;
        if(!userContext.hasOwnProperty("token")) {
            let data = localStorage.getItem("login")
            data = JSON.parse(data)
            dataToken = data.token
            const newContext = { ...userContext }
            setUserContext({ newContext, token: dataToken, image: data.image })
        } else {
            dataToken = userContext.token
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${dataToken}`
            }
        }
        getHabitsList(config)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getHabitsList(config) {
        const promise = axios.get(HISTORY_URL, config);
        promise.then((res) => {
            const newProgress = setProgressToDate(res.data)
            setProgressHistory(newProgress)
        }).catch((err) => console.log(err.response.data))
    }

    function setProgressToDate(responseData) {
        const newProgress = []
        let doneAll = true;
        responseData.map((day) => {
            const habits = day.habits
            habits.map((habit) => {
                if(habit.done === false) {
                    doneAll = false
                    return habit
                }
                return habit
            })
            newProgress.push({...day, doneAll, hasHabit: true})
            doneAll = true
            return day
        })
        return newProgress
    }

    function displayProgress(date) {
        const dateMatch = dayjs(date).format("DD/MM/YYYY")
        let returnFlag = false;
        let returnComponent;
        progressHistory.map((history) => {
            if(history.day.includes(dateMatch)) {
                returnFlag = true
                returnComponent = (<DaysHabit hasHabit={history.hasHabit} doneAll={history.doneAll} >{dayjs(date).format("D")}</DaysHabit>)
            }
            return history;
        })
        if(returnFlag && dateMatch !== dayjs().format("DD/MM/YYYY"))
            return returnComponent
        return <DaysHabit hasHabit={false} >{dayjs(date).format("D")}</DaysHabit>
    }

    // function getProgress(config) {
    //     const promise = axios.get(URL+ROUTE_TODAY, config)
    //     promise.then((res) => {
    //         const count = res.data.filter((item) =>{
    //             if (item.done) {
    //                 return item
    //             }
    //             return null
    //         })
    //         const value = isNaN(Math.round((count.length/res.data.length)*100)) ? 0 : Math.round((count.length/res.data.length)*100)
    //         setProgress(value)
    //     });
    // }

    const Display = (() => {
        if(progressHistory.length > 0) {
            return (
                <CalendarWrapper
                    calendarType={"US"}
                    locale={"pt-br"}
                    onClickDay={(value) => console.log(value)}
                    formatDay={(locale, date) => displayProgress(date)}
                />)
            } else {
                return <Template>Em breve você poderá ver o histórico dos seus hábitos aqui!</Template>;
            }
        })
    
    return(
        <Content>
            <Header />
            <PageTop>
                <PageTitle>Histórico</PageTitle>
            </PageTop>
            <Display />
            <Footer />
        </Content>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 76vh;
    margin: 80px 0;
    padding: 0 2.5vw;
    font-size: 18px;
    color: #666666;
    background-color: #F2F2F2;
    box-sizing: border-box;
`

const PageTop = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 35px;
    margin-top: 15px;
    margin-bottom: 25px;
    justify-content: flex-end;
    align-items: flex-start;
`

const PageTitle = styled.h1`
    display: flex;
    font-size: 23px;
    color: #126BA5;
`

const DaysHabit = styled.div`
    display: flex;
    background-color: ${ ({ hasHabit, doneAll }) => hasHabit ? doneAll ? '#8CC654' : '#EA5766' : 'transparent' };
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${ ({ hasHabit }) => hasHabit ? "5px" : "0" };
    left: ${ ({ hasHabit }) => hasHabit ? "5px" : "0" };
    margin: 0;
    width: ${ ({ hasHabit }) => hasHabit ? "40px" : "50px" };
    height: ${ ({ hasHabit }) => hasHabit ? "40px" : "50px" };
    border-radius: ${ ({ hasHabit }) => hasHabit ? "50%" : "0" };
    border: none;
`

const Template = styled.p`
    display: flex;
    margin-bottom: 15px;
`

const CalendarWrapper = styled(Calendar)`
	font-family: 'Lexend Deca';
    border: none;
    border-radius: 8px;
    background-color: #FFFFFF;
    box-sizing: border-box;

    button {
        position: relative;
	    font-family: 'Lexend Deca';
        width: 50px;
        height: 50px;
        padding: 10px;
    }
`