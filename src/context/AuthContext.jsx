import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
    }

    const logout = async () => {
        try {
            await fetch("https://ryal-jobstreet.rakarawr.com//api/user/logout", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                }

            });

            window.location.reload()
        } catch (error) {
            console.error("Logout gagal:", error);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => { useContext(AuthContext) }