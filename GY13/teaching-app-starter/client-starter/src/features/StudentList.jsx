import { Link } from "react-router";
import { useGetStudentsQuery } from "../state/apiSlice";

export default function StudentList() {
  const { data: students, isLoading, error } = useGetStudentsQuery();

  if (isLoading) return <p className="p-4">Betöltés...</p>;
  if (error)
    return <p className="p-4 text-red-600">Hiba a diákok lekérésekor.</p>;
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Diákok</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li key={student.id} className="border p-3 rounded shadow">
            <p>{student.name}</p>
            <p className="text-sm text-gray-600">{student.subject}</p>
            <Link
              to={`/students/${student.id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              Részletek
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
