import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../component/MainComponent";


const Router = () => {

    return (
        <BrowserRouter>
            <HeaderComponent/>
            <Routes>
                <Route path="/" element={<MainComponent />} />
            </Routes>

        </BrowserRouter>
    );
};

export default Router