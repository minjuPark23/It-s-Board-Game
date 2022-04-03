import { Route, Routes } from "react-router-dom";
// import Main from "./page/main/index";
import SignIn from "./page/User/SignIn/index";
import SignUp from "./page/User/SignUp/index";
import BoardGameSearch from "./page/BoardGame/BoardGameSearch/index";

function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Main />} /> */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<BoardGameSearch />} />
    </Routes>
  );
}

export default Router;
