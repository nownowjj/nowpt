import Router from "./router/Router";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";
import {store} from "./redux/store/store";
import {persistStore} from "redux-persist";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();
const persistor = persistStore(store);
function App() {
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                  <Router />
                  {/*<ReactQueryDevtools  initialIsOpen={false} position='bottom-right' />*/}
              </QueryClientProvider>
          </PersistGate>
      </Provider>

      );
}
export default App;
