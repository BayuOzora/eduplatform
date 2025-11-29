import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { getCourses, createCourse, updateCourse, deleteCourse, Course } from "@/services/courseService";
import { useToast } from "@/components/ui/use-toast";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // State untuk Form Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  // 1. READ: Ambil data saat halaman dibuka
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Gagal mengambil data" });
    } finally {
      setLoading(false);
    }
  };

  // Handle Submit (Bisa Create atau Update tergantung editingId)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // 2. UPDATE
        await updateCourse(editingId, formData);
        toast({ title: "Berhasil", description: "Kursus berhasil diperbarui" });
      } else {
        // 3. CREATE
        await createCourse(formData);
        toast({ title: "Berhasil", description: "Kursus berhasil ditambahkan" });
      }
      setIsModalOpen(false);
      setFormData({ title: "", description: "" });
      setEditingId(null);
      loadData(); // Reload data tabel
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menyimpan" });
    }
  };

  // Persiapan Edit
  const handleEditClick = (course: Course) => {
    setEditingId(course.id!);
    setFormData({ title: course.title, description: course.description });
    setIsModalOpen(true);
  };

  // 4. DELETE
  const handleDeleteClick = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus kursus ini?")) {
      try {
        await deleteCourse(id);
        toast({ title: "Terhapus", description: "Kursus telah dihapus" });
        loadData();
      } catch (error) {
        toast({ variant: "destructive", title: "Gagal", description: "Gagal menghapus data" });
      }
    }
  };

  // Filter pencarian sederhana
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header & Tombol Tambah */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mata Kuliah</h1>
            <p className="text-muted-foreground">Kelola daftar mata kuliah Anda di sini.</p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingId(null); setFormData({ title: "", description: "" }); }}>
                <Plus className="w-4 h-4 mr-2" /> Tambah Kursus
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit Kursus" : "Tambah Kursus Baru"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Kursus</Label>
                  <Input 
                    id="title" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Input 
                    id="description" 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full">Simpan</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari kursus..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tampilan Data (Grid Card) */}
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Card key={course.id} className="transition-shadow hover:shadow-md">
                  <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                    <CardTitle className="text-lg font-medium">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
                      {course.description || "Tidak ada deskripsi"}
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(course)}>
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(course.id!)}>
                        <Trash2 className="w-4 h-4 mr-1" /> Hapus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="col-span-3 py-10 text-center text-muted-foreground">
                Belum ada data kursus. Silakan tambah baru.
              </p>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Courses;