import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainComponent from "../pages/MainComponent";
import LoginComponent from "../pages/LoginPage";
import CalendarMyPage from "../pages/calendar/Mypage/CalendarMyPage";
import Oauth from "../api/Oauth";
import LoadingComponent from "../pages/LoadingComponent";
import {useSelector} from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Calendar from "../pages/calendar/CalendarPage";
import CalendarRecordNewOrFixPage from "../pages/calendar/Detail/CalendarRecordNewOrFixPage";
import CalendarImportPage from "../pages/calendar/Import/CalendarImportPage";
import CalendarDayDetailPage from "../pages/calendar/Detail/CalendarDayDetailPage";
import NotificationPage from "../pages/calendar/Notification/NotificationPage";
import FriendPage from "../pages/calendar/friend/FriendPage";
import {RootState} from "../redux/store/store";
import React from "react";
import HomeComponent from "../pages/HomeComponent";
import WeatherPage from "../pages/calendar/Weather/WeatherPage";
import MyFriendCalendarPage from "../pages/calendar/friend/MyFriendCalendarPage";
import CalendarCommentPage from "../pages/calendar/Comment/CalendarCommentPage";


const Router = () => {
    const isLogin = useSelector((state:RootState) => state.user.isLoggedIn);
    // console.log(isLogin)
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/go/main" element={<MainComponent />} />

                <Route
                    path="/go/common/myPage"
                    element={<PrivateRoute element={CalendarMyPage}/>}
                />


                <Route path="/go/login" element={<LoginComponent />} />


                {/* 카카오 , 네이버 소셜 로그인 redirect path*/}
                <Route path="/oauth" element={<Oauth />} />
                {/* api 요청시 loading UI*/}
                <Route path="/loading" element={<LoadingComponent />} />


                <Route
                    path='/calendar'
                    element={<PrivateRoute element={Calendar}/>}
                />

                <Route
                    path='/'
                    element={<PrivateRoute element={Calendar}/>}
                />

                <Route
                    path="/calendarRecordNewOrFix"
                    element={<PrivateRoute element={CalendarRecordNewOrFixPage}/>}
                />
                <Route
                    path="/calendarImport"
                    element={<PrivateRoute element={CalendarImportPage}/>}
                />
                <Route
                    path="/calendarDayDetail"
                    element={<PrivateRoute element={CalendarDayDetailPage}/>}
                />

                <Route
                    path="/notification"
                    element={<PrivateRoute element={NotificationPage}/>}
                />

                <Route
                    path="/friend"
                    element={<PrivateRoute element={FriendPage}/>}
                />

                <Route
                    path="/myFriend"
                    element={<PrivateRoute element={MyFriendCalendarPage}/>}
                />

                <Route
                    path="/weather"
                    element={<PrivateRoute element={WeatherPage}/>}
                />

                <Route
                    path="/comment"
                    element={<PrivateRoute element={CalendarCommentPage}/>}
                />
            </Routes>

        </BrowserRouter>

    );
};

export default Router