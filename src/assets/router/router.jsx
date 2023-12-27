import { Routes, Route } from "react-router-dom";

// layout
import HandleLayout from "../layout/layout";

// pages
import Home from "../pages/home";
import Detail from "../pages/detail";
import Login from "../pages/login";
import Favorite from "../pages/favorite";

import Nopage from "../pages/nopage";

function HandleRouter() {
  return (
    <>
      <Routes>
        {/* NO PAGES */}
        <Route path="*" element={<Nopage />} />

        {/* LOGIN PAGES */}
        <Route path="/login" element={<Login />} />

        {/* LAYOUT AND ORTHER PAGES */}
        <Route path="/" element={<HandleLayout />}>
          <Route index element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default HandleRouter;
