// Ganti URL ini sesuai port backend Anda (biasanya 8000 untuk Django)
const API_URL = "http://127.0.0.1:8000/api/courses/";

export interface Course {
  id?: number;
  title: string;
  description: string;
  instructor?: string; // Sesuaikan dengan model backend
}

// Fungsi CREATE
export const createCourse = async (course: Course) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  if (!response.ok) throw new Error("Gagal menambah kursus");
  return response.json();
};

// Fungsi READ (Get All)
export const getCourses = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Gagal mengambil data kursus");
  return response.json();
};

// Fungsi UPDATE
export const updateCourse = async (id: number, course: Course) => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  if (!response.ok) throw new Error("Gagal update kursus");
  return response.json();
};

// Fungsi DELETE
export const deleteCourse = async (id: number) => {
  const response = await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Gagal menghapus kursus");
  return true;
};