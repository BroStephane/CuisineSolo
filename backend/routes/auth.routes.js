const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const authenticateToken = require("../middlewares/auth.middleware");

// Route pour récupérer le pseudo
router.get("/me", authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId, {
            attributes: ["pseudo"],
        });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        res.json({ pseudo: user.pseudo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Inscription
router.post("/register", async (req, res) => {
    const { email, pseudo, password } = req.body;

    try {
        // Vérifier si l'email ou le pseudo existe déjà
        const existingUser = await User.findOne({ where: { email } });
        const existingPseudo = await User.findOne({ where: { pseudo } });
        if (existingUser) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }
        if (existingPseudo) {
            return res.status(400).json({ message: "Pseudo déjà utilisé" });
        }

        // Hasher le mot de passe
        const passwordHash = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const newUser = await User.create({ email, pseudo, passwordHash });
        res.status(201).json({
            message: "Utilisateur créé",
            userId: newUser.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Connexion
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res
                .status(400)
                .json({ message: "Email ou mot de passe incorrect" });
        }

        // Vérifier le mot de passe
        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            return res
                .status(400)
                .json({ message: "Email ou mot de passe incorrect" });
        }

        // Générer le token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

module.exports = router;
