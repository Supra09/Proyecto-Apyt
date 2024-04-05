import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) =>{
    const [autenticado, setAutenticado] = useState(()=>{
        const isAuth = localStorage.getItem('isAuth');
        return isAuth === 'true';
    });

    const login = ()=>{
        localStorage.setItem('isAuth','true');
        setAutenticado(true);
    };

    const logout = () =>{
        localStorage.removeItem('isAuth');
        setAutenticado(false);
    };

    return (
        <AuthContext.Provider value={{autenticado, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};