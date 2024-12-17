# Cahier des Charges Complet - Application de Gestion de Cuisine

## Contexte et Objectifs

Cette application web, strictement personnelle (mono-utilisateur), a pour but de faciliter la gestion de recettes, la planification des repas, l’organisation des listes de courses et le suivi de l’inventaire. L’expérience doit être "mobile-first" pour être pleinement utilisable sur smartphone, mais adaptable également aux écrans plus grands.

## Public Cible

-   Un seul utilisateur principal (propriétaire de la cuisine), authentifié par un système JWT.

## Périmètre Fonctionnel

### Gestion Utilisateur

-   **Authentification par JWT**
    -   Création d’un utilisateur (admin / principal) via seed ou endpoint dédié.
    -   Connexion à l’aide d’un email + mot de passe.
    -   Rafraîchissement du token si nécessaire.
-   Sécurité des données par hashing (bcrypt) des mots de passe.

### Gestion des Recettes

-   **Création de Recettes**
    -   Champs :
        -   Titre (title)
        -   Temps de préparation (prepTime), de cuisson (cookTime), de repos (restTime)
        -   Temps total (totalTime) calculé = prepTime + cookTime + restTime
        -   Ingrédients (via une table de liaison RecipeIngredient) : quantités, unités
        -   Étapes (Step) : stockées dans une table dédiée, chacune avec un ordre et une description.
    -   Une recette peut avoir **plusieurs catégories** (relation N-N via une table de liaison RecipeCategory).
-   **Lecture des Recettes**

    -   Affichage du détail complet (ingrédients, catégories, étapes, temps).
    -   Recherche par mot-clé, filtrage par catégories.

-   **Mise à jour/Suppression de Recettes**
    -   CRUD complet (dépendant de l’authentification).

### Planification Hebdomadaire (MealPlan)

-   Planifier des recettes sur des dates spécifiques.
-   Plus de mealType : On associe simplement une recette à une date.
-   Possibilité d’imprimer ou d’exporter le planning (optionnel).

### Liste de Courses (ShoppingList)

-   Génération automatique de la liste de courses à partir du planning (somme des ingrédients nécessaires).
-   Ajout/Modification manuelle d’éléments.
-   Marquer les articles comme achetés.
-   Tri des ingrédients par rayon, selon un critère d’importance (voir plus bas).

### Inventaire

-   Gestion du stock d’ingrédients en cuisine (Inventory).
-   Mise à jour des quantités au fur et à mesure de l’utilisation (recettes cuisinées) ou de l’achat (import d’une liste de courses finalisée).

### Administration (Back-office)

-   CRUD des entités suivantes :
    -   Unités (Unit)
    -   Ingrédients (Ingredient)
    -   Catégories (Category)
    -   Rayons (Rayon)
    -   Importance (pour classer les rayons : RayonImportance)
-   Cet espace d’administration permet de maintenir à jour le référentiel de l’application.

### Automatisations

-   Génération automatique de la liste de courses depuis le planning.
-   Mise à jour semi-automatique de l’inventaire lors de la validation de recettes cuisinées.
-   Notification (optionnel) en cas de manques détectés dans l’inventaire.

## Technologies et Architecture

### Front-End

-   **ReactJS** avec **ViteJS**.
-   Approche **mobile-first**, responsive design (Framework CSS type TailwindCSS recommandé).
-   Bonnes pratiques :
    -   Composants fonctionnels, Hooks
    -   Typage TypeScript recommandé
    -   Tests unitaires (Jest, React Testing Library)
    -   Architecture claire (découpage en pages, components, context, hooks)

### Back-End

-   **Express.js** pour l’API REST.
-   ORM (ex. Prisma, Sequelize ou TypeORM) pour la gestion de la base de données.
-   Migrations, Seeders pour initialisation (création d’un utilisateur, listes de base).
-   Authentification par JWT.
-   Bonnes pratiques :
    -   Architecture en couches (Routes, Controllers, Services, Repositories)
    -   Validation des inputs (Joi, Zod)
    -   Gestion centralisée des erreurs
    -   Logs structurés (Winston ou similaire)
    -   Tests (Jest, Supertest)

### Base de Données

-   Connexion à une base de données distante MySQL.
-   Informations de connexion :
    -   Host : hs432613-001.eu.clouddb.ovh.net
    -   Port : 35660
    -   Nom de la DB : cuisinesolo
    -   Username : cuisinesoloapi
    -   Password : CuisineSoloAPI123

#### Modélisation (Tables et Relations)

-   **User**

    -   id (PK)
    -   email
    -   passwordHash
    -   role (optionnel, si plus tard multi-utilisateurs)

-   **Recipe (Recette)**

    -   id (PK)
    -   title
    -   prepTime (int)
    -   cookTime (int)
    -   restTime (int)
    -   totalTime (int, calculé)

-   **Step (Étape de Recette)**

    -   id (PK)
    -   recipeId (FK → Recipe.id)
    -   order (int, ordre des étapes)
    -   description (texte)

-   **RecipeCategory** (Table de liaison entre Recipe et Category)

    -   id (PK)
    -   recipeId (FK → Recipe.id)
    -   categoryId (FK → Category.id)

-   **Category (Catégorie de Recette)**

    -   id (PK)
    -   name (unique)

-   **Ingredient (Ingrédient)**

    -   id (PK)
    -   name (unique)
    -   rayonId (FK → Rayon.id)
    -   unitId (FK → Unit.id)

-   **Rayon**

    -   id (PK)
    -   name (unique)
    -   importanceId (FK → Importance.id)

-   **Importance (RayonImportance)**

    -   id (PK)
    -   level (int) : niveau ou rang pour classer les rayons

-   **Unit (Unité)**

    -   id (PK)
    -   name (unique)
    -   shortName (ex: g, ml)

-   **RecipeIngredient** (Ingrédient associé à une Recette)

    -   id (PK)
    -   recipeId (FK → Recipe.id)
    -   ingredientId (FK → Ingredient.id)
    -   quantity (float)

-   **Inventory (Inventaire)**

    -   id (PK)
    -   ingredientId (FK → Ingredient.id)
    -   quantity (float)

-   **ShoppingList (Liste de Courses)**

    -   id (PK)
    -   ingredientId (FK → Ingredient.id)
    -   quantity (float)
    -   purchased (bool)

-   **MealPlan (Planning)**
    -   id (PK)
    -   date (date)
    -   recipeId (FK → Recipe.id)  
        _(Pas de mealType)_

## Sécurité et Confidentialité

-   Mots de passe stockés en hash (bcrypt).
-   JWT pour sécuriser les endpoints (sauf auth).
-   Variables sensibles dans .env.

## Performance et Qualité

-   Possibilité de cache (Redis) sur certains endpoints (optionnel).
-   Respect des principes SOLID, code clair, modularité, réutilisabilité.
-   CI/CD avec tests automatisés (optionnel).

## Documentation

-   Documentation du code (JSDoc, TypeDoc).
-   README complet (installation, configuration, lancement).
-   Schémas ER (modèle relationnel), documentation des endpoints API.
-   Guide d’utilisation de l’interface d’administration.

## Évolutions Futures (Optionnel)

-   Mode multi-utilisateurs.
-   Partage de recettes.
-   Notifications push (PWA).
-   Suggestions automatiques de recettes selon l’inventaire.

---

Ce cahier des charges fournit une vision claire de l’application, de ses fonctionnalités, de son architecture et des bonnes pratiques à mettre en œuvre pour un code propre, maintenable et évolutif.
