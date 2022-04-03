import { Route, Routes } from "react-router-dom";
import Main from "./page/Main/index";
import SignIn from "./page/User/SignIn/index";
import SignUp from "./page/User/SignUp/index";
import Complete from "./page/User/Complete/index";
import BoardGameSearch from "./page/BoardGame/BoardGameSearch/index";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<BoardGameSearch />} />
      <Route path="/complete" element={<Complete />} />
    </Routes>
  );
}

export default Router;
