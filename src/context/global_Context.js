import React from "react";
import { useContext, useReducer } from "react";
import reducer from "../reducers/Global_reducer";
import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../action";

const GlobalContext = React.createContext();
export const GlobalProvider = ({ children }) => {
  const initialState = {
    isSidebarOpen: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  return (
    <GlobalContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
