import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../pages/MainComponent";
import TestComponent from "../pages/TestComponent";
import LoginComponent from "../pages/LoginComponent";
import HomeComponent from "../pages/HomeComponent";
import MyPageComponent from "../pages/MyPageComponent";
import CalculatorComponent from "../pages/CalculatorComponent";
import KakaoRedirectHandler from "../api/KakaoRedirectHandler";
import Oauth from "../api/Oauth";


const Router = () => {





    return (
        <BrowserRouter>

            <HeaderComponent/>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/api/main" element={<MainComponent />} />
                <Route path="/api/test/jpa" element={<TestComponent />} />
                <Route path="/api/login" element={<LoginComponent />} />
                <Route path="/api/common/myPage" element={<MyPageComponent />} />
                <Route path="/api/calculator" element={<CalculatorComponent />} />

                <Route path="/oauth" element={<Oauth />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Router