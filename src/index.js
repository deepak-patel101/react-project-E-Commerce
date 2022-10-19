import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalProvider } from "./context/global_Context";
import { ProductProvider } from "./context/Product_Context";
import { FilterProvider } from "./context/Filter_context";
import { CartProvider } from "./context/Cart_context";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/User_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-h8ian5tf.us.auth0.com"
    clientId="njcl6BcCqK1JMim0Yo4GTWtCb3At2ulf"
    // domain={process.env.REACT_APP_AUTH_DOMAIN}
    // clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <GlobalProvider>
        <ProductProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductProvider>
      </GlobalProvider>
    </UserProvider>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//  {
//   "sub": "facebook|3367853470116267",
//   "given_name": "Deepak",
//   "family_name": "Patel",
//   "nickname": "Deepak Patel",
//   "name": "Deepak Patel",
//   "picture": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3367853470116267&height=50&width=50&ext=1668081649&hash=AeTC95YxO7fY5W_3ML0",
//   "updated_at": "2022-10-11T12:00:49.506Z"
// }

// {
//   "sub": "google-oauth2|109519596076673727068",
//   "given_name": "free audiobook",
//   "family_name": "4u",
//   "nickname": "draw.it.with.deepak",
//   "name": "free audiobook 4u",
//   "picture": "https://lh3.googleusercontent.com/a/ALm5wu14_hHADvhgQabzzFPEWGq-WJu0SMgHvVwYBBmW=s96-c",
//   "locale": "en-GB",
//   "updated_at": "2022-10-11T12:05:02.072Z"
// }
