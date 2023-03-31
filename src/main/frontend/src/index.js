import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./redux/store/store";


// const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
,document.getElementById('root')
);

//Provider가 뭐냐면 store가 리액트앱 전체를 감싸도록 해주는 애다.
