import React from "react";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RutaProtegida from "./routes/rutaProtegida.jsx";
import Login from "./componentes/1-login/login.jsx";
import Supervisor from './componentes/2-supervisor/supervisor.jsx'
import Asesor from "./componentes/3-asesor/asesor.jsx";


function App() {


  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<RutaProtegida />}>
            <Route path="/Supervisor" element={<Supervisor/>}/>
            <Route path="/Asesor" element={<Asesor/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
