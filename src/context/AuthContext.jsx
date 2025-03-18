import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config";

const AUTH_ME_API_URL = `${API_URL}/api/auth/me`;
const USER_ME_API_URL = `${API_URL}/api/user/me`;

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(AUTH_ME_API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                .then((response) => setUser(response.data))
                .catch(() => logout());
        }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        axios
            .get(USER_ME_API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUser(res.data));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;