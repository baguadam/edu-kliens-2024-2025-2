import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Filters from "./components/Filters";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Olvasólista
        </h1>

        <BookForm />

        <Filters />

        <BookList />
      </div>
    </div>
  );
}

export default App;
