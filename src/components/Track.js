import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/pt-br'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

import axios from "axios";
import styled from "styled-components";

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

export default function Track() {
    const location = useLocation();
    const token = location.state;
    const [data, setData] = useState([]);
    const [calendar, setCalendar] = useState(getDate)
    
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
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.get(URL, config)
        promise.then((res) => {
            setData(res.data)
            console.log('ok');
        });
    }, []);
    
    console.log(calendar)
    return(
    <div>
        <h1>{calendar}</h1>
        <h2>% habitos</h2>
        <div>
            <div>
                <p></p>
                <p></p>
                <p></p>
            </div>
            <div>checkbox</div>
        </div>
    </div>)
}