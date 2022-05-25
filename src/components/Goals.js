import Header from './shared/Header'
import Footer from './shared/Footer'

import { useState, useEffect, useContext } from 'react'

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/pt-br';

import axios from "axios";
import styled from "styled-components";
import UserContext from './shared/UserContext';

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

function NewHabit ({ form, title, setTitle, handleWeekday, create, setCreate, handleSubmit }) {
    return(
        <form onSubmit={handleSubmit}>
            <input
                type={'text'}
                value={title}
                placeholder={'nome do hábito'}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={32}
                required
            />
            { form.map((item, index) => <div key={index} index={index} onClick={() => handleWeekday(index)}>{item.day}</div> )}
            <button onClick={() => setCreate(!create)}>cancelar</button>
            <input
                type={'submit'} value={'Salvar'}
            />
        </form>
    )
}

export default function Goals() {
    const { userContext, setUserContext } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [create, setCreate] = useState(false)
    const [form, setForm] = useState(dayToText)
    const [title, setTitle] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log('event')
        const days = []
        form.map((item, index) => {
            if(item.isSelected) {
                days.push(index)
                return item
            }
            return null
        })
        if(days.length === 0) {
            alert("Você precisa adicionar pelo menos um dia da semana");
            return;
        }
        const body = {
            name: title,
            days: days
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${userContext}`
            }
        }
        console.log(body)
        const promise = axios.post(URL, body, config)
        promise.then((res) => {
            const newData = [...data]
            newData.push(res.data)
            setTitle('')
            setForm(dayToText)
            setCreate(!create)
            setData(newData)
        })
        promise.catch((err) => console.log(err.status.response))
    }

    function handleWeekday(toggleIndex) {
        const week = [...form]
        week.map((item, index) => {
            if(toggleIndex === index) {
                return item.isSelected = !item.isSelected
            }
            return item
        })
        setForm(week);
    }

    function dayToText() {
        dayjs.extend(weekday);
        const week = [];
        for(let i = 0; i < 7; i++) {
            let elem = {
                day: dayjs().weekday(i).locale('pt-br').format('ddd').slice(0,1).toUpperCase(),
                isSelected: false
            }
            week.push(elem);
        }
        return week;
    }

    function handleDelete(deleteIndex) {
        console.log(deleteIndex)
        if(!window.confirm("Tem certeza que deseja deletar este item?")) {
            return;
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${userContext}`
            }
        }
        
        const promise = axios.delete(URL+`/${deleteIndex}`, config)
        promise.then((res) => {
             const newData = data.filter((item) => {
                if(item.id === deleteIndex) {
                    return null
                }
                return item
            })
            console.log(newData)
            setData([...newData])
        })
        promise.catch((err) => console.log(err.response.status))
    }

    useEffect(() => {
        // LEMBRA DE DELETAR ISSO ANTES DE ENTREGARPLEOANIOGADIOSFGUAISDEYS
        let gambiarraToken;
        if(userContext.length === 0) {
            let localToken = localStorage.getItem("login")
            localToken = JSON.parse(localToken)
            // console.log(localToken.token)
            gambiarraToken = localToken.token
            setUserContext(localToken.token)
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${gambiarraToken}`
            }
        }

        const promise = axios.get(URL, config)
        promise.then((res) => setData(res.data))
        promise.catch((err) => console.log(err.status.response))
    }, [])

    const HasData = (() => data.length > 0
        ? data.map((item, index) => <div key={index}>{item.name}<ion-icon onClick={() => handleDelete(item.id)} name="trash-outline"></ion-icon></div>)
        : <div>"Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"</div>)

    return (
        <Content>
            <Header />
            <div>
                <div>
                    <h1>Meus hábitos</h1>
                    <ion-icon onClick={() => setCreate(!create)} name="add-circle"></ion-icon>
                </div>
                <div>
                    { <HasData /> }
                    { create ? <NewHabit handleSubmit={handleSubmit} title={title} setTitle={setTitle} create={create} setCreate={setCreate} form={form} handleWeekday={handleWeekday} /> : "" }
                </div>
            </div>
            <Footer />
        </Content>
    )
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
