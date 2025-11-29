import { useState, useEffect } from 'react';
import { Plus, BookOpen, Trash2, Edit, X, Save } from 'lucide-react';
import { Course, User } from '../types';
import { courseService, userService } from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    teacher: 0
  });

  useEffect(() => {
    fetchCourses();
    fetchTeachers();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await courseService.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await userService.getTeachers();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const teacherList = response.data.filter((u: any) => u.role === 'teacher');
      setTeachers(teacherList);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await courseService.update(formData.id, formData);
        alert('Berhasil diperbarui!');
      } else {
        await courseService.create(formData);
        alert('Berhasil dibuat!');
      }
      closeModal();
      fetchCourses();
    } catch (error) {
      alert('Gagal menyimpan.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin hapus?')) {
      try {
        await courseService.delete(id);
        setCourses(courses.filter(c => c.id !== id));
      } catch (error) {
        alert('Gagal menghapus.');
      }
    }
  };

  const openCreateModal = () => {
    setFormData({ title: '', description: '', teacher: teachers[0]?.id || 0 });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openEditModal = (course: Course) => {
    setFormData({
      id: course.id,
      title: course.title,
      description: course.description,
      teacher: course.teacher
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="p-4 space-y-6 md:p-8">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Daftar Kursus</h1>
        <button onClick={openCreateModal} className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5" /> Tambah
        </button>
      </div>

      {isLoading ? (
        <div className="py-10 text-center">Memuat data...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="p-6 bg-white border border-gray-100 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
              <div className="flex justify-between mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(course)} className="text-gray-400 hover:text-yellow-500"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(course.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold dark:text-white">{course.title}</h3>
              <p className="mt-1 mb-3 text-sm text-gray-500">{course.description}</p>
              <div className="pt-3 border-t dark:border-gray-700">
                <span className="text-sm text-gray-500">Pengajar: {course.teacher_detail?.username || course.teacher}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold dark:text-white">{isEditing ? 'Edit' : 'Tambah'} Kursus</h2>
              <button onClick={closeModal}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Judul" required className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <textarea placeholder="Deskripsi" required rows={3} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" value={formData.teacher} onChange={e => setFormData({...formData, teacher: parseInt(e.target.value)})}>
                <option value={0} disabled>Pilih Guru</option>
                {teachers.map(t => <option key={t.id} value={t.id}>{t.username}</option>)}
              </select>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-800 bg-gray-200 rounded">Batal</button>
                <button type="submit" className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded"><Save className="w-4 h-4"/> Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;