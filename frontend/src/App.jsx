import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { CheckUserExist } from './helper/helper';
import Header from './components/Header';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Session from './components/Session';
// import Protected from './components/Protected';
import { SessionStorageProvider } from "react-sessionstorage";
import AdminSignIn from './components/admin/AdminSignIn';
import AdminHome from './components/admin/AdminHome';

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path='/quiz' element={<CheckUserExist><Quiz /></CheckUserExist>} />
        <Route path='/result' element={<CheckUserExist><Result /></CheckUserExist>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/session' element={<SessionStorageProvider><Session /></SessionStorageProvider>} />
        <Route path='/admin' element={<AdminSignIn />} />
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='*' element={<SignIn />} />
        {/* <Route path='/home' element={<Protected Component={Home} />} /> */}
    </Routes>
    </BrowserRouter>
  )
}
