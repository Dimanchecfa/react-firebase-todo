import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import Tout from "../pages/Tout";
// import Actif from "../pages/Actif";
// import Termine from "../pages/Termine";
// import Tout from "../components/Addtask/TabBar";

const TodosRoute = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Tout />} />
        {/* <Route path="/" element={<Tout />} />
        <Route path="/Actif" element={<Actif />} />
        <Route path="/Termine" element={<Termine />} /> */}
      </Route>
    </Routes>
  );
};

export default TodosRoute;
