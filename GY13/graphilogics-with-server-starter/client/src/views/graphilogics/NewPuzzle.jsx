import { useState } from "react";
import { useAddPuzzleMutation } from "../../state/puzzlesApiSlice";

export const NewPuzzle = () => {
  const [puzzle, setPuzzle] = useState("");
  const [title, setTitle] = useState("");

  const [addPuzzle, { isSuccess }] = useAddPuzzleMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (puzzle.trim() && title.trim()) {
      const result = await addPuzzle({ title, puzzle: JSON.stringify(puzzle.split("\n")) }).unwrap();
      console.log(result);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Új feladvány hozzáadása</h2>

        {isSuccess && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded">
            Sikeresen hozzáadva!
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Cím
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="puzzle" className="block text-gray-700 mb-1">
            Feladvány szöveg (sorok újsorral elválasztva)
          </label>
          <textarea
            id="puzzle"
            value={puzzle}
            onChange={(e) => setPuzzle(e.target.value)}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button type="submit" className={`w-full text-white font-semibold py-2 rounded bg-blue-500 hover:bg-blue-700`}>
          Beküldés
        </button>
      </form>
    </div>
  );
};
