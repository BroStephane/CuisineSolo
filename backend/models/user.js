const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Associer avec d'autres modèles si nécessaire
        }

        // Vérification du mot de passe
        async isValidPassword(password) {
            return await bcrypt.compare(password, this.passwordHash);
        }
    }
    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            pseudo: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
