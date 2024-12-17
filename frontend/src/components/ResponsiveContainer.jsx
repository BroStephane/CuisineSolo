const ResponsiveContainer = () => {
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-200 p-6 text-center">Bloc 1</div>
            <div className="bg-gray-300 p-6 text-center">Bloc 2</div>
            <div className="bg-gray-400 p-6 text-center">Bloc 3</div>
            <div className="bg-gray-500 p-6 text-center">Bloc 4</div>
        </div>
    );
};

export default ResponsiveContainer;
