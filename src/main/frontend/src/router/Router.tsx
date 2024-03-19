import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainComponent from "../pages/MainComponent";
import LoginComponent from "../pages/LoginPage";
import CalendarMyPage from "../pages/calendar/Mypage/CalendarMyPage";
import Oauth from "../api/Oauth";
import LoadingComponent from "../component/LoadingComponent";
import PrivateRouteNew from "./PrivateRoute";
import Calendar from "../pages/calendar/CalendarPage";
import CalendarRecordNewOrFixPage from "../pages/calendar/Detail/CalendarRecordNewOrFixPage";
import CalendarImportPage from "../pages/calendar/Import/CalendarImportPage";
import CalendarDayDetailPage from "../pages/calendar/Detail/CalendarDayDetailPage";
import NotificationPage from "../pages/calendar/Notification/NotificationPage";
import FriendPage from "../pages/calendar/friend/FriendPage";
import React from "react";
import HomeComponent from "../pages/HomeComponent";
import WeatherPage from "../pages/calendar/Weather/WeatherPage";
import MyFriendCalendarPage from "../pages/calendar/friend/MyFriendCalendarPage";
import CalendarCommentPage from "../pages/calendar/Comment/CalendarCommentPage";
import IsExpiredComponent from "../component/IsExpiredComponent";
import ErrorComponent from "../component/ErrorComponent";
import LoginWaitComponent from "../component/LoginWaitComponent";


const Router = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Calendar />} />
                <Route path="/go/main" element={<MainComponent />} />
                <Route path="/go/login" element={<LoginComponent />} />
                <Route path="/oauth" element={<Oauth />} />
                <Route path="/loading" element={<LoadingComponent />} />
                <Route path="/loginwait" element={<LoginWaitComponent />} />

                <Route path="/isExpired" element={<IsExpiredComponent />} />
                <Route path="/isError" element={<ErrorComponent />} />
                {/*<Route path="/bottom" element={<Base/>} />*/}



                <Route element={<PrivateRouteNew />}>
                    <Route path="/go/common/myPage" element={<CalendarMyPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/calendar" element={<Calendar />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/calendarRecordNewOrFix" element={<CalendarRecordNewOrFixPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/calendarImport" element={<CalendarImportPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/calendarDayDetail" element={<CalendarDayDetailPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/notification" element={<NotificationPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/friend" element={<FriendPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/myFriend" element={<MyFriendCalendarPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/weather" element={<WeatherPage />} />
                </Route>
                <Route element={<PrivateRouteNew />}>
                    <Route path="/comment" element={<CalendarCommentPage />} />
                </Route>

                {/*<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />*/}
            </Routes>

        </BrowserRouter>

    );
};

export default Router