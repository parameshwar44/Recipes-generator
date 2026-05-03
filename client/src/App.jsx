import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Componets/Login";
import Register from "./Componets/Register";
import Dashboard from "./Componets/Dashboard";
import Sidebar from "./Componets/Sidebar";
// import Dashboard1 from "../User/Dashboard1";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Sidebar><Dashboard /></Sidebar>} />
        {/* <Route path='/Sidebar' element={<Sidebar/>} /> */}
        {/* <Route path='/dashboard1' element={<Dashboard1 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;