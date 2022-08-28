import { Route, Routes } from "react-router-dom";
import TodosRoute from "./router/todos";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<TodosRoute />}>

          {/* <Route path="/*" element={<TodosRoute />} /> */}

        </Route>
      </Routes>
    </>
  );
}

export default App;
