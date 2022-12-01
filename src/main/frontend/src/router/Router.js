import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../component/MainComponent";
import TestComponent from "../component/TestComponent";
import LoginComponent from "../component/LoginComponent";


const Router = () => {

    return (
        <BrowserRouter>

            <HeaderComponent/>
            <Routes>
                <Route path="/main" element={<MainComponent />} />
                <Route path="/test" element={<TestComponent />} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Router