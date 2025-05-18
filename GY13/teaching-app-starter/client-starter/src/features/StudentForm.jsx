import { useState } from "react";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState(0);
  const [lessonDates, setLessonDates] = useState("");

  const isLoading = false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // lessonDates: lessonDates.split(",").map((d) => d.trim()),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-4">Új diák hozzáadása</h2>

      <div className="mb-4">
        <label className="block mb-1">Név</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Tantárgy</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Óradíj</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1">
          Órák dátumai (vesszővel elválasztva)
        </label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={lessonDates}
          onChange={(e) => setLessonDates(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full ${
          isLoading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"
        } text-white py-2 rounded`}
      >
        {isLoading ? "Feldolgozás..." : "Hozzáadás"}
      </button>
    </form>
  );
}
