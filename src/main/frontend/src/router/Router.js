import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainComponent from "../pages/MainComponent";
import TestComponent from "../pages/TestComponent";
import LoginComponent from "../pages/LoginComponent";
import HomeComponent from "../pages/HomeComponent";
import CalendarMyPage from "../pages/calendar/Mypage/CalendarMyPage";
import Oauth from "../api/Oauth";
import NoticePage from "../pages/notice/NoticePage";
import NoticeUpdateComponent from "../pages/notice/NoticeUpdateComponent";
import MeetingPage from "../pages/meetingRoom/MeetingPage";
import MeetingUpdateComponent from "../pages/meetingRoom/MeetingUpdateComponent";
import LoadingComponent from "../pages/LoadingComponent";
import {useSelector} from "react-redux";
import PrivateRoute from "./PrivateRoute";
import TestPage from "../pages/TestPage";
import ProductPage from "../pages/product/ProductPage";
import ProductDetailComponent from "../pages/product/ProductDetailComponent";
import ProductLikePage from "../pages/product/ProductLikePage";
import ScrollComponent from "../pages/Scroll/ScrollComponent";
import SearchPage from "../pages/product/searchPage";
import ChartMain from "../pages/chart/ChartMain";
import Calendar from "../pages/calendar/CalendarPage";
import CalendarRecordNewOrFixPage from "../pages/calendar/Detail/CalendarRecordNewOrFixPage";
import CalendarImportPage from "../pages/calendar/Import/CalendarImportPage";
import CalendarDayDetailPage from "../pages/calendar/Detail/CalendarDayDetailPage";


const Router = () => {
    let isLogin = useSelector((state) => state.user.value.isLoggedIn);
    // let product = useSelector((state) => state.product.value);
    //
    // console.log(useSelector((state) => state.product.value));
    console.log(isLogin)
    return (

        <BrowserRouter>
            {/*<HeaderComponent />*/}


            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/go/main" element={<MainComponent />} />

                <Route
                    path="/go/common/myPage"
                    element={
                    <PrivateRoute
                        component={CalendarMyPage}
                    />
                    }
                />
                <Route path="/go/test/jpa" element={<TestComponent />} />
                <Route path="/go/login" element={<LoginComponent />} />

                <Route path="/go/notice" element={<NoticePage />} />
                <Route path="/go/notice/:noticeSn" element={<NoticeUpdateComponent />} />

                <Route path="/go/meetingRoom" element={<MeetingPage />} />
                <Route path="/go/meetingRoom/:reservationSn" element={<MeetingUpdateComponent />} />

                <Route path="/go/product" element={<ProductPage />} />
                <Route path="/go/product/:productSn" element={<ProductDetailComponent />} />
                <Route path="/go/productLike" element={<ProductLikePage />} />




                {/* 카카오 , 네이버 소셜 로그인 redirect path*/}
                <Route path="/oauth" element={<Oauth />} />
                {/* api 요청시 loading UI*/}
                <Route path="/loading" element={<LoadingComponent />} />


                <Route
                    path="/calendar"
                        element={
                            <PrivateRoute
                                component={Calendar}
                            />
                        }
                />
                <Route path="/calendarRecordNewOrFix" element={<CalendarRecordNewOrFixPage />} />
                <Route path="/calendarImport" element={<CalendarImportPage />} />
                <Route path="/calendarDayDetail" element={<CalendarDayDetailPage />} />

                {/*<Route*/}
                {/*    path="/go/common/myPage"*/}
                {/*    element={*/}
                {/*        <PrivateRoute*/}
                {/*            component={CalendarMyPage}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}


                <Route path="/scroll" element={<ScrollComponent />} />

                <Route path="/search" element={<SearchPage />} />
                <Route path="/chart" element={<ChartMain />} />
            </Routes>

        </BrowserRouter>

    );
};

export default Router