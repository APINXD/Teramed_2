// import { css } from "@emotion/react";
import { motion, useAnimate, usePresence } from "framer-motion";
import { useState, useContext, createContext, useEffect } from 'react';
import React from 'react';
import { useData, DataProvider } from '../../dataProviders/DataProvider.jsx';
import { User } from '../../staticData/classes.js';
import './styles.css';
import { getUsers } from "../../api/supabaseApi.js";
import { GlobalSpace } from "../../dataProviders/GlobalSpace.jsx";
// import jwt from 'jsonwebtoken';


// авторизация
export default function AuthorizationPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState(' ');
    const { data, setData } = useData();
    // const secret = 'fgh521fgh52fgh5fg';
    // const jwt = require('jsonwebtoken');
    // const options = {
    //     expiresIn: '1h' // Токен действителен в течение 1 часа
    //   };

    async function autorization(login, password) {
        if (login.trim() === "" || password.trim() === "") {
            setErrorText("Заполните пустые поля");
        } else {
            try {
                var users = (await getUsers()).data;
                if (users) {
                    for (var user of users) {
                        if (user.login === login && user.password === password) {
                            var authUser = new User(user.id, user.role.id, user.username,
                                user.login, user.password, user.photo)
                            console.log(authUser)
                            setData({ isLogin: true, userData: authUser });
                            // const payload = {
                            //     id: user.id
                            // }
                            // const token = jwt.sign(payload, secret, options)
                            localStorage.setItem('authToken', user.id)
                            setErrorText("");
                        }
                        else {
                            setErrorText("Неверный логин или пароль");
                        }
                    }
                } else {
                    setErrorText("Ошибка подключения к серверу");
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div >
            <DataProvider>
                <GlobalSpace/>
            </DataProvider>  
            <motion.div
                className='authorization_back_frame'
                initial={{ background: "linear-gradient(45deg, #007BFF, #33D1B5)" }}
                animate={{
                    background: [
                        "linear-gradient(45deg, #007BFF, #33D1B5)",
                        "linear-gradient(45deg, #33D1B5, #007BFF)",
                        "linear-gradient(45deg, #007BFF, #5CD4B5)",
                        "linear-gradient(45deg, #33D1B5, #007BFF)"
                    ],
                    transition: { duration: 25, repeat: Infinity, repeatType: "reverse" }
                }}
            >
                <div className='authorization_panel'>
                    <div className='authorization_form'>
                        <h2 className='authorization_label'>TERAMED</h2>
                        <div className='authorization_edit_group'>
                            <input className='authorization_edit_text' type='text'
                                placeholder='Логин' value={login} onChange={e => setLogin(e.target.value)} />
                            <input className='authorization_edit_text' type='password'
                                placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <p className='error_text'>{errorText}</p>
                        <button className='panel_btn' onClick={() => autorization(login, password)}>Войти</button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export { AuthorizationPage }




