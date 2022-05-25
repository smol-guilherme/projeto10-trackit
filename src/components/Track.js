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
    // console.log(done)

    const color = (() => sequence === highest ? true : false)
    const Template = (({ num }) => num !== 1 ? `${num} dias` : `${num} dia`)
    return(
        <div>
            <div>
                <h2>{name}</h2>
                <p>Sequencia atual: {<Template num={sequence} />}</p>
                <p>Seu recorde: {<Template color={color} num={highest} />}</p>
            </div>
            <Icon colorPicker={done}><ion-icon onClick={() => handleCheck(index)} name="checkbox"></ion-icon></Icon>
        </div>
    )
}

export default function Track() {
    const { userContext, setProgress } = useContext(UserContext);

    const [data, setData] = useState([]);
    const [calendar, setCalendar] = useState(getDate);

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
        // console.log(userContext)
        getTodayData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getTodayData() {
        const config = {
            headers: {
                "Authorization": `Bearer ${userContext.token}`
            }
        }
        const promise = axios.get(URL+ROUTE_TODAY, config)
        promise.then((res) => {
            const count = res.data.filter((item) =>{
                if (item.done) {
                    return item
                }
                return null
            })
            setProgress(Math.round((count.length/res.data.length)*100))
            setData(res.data);
        });
    }

    function handleCheck(taskIndex) {
        console.log(userContext)
        const config = {
            headers: {
                "Authorization": `Bearer ${userContext.token}`
            }
        }
        const reqData = {...data[taskIndex]}
        const route = reqData.done ? ROUTE_UNCHECK : ROUTE_CHECK
        // console.log('hello check', reqData, userContext)
        const promise = axios.post(URL+`/${reqData.id}`+route, {}, config)
        promise.then(() => getTodayData())
        promise.catch((err) => { console.log(err.status.response); return})
    }

   function Progress() {
        const doneList = data.filter((task) => task.done ? task : null)
        const percent = (doneList.length/data.length)*100
        if (percent > 0) {
            return <h3 color={percent/100} >{Math.round(percent)}% dos hábitos concluídos</h3>
        }
        return <h3>Nenhum hábito concluído ainda</h3>
    }

    const Today = (() => data.length === 0 ? "" : data.map((task, index) => <Task key={index} task={task} index={index} handleCheck={handleCheck} />))

    return(
    <Content>
        <Header />
        <h1>{calendar}</h1>
        <Progress />
        <Today />
        <Footer />
    </Content>)
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 60px;
    margin: 80px 0;
    padding: 0 10px;
    box-sizing: border-box;
`

const Icon = styled.div`
    color: ${ ({ colorPicker }) => colorPicker ? '#8FC549' : "#BABABA" };
`