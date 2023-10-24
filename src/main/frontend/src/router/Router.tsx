import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainComponent from "../pages/MainComponent";
import LoginComponent from "../pages/LoginPage";
import CalendarMyPage from "../pages/calendar/Mypage/CalendarMyPage";
import Oauth from "../api/Oauth";
// import NoticePage from "../pages/notice/NoticePage";
// import NoticeUpdateComponent from "../pages/notice/NoticeUpdateComponent";
// import MeetingPage from "../pages/meetingRoom/MeetingPage";
// import MeetingUpdateComponent from "../pages/meetingRoom/MeetingUpdateComponent";
import LoadingComponent from "../pages/LoadingComponent";
import {useSelector} from "react-redux";
import PrivateRoute from "./PrivateRoute";
// import TestPage from "../pages/TestPage";
// import SearchPage from "../pages/product/searchPage";
// import ChartMain from "../pages/chart/ChartMain";
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
    console.log(isLogin)
    return (

        <BrowserRouter>
            {/*<HeaderComponent />*/}


            <Routes>
                <Route path="/" element={<HomeComponent />} />
                {/*<Route path="/test" element={<TestPage />} />*/}
                <Route path="/go/main" element={<MainComponent />} />

                <Route
                    path="/go/common/myPage"
                    element={<PrivateRoute component={CalendarMyPage}/>}
                />


                {/*<Route path="/go/test/jpa" element={<TestComponent />} />*/}
                <Route path="/go/login" element={<LoginComponent />} />

                {/*<Route path="/go/notice" element={<NoticePage />} />*/}
                {/*<Route path="/go/notice/:noticeSn" element={<NoticeUpdateComponent />} />*/}

                {/*<Route path="/go/meetingRoom" element={<MeetingPage />} />*/}
                {/*<Route path="/go/meetingRoom/:reservationSn" element={<MeetingUpdateComponent />} />*/}

                {/*<Route path="/go/product" element={<ProductPage />} />*/}
                {/*<Route path="/go/product/:productSn" element={<ProductDetailComponent />} />*/}
                {/*<Route path="/go/productLike" element={<ProductLikePage />} />*/}




                {/* 카카오 , 네이버 소셜 로그인 redirect path*/}
                <Route path="/oauth" element={<Oauth />} />
                {/* api 요청시 loading UI*/}
                <Route path="/loading" element={<LoadingComponent />} />


                <Route
                    path='/calendar'
                    element={<PrivateRoute component={Calendar}/>}
                />

                <Route
                    path='/'
                    element={<PrivateRoute component={Calendar}/>}
                />

                <Route
                    path="/calendarRecordNewOrFix"
                    element={<PrivateRoute component={CalendarRecordNewOrFixPage}/>}
                />
                <Route
                    path="/calendarImport"
                    element={<PrivateRoute component={CalendarImportPage}/>}
                />
                <Route
                    path="/calendarDayDetail"
                    element={<PrivateRoute component={CalendarDayDetailPage}/>}
                />

                <Route
                    path="/notification"
                    element={<PrivateRoute component={NotificationPage}/>}
                />

                <Route
                    path="/friend"
                    element={<PrivateRoute component={FriendPage}/>}
                />

                <Route
                    path="/myFriend"
                    element={<PrivateRoute component={MyFriendCalendarPage}/>}
                />

                <Route
                    path="/weather"
                    element={<PrivateRoute component={WeatherPage}/>}
                />

                <Route
                    path="/comment"
                    element={<PrivateRoute component={CalendarCommentPage}/>}
                />


                {/*<Route path="/scroll" element={<ScrollComponent />} />*/}

                {/*<Route path="/search" element={<SearchPage />} />*/}
                {/*<Route path="/chart" element={<ChartMain />} />*/}
            </Routes>

        </BrowserRouter>

    );
};

export default Router