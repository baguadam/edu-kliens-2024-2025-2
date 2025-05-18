import { useParams, useNavigate } from "react-router";
import {
  useDeleteStudentMutation,
  useGetStudentLessonsQuery,
  useGetStudentQuery,
} from "../state/apiSlice";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: student, isLoading, error } = useGetStudentQuery(id);
  const { data: lessonData } = useGetStudentLessonsQuery(id);
  const [sendDelete] = useDeleteStudentMutation();

  const handleDeleteClick = async (id) => {
    const result = await sendDelete(id).unwrap();
    navigate("/students", { replace: true });
  };

  if (isLoading) return <p className="p-4">Betöltés...</p>;
  if (error)
    return <p className="p-4 text-red-600">Hiba a diák betöltésekor.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Diák adatai</h2>
      <p>
        <strong>Név:</strong> {student.name}
      </p>
      <p>
        <strong>Tantárgy:</strong> {student.subject}
      </p>
      <p>
        <strong>Óradíj:</strong> {student.price} Ft
      </p>

      <h3 className="text-xl mt-6 mb-2">Órák</h3>
      <ul className="list-disc ml-6">
        {lessonData?.lessons?.map((lesson) => (
          <li key={lesson.id}>{new Date(lesson.date).toLocaleDateString()}</li>
        )) || <p>Nincsenek elérhető órák.</p>}
      </ul>

      <button
        onClick={() => handleDeleteClick(student.id)}
        className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700"
      >
        Törlés
      </button>
    </div>
  );
}
