import { Route, Routes } from "react-router-dom";
import Main from "./page/Main/index";
import SignIn from "./page/User/SignIn/index";
import SignUp from "./page/User/SignUp/index";
import Complete from "./page/User/Complete/index";
import BoardGameDetail from "./page/BoardGame/BoardGameDetail";
import BoardGameSearch from "./page/BoardGame/BoardGameSearch/index";
import BoardGameMarket from "./page/BoardGame/BoardGameMarket/index";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/detail/:no" element={<BoardGameDetail />} />
      <Route path="/search" element={<BoardGameSearch />} />
      <Route path="/complete" element={<Complete />} />
      <Route path="/market" element={<BoardGameMarket />} />
    </Routes>
  );
}

export default Router;
