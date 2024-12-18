import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const AuthPage = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLoginSuccess = (pseudo) => {
        onLogin(pseudo); // Met à jour le pseudo dans l'état global
        navigate("/"); // Redirige vers la page d'accueil
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <AuthForm onLogin={handleLoginSuccess} />
        </div>
    );
};

export default AuthPage;
