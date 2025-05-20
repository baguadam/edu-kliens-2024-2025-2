const Card = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md relative">
      <h2 className="text-xl font-semibold mb-2">{/* KÁRTYA NEVE */}</h2>
      <p className="text-gray-600">{/* KÁRTY LEÍRÁSA */}</p>
      <button className="absolute top-2 right-2 text-sm text-red-500 hover:underline">
        Remove
      </button>
    </div>
  );
};

export default Card;
