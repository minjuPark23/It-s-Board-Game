import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./page/User/SignIn/index";
import SignUp from "./page/User/SignUp/index";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
