import axios from "axios";

export const fetchUserData = async (token) => {
    try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des données utilisateur :",
            error
        );
        return null;
    }
};
