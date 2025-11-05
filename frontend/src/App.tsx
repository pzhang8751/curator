import './App.css'

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import NavBar from './components/NavBar/navbar';
import Footer from './components/Footer/Footer';
// import LoginPage from './components/Account/Login/LoginPage';
// import SignupPage from './components/Account/Signup/SignupPage';
import UserPage from './components/Account/User/UserPage';
import { AuthProvider } from './AuthProvider';

function LayoutWithNav() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet />
      {/* <Footer></Footer> */}
    </>
  )
}

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWithNav />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
          </Route>

          {/* <Route path="login" element={<LoginPage />}></Route>
          <Route path="signup" element={<SignupPage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
