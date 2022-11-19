import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../component/MainComponent";
import TestComponent from "../component/TestComponent";


const Router = () => {

    return (
        <BrowserRouter>

            <HeaderComponent/>
            <Routes>
                <Route path="/api" element={<MainComponent />} />
                <Route path="/api/test" element={<TestComponent />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Router