import './App.css'

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import NavBar from './components/NavBar/navbar';
import Footer from './components/Footer/Footer';
import UserPage from './components/User/UserPage';
import { AuthProvider } from './AuthProvider';
import AccountNavbar from './components/Account/AccountNavbar';
import EditProfilePage from './components/Account/EditProfilePage';
import AccountInformationPage from './components/Account/AccountInformationPage';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

function LayoutWithNav() {
  return (
    <>
      <Outlet />
      {/* <Footer></Footer> */}
    </>
  )
}

function AccountLayout() {
  return (
    <div className="flex flex-row pt-20">
      <AccountNavbar></AccountNavbar>
      <Outlet></Outlet>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route element={<LayoutWithNav />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route path="account" element={<AccountLayout />}>
              <Route path="edit-profile" element={<EditProfilePage />}></Route>
              <Route path="account-information" element={<AccountInformationPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
