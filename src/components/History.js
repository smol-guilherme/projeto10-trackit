import Header from './shared/Header'
import Footer from './shared/Footer'

import { useState, useEffect, useContext } from 'react'

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/pt-br';

import axios from "axios";
import styled from "styled-components";
import UserContext from './context/UserContext';

export default function History() {
    return(
        <>
            <Header />
            <Footer />
        </>
    )
}