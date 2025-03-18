import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Profile() {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-96 text-center">
                <h2 className="text-xl font-semibold mb-4">Witaj, {user?.username}!</h2>
                <p>Email: {user?.email || "Brak e-maila"}</p>
                <button onClick={logout} className="mt-4 bg-red-500 text-white p-2 rounded">Wyloguj</button>
            </div>
        </div>
    );
}