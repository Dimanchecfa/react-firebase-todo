import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../pages/Main";
import Tout from "../components/All";



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
