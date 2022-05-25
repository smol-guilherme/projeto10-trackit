import { useState, useEffect, useContext } from 'react'
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import styled from "styled-components";
import UserContext from './context/UserContext';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/pt-br';

import Header from './shared/Header'
import Footer from './shared/Footer'

const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"

function NewHabit ({ IsLoading, form, title, setTitle, handleWeekday, create, setCreate, handleSubmit }) {
    
    return(
        <InputWrapper onSubmit={handleSubmit}>
            <input
                type={'text'}
                value={title}
                placeholder={'nome do hábito'}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={64}
                required
            />
            <DayWrapper>
                { form.map((item, index) => <Day key={index} select={item.isSelected} index={index} onClick={() => handleWeekday(index)}>{item.day}</Day> )}
            </DayWrapper>
            <ButtonWrapper>
                <Cancel onClick={() => setCreate(!create)}>cancelar</Cancel>
                <IsLoading />
            </ButtonWrapper>
        </InputWrapper>
    )
}

export default function Goals() {
    const { userContext, setUserContext, setProgress } = useContext(UserContext);
    const [interact, setInteract] = useState(false)
    const [data, setData] = useState([]);
    const [create, setCreate] = useState(false)
    const [form, setForm] = useState(dayToText)
    const [title, setTitle] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        setInteract(!interact)
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
                "Authorization": `Bearer ${userContext.token}`
            }
        }
        console.log(body)
        const promise = axios.post(URL, body, config)
        promise.then((res) => {
            const newData = [...data]
            newData.push(res.data)
            updateProgress(newData)
            setTitle('')
            setForm(dayToText)
            setCreate(!create)
            setData(newData)
        })
        promise.catch((err) => setInteract(!interact))
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

    const IsLoading = (() => {
        if(!interact) {
            return (<Button type={'submit'} interact={interact}>Salvar</Button>)
        }
        return <Button><ThreeDots height="10px" width="45px" color="#FFFFFF" /></Button>
    })

    function updateProgress(responseData) {
        setInteract(!interact)
        const count = responseData.filter((item) =>{
            if (item.done) {
                return item
            }
            return null
        })
        setProgress(Math.round((count.length/responseData.length)*100))
    }

    function handleDelete(deleteIndex) {
        if(!window.confirm("Tem certeza que deseja deletar este item?")) {
            return;
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${userContext.token}`
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
            updateProgress(newData)
            setInteract(!interact)
            setData([...newData])
        })
        promise.catch((err) => console.log(err.response.status))
    }

    useEffect(() => {
        let dataToken;
        if(!userContext.hasOwnProperty("token")) {
            let data = localStorage.getItem("login")
            data = JSON.parse(data)
            dataToken = data.token
        } else {
            dataToken = userContext.token
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${dataToken}`
            }
        }
        console.log(config)
        const promise = axios.get(URL, config)
        promise.then((res) => setData(res.data))
        promise.catch((err) => console.log(err.status.response))
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    { create ? <NewHabit IsLoading={IsLoading} handleSubmit={handleSubmit} title={title} setTitle={setTitle} create={create} setCreate={setCreate} form={form} handleWeekday={handleWeekday} /> : "" }
                    { <HasData /> }
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
    height: 100vh;
    margin: 80px 0;
    padding: 0 10px;
    background-color: #F2F2F2;
    box-sizing: border-box;
`

const InputWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 90vw;
    margin: 0 auto;
    padding: 1vh 1vw;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-sizing: border-box;

    input {
        display: flex;
        pointer-events: ${ ({ interact }) => !interact ? 'auto' : 'none' };
        background-color: ${ ({ interact }) => !interact ? '#FFFFFF' : '#F2F2F2' };
        color: ${ ({ interact }) => !interact ? '#666666' : '#AFAFAF' };
        width: 90%;
        height: 40px;
        margin: 10px 0;
        padding: 4px 16px;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        box-sizing: border-box;

        &::placeholder {
        color: #DBDBDB
        }
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    justify-content: flex-end;
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${ ({ disable }) => !disable ? '#52B6FF' : '#52B6FF70' }; ;
    width: 30%;
    height: 30px;
    margin: 3px 5% 3px 1%;
    padding: 9px 16px;
    border-radius: 5px;
    color: #FFFFFF;
    border: none;
    box-sizing: border-box;
`

const Cancel = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #FFFFFF;
    width: 30%;
    height: 30px;
    margin: 3px 1% 3px 1%;
    padding: 9px 16px;
    color: #52B6FF;
    border: none;
    border-radius: 5px;

`

const DayWrapper = styled.div`
    display: flex;
    width: 90%;
    height: 50px;
    box-sizing: border-box;
`

const Day = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    width: 30px;
    height: 30px;
    padding: 7px;
    margin: 3px 5px 3px 0;
    border: ${ ({ select }) => select ? '1px solid #CFCFCF' : '1px solid #D4D4D4' };
    color: ${ ({ select }) => select ? '#FFFFFF' : '#DBDBDB'};
    background-color: ${ ({ select }) => select ? '#CFCFCF' : '#FFFFFF' };
    border-radius: 5px;
    box-sizing: border-box;
`