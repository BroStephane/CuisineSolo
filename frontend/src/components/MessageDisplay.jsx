import { useEffect, useState } from "react";
import axios from "axios";

const MessageDisplay = () => {
    const [message, setMessage] = useState("Chargement...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/");
                setMessage(response.data.message);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données :",
                    error
                );
                setMessage("Erreur de connexion au backend");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center my-5">
            <p className="text-xl text-black font-semibold">{message}</p>
        </div>
    );
};

export default MessageDisplay;
