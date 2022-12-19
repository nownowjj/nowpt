import {HashRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../pages/MainComponent";
import TestComponent from "../pages/TestComponent";
import LoginComponent from "../pages/LoginComponent";
import HomeComponent from "../pages/HomeComponent";
import MyPageComponent from "../pages/MyPageComponent";
import CalculatorComponent from "../pages/CalculatorComponent";


const Router = () => {

    return (
        <HashRouter>

            <HeaderComponent/>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/api/main" element={<MainComponent />} />
                <Route path="/api/test/jpa" element={<TestComponent />} />
                <Route path="/api/login" element={<LoginComponent />} />
                <Route path="/api/common/myPage" element={<MyPageComponent />} />
                <Route path="/api/calculator" element={<CalculatorComponent />} />
            </Routes>

        </HashRouter>
    );
};

export default Router