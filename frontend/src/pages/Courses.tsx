import React, { useEffect, useState } from "react";
import { getCourses, createCourse, deleteCourse } from "../services/courseService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/layout/MainLayout";

interface Course {
  id: number;
  title: string;
  description: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const data = await getCourses();
      // Pastikan data yang diterima adalah Array
      if (Array.isArray(data)) {
        setCourses(data);
      } else if (data.results && Array.isArray(data.results)) {
         // Handle jika backend menggunakan pagination Django Rest Framework
        setCourses(data.results);
      } else {
        console.error("Format data salah:", data);
        setCourses([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      toast({ variant: "destructive", title: "Error Koneksi", description: "Pastikan backend Django berjalan." });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;
    
    setLoading(true);
    try {
      const newCourse = await createCourse({ title: newTitle, description: newDesc });
      toast({ title: "Berhasil", description: "Kursus berhasil dibuat" });
      setNewTitle("");
      setNewDesc("");
      // Tambahkan manual ke state agar UI update instan tanpa request ulang
      setCourses((prev) => [newCourse, ...prev]); 
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "Gagal membuat kursus" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await deleteCourse(id);
      toast({ title: "Terhapus", description: "Kursus berhasil dihapus" });
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Gagal menghapus" });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl p-6 mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Manajemen Kursus</h1>

        {/* Form Input */}
        <Card className="border-t-4 shadow-md border-t-blue-500">
          <CardHeader>
            <CardTitle>Tambah Kursus Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Judul Kursus</label>
                <Input 
                  placeholder="Contoh: Pemrograman Web Dasar" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Deskripsi</label>
                <Input 
                  placeholder="Deskripsi singkat tentang materi..." 
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Menyimpan..." : "Simpan Kursus"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* List Data */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Card key={course.id} className="flex flex-col justify-between transition-all duration-200 bg-white hover:shadow-lg">
                <div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-blue-700 line-clamp-2">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-gray-600 line-clamp-3">{course.description}</p>
                  </CardContent>
                </div>
                <div className="flex justify-end px-6 m-auto border-t pb6 pt-14">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(course.id)}>
                    Hapus
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-10 text-center text-gray-500 col-span-full">
              Belum ada data kursus. Silakan tambah di atas.
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;