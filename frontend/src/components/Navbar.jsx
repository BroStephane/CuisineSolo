const Navbar = ({ userPseudo, onLogout }) => {
    const handleLogout = () => {
        onLogout();
    };

    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Application de Cuisine</h1>
            <div>
                {userPseudo ? (
                    <div>
                        Bonjour, <span className="font-bold">{userPseudo}</span>{" "}
                        <button
                            onClick={handleLogout}
                            className="ml-4 underline text-sm hover:text-gray-200"
                        >
                            Déconnexion
                        </button>
                    </div>
                ) : (
                    <a
                        href="/auth"
                        className="underline text-sm hover:text-gray-200"
                    >
                        Inscription / Connexion
                    </a>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
