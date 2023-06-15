import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";


// const store = createStore(rootReducer);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
,document.getElementById('root')
);

