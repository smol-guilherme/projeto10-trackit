import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/pt-br';

import { useState, useEffect, useContext } from 'react'

import Header from './shared/Header'
import Footer from './shared/Footer'

import axios from "axios";
import styled from "styled-components";
import UserContext from './context/UserContext';


const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
const ROUTE_TODAY = "/today"
const ROUTE_CHECK = "/check"
const ROUTE_UNCHECK = "/uncheck"

function Task({ handleCheck, index, task }) {
    const { highestSequence: highest , currentSequence: sequence, done, name } = task

    const color = (() => (highest !== 0 && sequence === highest && done) ? true : false)
    const Template = (({ num, color }) => num !== 1 ? <Record setColor={color} >{num} dias</Record> : <Record setColor={color} >{num} dia</Record>)
    return(
        <CardWrapper>
            <Card>
                <Title>{name}</Title>
                <Streak>Sequencia atual: {<Template color={done} num={sequence} />}</Streak>
                <Streak>Seu recorde: {<Template color={color()} num={highest} />}</Streak>
            </Card>
            <Icon colorPicker={done}><ion-icon onClick={() => handleCheck(index)} name="checkbox"></ion-icon></Icon>
        </CardWrapper>
    )
}

export default function Track() {
    const { userContext, setUserContext } = useContext(UserContext);

    const [data, setData] = useState([]);
    const [calendar, ] = useState(getDate);

    function getDate() {
        dayjs.extend(weekday)
        const rawDate = dayjs().locale('pt-br').format("dddd, D/MM")
        return formatDate(rawDate)
    }

    function formatDate(string) {
        const split = string.indexOf('-');
        const blank = string.indexOf(' ');
        const day = string.slice(blank);
        let weekday = string.slice(0, blank);
        if(split !== -1) {
            weekday = string.slice(0, split);
        }
        weekday = weekday.replace(string[0], string[0].toUpperCase());
        return `${weekday},${day}`;
    }

    useEffect(() => {
        getTodayData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getTodayData() {
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
        getProgress(config)
    }
    
    function getProgress(config) {
        const promise = axios.get(URL+ROUTE_TODAY, config)
        promise.then((res) => {
            setData(res.data);
        });
    }

    function handleCheck(taskIndex) {
        const config = {
            headers: {
                "Authorization": `Bearer ${userContext.token}`
            }
        }
        const reqData = {...data[taskIndex]}
        const route = reqData.done ? ROUTE_UNCHECK : ROUTE_CHECK
        const promise = axios.post(URL+`/${reqData.id}`+route, {}, config)
        promise.then(() => getTodayData())
        promise.catch((err) => { console.log(err.status.response); return})
    }

   function Progress() {
        const doneList = data.filter((task) => task.done ? task : null)
        const percent = (doneList.length/data.length)*100
        if (percent > 0) {
            return <DailyProgress color={percent} >{Math.round(percent)}% dos hábitos concluídos</DailyProgress>
        }
        return <DailyProgress>Nenhum hábito concluído ainda</DailyProgress>
    }

    const Today = (() => {
        if(data.length === 0)
            return null
        else {
            return (
                data.map((task, index) => 
                    <Task 
                        key={index}
                        task={task}
                        index={index}
                        handleCheck={handleCheck}
                    />))
        }
    })

    return(
    <Content>
        <Header />
        <PageTop>
            <PageTitle>{calendar}</PageTitle>
        </PageTop>
        <Progress />
        <List>
            <Today />
        </List>
        <Footer />
    </Content>)
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
    margin-bottom: 5px;
    justify-content: flex-end;
    align-items: flex-start;
`

const PageTitle = styled.h1`
    display: flex;
    font-size: 23px;
    color: #126BA5;
`

const DailyProgress = styled.h3`
    display: flex;
    font-size: 18px;
    margin-bottom: 15px;
    color: ${ ({color}) => color >= 50 ? "#8FC549" : "#BABABA"};
`

const List = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 5px 0;
    justify-content: space-between;
    align-items: center;
    overflow-y: scroll;
`

const CardWrapper = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    min-height: 100px;
    background-color: #FFFFFF;
    margin: 3px 3px;
    padding: 4px 8px;
    border-radius: 5px;
    box-sizing: border-box;
`

const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90%;
    min-height: 35px;
    margin: 10px 10px 5px 0;
    padding: 3px 0;
    box-sizing: border-box;
`

const Title = styled.h2`
    display: flex;
    margin-bottom: 10px;
    font-size: 20px;
`

const Streak = styled.p`
    font-size: 13px;
`

const Record = styled.strong`
    color: ${ ({ setColor } ) => setColor ? "#8FC549" : "#BABABA" };
`

const Icon = styled.div`
    width: 70px;
    height: 70px;
    font-size: 70px;
    color: ${ ({ colorPicker }) => colorPicker ? '#8FC549' : "#BABABA" };
`