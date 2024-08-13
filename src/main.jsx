import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "./ThemeContext.jsx";
import { persistor, store } from "./store/store.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalCommonContextProvider from "./commonContext.jsx";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalCommonContextProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </GlobalCommonContextProvider>
  </React.StrictMode>
);
