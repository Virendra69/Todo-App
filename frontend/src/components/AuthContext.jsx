import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

    const saveToken = (token) => {
        setAuthToken(token);
        localStorage.setItem('authToken', token);
    };

    const removeToken = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authToken, saveToken, removeToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };