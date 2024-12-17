const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const app = express();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
    }
);

// Configuration CORS
app.use(cors({ origin: "http://localhost:5173" })); // Autorise uniquement ton frontend

// Route principale
app.get("/", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ message: "Serveur connecté, connexion BDD réussie" });
    } catch (error) {
        console.error("Erreur lors de la connexion à la BDD:", error);
        res.status(500).json({ message: "Erreur de connexion à la BDD" });
    }
});

module.exports = app;
