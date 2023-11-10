import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./redux/store/store";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import "./index.css";
import {QueryClient, QueryClientProvider} from "react-query"; // index css 추가

// 231110 react-query 추가
const queryClient = new QueryClient();
// const store = createStore(rootReducer);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </PersistGate>
    </Provider>
,document.getElementById('root')
);

