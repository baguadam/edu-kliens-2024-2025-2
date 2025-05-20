import { useState } from "react";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // TODO: Implementáld a form submission handlert
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logika
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-2xl shadow-md max-w-xl mx-auto"
    >
      <h2 className="text-lg font-medium mb-4">Add New Item</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};

export default AddForm;
