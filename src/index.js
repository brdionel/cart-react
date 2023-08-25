import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FilterProvider } from "./context/filters";
import { CartProvider } from "./context/cart";
import { UserContextProvider } from "./context/user";
import { AppProvider } from "./context/app";
import { DrawerProvider } from "./context/drawer";
import { REACT_APP_GOOGLE_CLIENT_ID } from "./configs";

const googleClientId = REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <DrawerProvider>
      <CartProvider>
        <UserContextProvider>
          <FilterProvider>
            <AppProvider>
              <App />
            </AppProvider>
          </FilterProvider>
        </UserContextProvider>
      </CartProvider>
    </DrawerProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
