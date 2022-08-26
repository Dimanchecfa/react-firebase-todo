import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import Tout from "../pages/Tout";



const TodosRoute = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Tout />} />
      </Route>
    </Routes>
  );
};

export default TodosRoute;
