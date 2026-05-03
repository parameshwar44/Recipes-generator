import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Componets/Login";
import Register from "./Componets/Register";
import Dashboard from "./Componets/Dashboard";
import Sidebar from "./Componets/Sidebar";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Sidebar><Dashboard /></Sidebar>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;