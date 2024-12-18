import Header from "../components/Header";
import Footer from "../components/Footer";
import MessageDisplay from "../components/MessageDisplay";
import ResponsiveContainer from "../components/ResponsiveContainer";

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex-grow bg-gray-100 flex items-center justify-center">
                <div className="w-full">
                    <MessageDisplay />
                    <ResponsiveContainer />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
