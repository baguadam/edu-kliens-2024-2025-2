import { useState } from "react";
import Card from "./components/Card";
import AddForm from "./components/AddForm";

function App() {
  const [items, setItems] = useState([]);

  // TODO: Implementált a kártya törléséért felelős handlers
  const removeItem = (id) => {
    // ...
  };

  // TODO: Implementáld az új kártya hozzáadásáért felelős handlert
  const addItem = (newItem) => {
    // ...
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        React Practice Exercise
      </h1>
      <AddForm onAdd={addItem} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {
          // TODO: Menj végig az betöltöttem itemeken, mindegyikhez jelenítsd meg a Cardot,
          // lecsorgatva az adott elemet, illetve a removeHandlert
        }
      </div>
    </div>
  );
}

export default App;
