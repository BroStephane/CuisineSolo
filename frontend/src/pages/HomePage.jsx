import Header from "../components/Header";
import Footer from "../components/Footer";
import ResponsiveContainer from "../components/ResponsiveContainer";
import MessageDisplay from "../components/MessageDisplay";

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-100">
                <MessageDisplay />
                <ResponsiveContainer />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
