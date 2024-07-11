import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        token && setIsAuthenticated(true);
    }, []);

    const login = (userinfo) => {
        if (userinfo.token) {
            setIsAuthenticated(true);
            localStorage.setItem("token", userinfo.token);
            localStorage.setItem("userId", userinfo.id);
            setUserData(userinfo);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, logout, userData }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
