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
import NoticeUpdateComponent from "../pages/notice/NoticeUpdateComponent";
import MeetingPage from "../pages/meetingRoom/MeetingPage";
import MeetingUpdateComponent from "../pages/meetingRoom/MeetingUpdateComponent";
import OauthNaver from "../api/OauthNaver";
import LoadingComponent from "../pages/LoadingComponent";
import Chat from "../pages/socket/Chat";
import {useSelector} from "react-redux";
import PrivateRoute from "./PrivateRoute";


const Router = () => {
    let isLogin = useSelector((state) => state.user.value.isLoggedIn);

    console.log(isLogin)
    return (

        <BrowserRouter>
            <HeaderComponent />


            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/go/main" element={<MainComponent />} />

                <Route
                    path="/go/common/myPage"
                    element={
                    <PrivateRoute
                        component={MyPageComponent}
                    />
                    }
                />
                {/*<PrivateRoute path="/go/main" element={<MainComponent />}   isAuthenticated={isLogin} />*/}
                <Route path="/go/test/jpa" element={<TestComponent />} />
                <Route path="/go/login" element={<LoginComponent />} />
                <Route path="/go/calculator" element={<CalculatorComponent />} />

                <Route path="/go/notice" element={<NoticePage />} />
                <Route path="/go/notice/:noticeSn" element={<NoticeUpdateComponent />} />

                <Route path="/go/meetingRoom" element={<MeetingPage />} />
                <Route path="/go/meetingRoom/:reservationSn" element={<MeetingUpdateComponent />} />

                <Route path="/go/chat" element={<Chat />} />



                <Route path="/oauth" element={<Oauth />} />
                <Route path="/oauthNaver" element={<OauthNaver />} />

                <Route path="/loading" element={<LoadingComponent />} />

            </Routes>

        </BrowserRouter>

    );
};

export default Router