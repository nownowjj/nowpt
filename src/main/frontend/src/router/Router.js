import {HashRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../component/MainComponent";
import TestComponent from "../component/TestComponent";
import LoginComponent from "../component/LoginComponent";
import HomeComponent from "../component/HomeComponent";


const Router = () => {

    return (
        <HashRouter>

            <HeaderComponent/>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/api/main" element={<MainComponent />} />
                <Route path="/api/test" element={<TestComponent />} />
                <Route path="/api/login" element={<LoginComponent />} />
            </Routes>

        </HashRouter>
    );
};

export default Router