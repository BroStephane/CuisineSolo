import { useState } from "react";
import axios from "axios";

const AuthForm = ({ onLogin }) => {
    const [isRegister, setIsRegister] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        pseudo: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isRegister
                ? `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`
                : `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

            const response = await axios.post(endpoint, formData);
            setMessage(response.data.message);

            if (!isRegister) {
                const token = response.data.token;
                localStorage.setItem("token", token); // Stocke le token JWT
                onLogin(response.data.pseudo); // Passe le pseudo au parent
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Une erreur est survenue"
            );
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">
                {isRegister ? "Inscription" : "Connexion"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                {isRegister && (
                    <div>
                        <label className="block text-sm font-medium">
                            Pseudo
                        </label>
                        <input
                            type="text"
                            name="pseudo"
                            value={formData.pseudo}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {isRegister ? "S'inscrire" : "Se connecter"}
                </button>
            </form>
            <p className="mt-4 text-center">
                {isRegister ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
                <button
                    className="text-blue-500 underline"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Se connecter" : "S'inscrire"}
                </button>
            </p>
            {message && (
                <p className="mt-4 text-red-500 text-center">{message}</p>
            )}
        </div>
    );
};

export default AuthForm;
