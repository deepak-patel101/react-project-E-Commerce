import React from "react";
import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../action";

const Global_reducer = (state, action) => {
  ///////////FOR SIDEBAR//////////////////
  // if (action.type === "SIDEBAR_OPEN") { //string use kare ne error ho skti his ye veriable use kar rahe he
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default Global_reducer;
