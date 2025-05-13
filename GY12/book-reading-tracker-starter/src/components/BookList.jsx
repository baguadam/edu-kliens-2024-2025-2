import { useDispatch, useSelector } from "react-redux";
import { selectStatus } from "../state/filterSlice";
import {
  removeBook,
  selectBooksByStatus,
  toggleReadState,
} from "../state/bookSlice";

const BookList = () => {
  const status = useSelector(selectStatus);
  const books = useSelector((state) => selectBooksByStatus(state, status));
  const dispatch = useDispatch();

  return (
    <div className="mt-6 space-y-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex justify-between items-center p-4 bg-gray-100 rounded shadow"
        >
          <div>
            <h3 className="font-semibold text-lg">
              {book.title} -{" "}
              <span className="text-sm text-gray-500">{book.author}</span>
            </h3>
            <p className="text-sm">
              Státusz:{" "}
              <span
                className={book.isRead ? "text-green-600" : "text-yellow-600"}
              >
                {book.isRead ? "Elolvasva" : "Olvasásra vár"}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(toggleReadState(book.id))}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Státusz változtatása
            </button>
            <button
              onClick={() => dispatch(removeBook(book.id))}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Könyv törlése
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
