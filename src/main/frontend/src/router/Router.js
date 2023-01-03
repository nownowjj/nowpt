import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../pages/MainComponent";
import TestComponent from "../pages/TestComponent";
import LoginComponent from "../pages/LoginComponent";
import HomeComponent from "../pages/HomeComponent";
import MyPageComponent from "../pages/MyPageComponent";
import CalculatorComponent from "../pages/CalculatorComponent";
import Oauth from "../api/Oauth";
import NoticePage from "../pages/notice/NoticePage";


const Router = () => {





    return (
        <BrowserRouter>

            <HeaderComponent/>
            <Routes>
                {/*<Route path="/" element={<HomeComponent />} />*/}
                {/*<Route path="/api/main" element={<MainComponent />} />*/}
                {/*<Route path="/api/test/jpa" element={<TestComponent />} />*/}
                {/*<Route path="/api/login" element={<LoginComponent />} />*/}
                {/*<Route path="/api/common/myPage" element={<MyPageComponent />} />*/}
                {/*<Route path="/api/calculator" element={<CalculatorComponent />} />*/}

                {/* spring security에 jwt토큰 인증허가 path와 react-router의 path를 다르게 해야한다.*/}

                <Route path="/" element={<HomeComponent />} />
                <Route path="/go/main" element={<MainComponent />} />
                <Route path="/go/test/jpa" element={<TestComponent />} />
                <Route path="/go/login" element={<LoginComponent />} />
                <Route path="/go/common/myPage" element={<MyPageComponent />} />
                <Route path="/go/calculator" element={<CalculatorComponent />} />
                <Route path="/go/notice" element={<NoticePage />} />


                <Route path="/oauth" element={<Oauth />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Router