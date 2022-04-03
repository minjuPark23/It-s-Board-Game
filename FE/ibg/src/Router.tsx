import { Route, Routes } from "react-router-dom";
import Main from "./page/Main/index";
import BoardGameSearch from "./page/BoardGameSearch/index";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/search" element={<BoardGameSearch />} />
    </Routes>
  );
}

export default Router;
