import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { fetchUserData } from "./api/auth";

function App() {
    const [userPseudo, setUserPseudo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserData(token).then((data) => {
                if (data) {
                    setUserPseudo(data.pseudo);
                }
            });
        }
    }, []);

    const handleLogin = (pseudo) => {
        setUserPseudo(pseudo);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserPseudo(null);
    };

    return (
        <Router>
            <Navbar userPseudo={userPseudo} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/auth"
                    element={<AuthPage onLogin={handleLogin} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
