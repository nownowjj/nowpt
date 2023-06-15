import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "../component/HeaderComponent";
import MainComponent from "../pages/MainComponent";
import TestComponent from "../pages/TestComponent";
import LoginComponent from "../pages/LoginComponent";
import HomeComponent from "../pages/HomeComponent";
import MyPageComponent from "../pages/MyPageComponent";
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


const Router = () => {
    let isLogin = useSelector((state) => state.user.value.isLoggedIn);
    // let product = useSelector((state) => state.product.value);
    //
    // console.log(useSelector((state) => state.product.value));
    console.log(isLogin)
    return (

        <BrowserRouter>
            <HeaderComponent />


            <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/go/main" element={<MainComponent />} />

                <Route
                    path="/go/common/myPage"
                    element={
                    <PrivateRoute
                        component={MyPageComponent}
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


                {/*<Route path="/chat" element={<Chat />} />*/}


                {/* 카카오 , 네이버 소셜 로그인 redirect path*/}
                <Route path="/oauth" element={<Oauth />} />
                {/* api 요청시 loading UI*/}
                <Route path="/loading" element={<LoadingComponent />} />

            </Routes>

        </BrowserRouter>

    );
};

export default Router