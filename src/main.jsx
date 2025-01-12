// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import React, { createContext, useState } from "react";
import {Provider} from 'react-redux'
import {store} from './store.jsx'
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'; // Import Tailwind styles

// Create a context
export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    // <Context.Provider
    //   value={{
    //     isAuthorized,
    //     setIsAuthorized,
    //     user,
    //     setUser,
    //   }}
    // >
    //   <App />
    // </Context.Provider>
    <Provider store={store}>
      <App/>
    </Provider>
  );
};

// Render the root component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
