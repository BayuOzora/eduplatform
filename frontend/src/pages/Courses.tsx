import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, Users } from "lucide-react";
import { Card, Badge, Progress, Button, Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/primitives";
import { cn } from "../lib/utils";

export default function Courses({ }: { isMobile: boolean }) {
  const [activeTab, setActiveTab] = useState("all");
  const coursesList = [
    { id: 1, title: "Software Engineering", code: "CS301", instructor: "Dr. Sarah Johnson", progress: 75, students: 42, rating: 4.8, color: "bg-blue-500", nextClass: "Mon, 10:00 AM", duration: "16 weeks", materials: 45, assignments: 12, status: "ongoing" },
    { id: 2, title: "Data Structures", code: "CS202", instructor: "Prof. Michael Chen", progress: 60, students: 38, rating: 4.9, color: "bg-purple-500", nextClass: "Tue, 2:00 PM", duration: "16 weeks", materials: 52, assignments: 15, status: "ongoing" },
    { id: 3, title: "Database Systems", code: "CS305", instructor: "Dr. Emily Davis", progress: 82, students: 35, rating: 4.7, color: "bg-green-500", nextClass: "Wed, 9:00 AM", duration: "16 weeks", materials: 38, assignments: 10, status: "ongoing" },
    { id: 4, title: "Machine Learning", code: "CS401", instructor: "Dr. James Wilson", progress: 45, students: 30, rating: 4.9, color: "bg-orange-500", nextClass: "Thu, 1:00 PM", duration: "16 weeks", materials: 60, assignments: 18, status: "ongoing" },
    { id: 6, title: "Computer Networks", code: "CS310", instructor: "Dr. Robert Taylor", progress: 100, students: 40, rating: 4.6, color: "bg-indigo-500", nextClass: "Completed", duration: "16 weeks", materials: 35, assignments: 8, status: "completed" },
  ];

  const filteredCourses = activeTab === "all" ? coursesList : coursesList.filter(c => c.status === activeTab);

  return (
    <motion.div className="flex-1 p-6 overflow-y-auto lg:p-8 bg-slate-50 no-scrollbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <h1 className="text-[28px] lg:text-[32px] font-[600] mb-2">My Courses</h1>
        <p className="text-[15px] text-muted-foreground">Manage and track your enrolled courses</p>
      </div>
      
      <Tabs className="space-y-6">
        <TabsList className="bg-white p-1 rounded-[12px] border border-border/50 w-full lg:w-auto grid grid-cols-3 lg:inline-flex">
          <TabsTrigger value="all" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">All Courses</TabsTrigger>
          <TabsTrigger value="ongoing" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">Ongoing</TabsTrigger>
          <TabsTrigger value="completed" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} activeTab={activeTab} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="p-6 rounded-[20px] border border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`${course.color} w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <BookOpen className="text-white w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-[17px] font-[600] truncate">{course.title}</h3>
                    <Badge variant="secondary" className={cn("text-[10px] px-2 py-0.5", course.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                      {course.status}
                    </Badge>
                  </div>
                  <p className="text-[13px] text-muted-foreground mb-1">{course.code} • {course.instructor}</p>
                  <div className="flex items-center gap-2 text-[13px]">
                    <div className="flex items-center gap-1 text-amber-600"><Star className="w-3.5 h-3.5 fill-amber-600" /><span className="font-[500]">{course.rating}</span></div>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-muted-foreground"><Users className="w-3.5 h-3.5" /><span>{course.students} students</span></div>
                  </div>
                </div>
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-[600]">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[13px]">
                  <span className="text-muted-foreground">Next: </span>
                  <span className="font-[500]">{course.nextClass}</span>
                </div>
                <Button size="sm" className="rounded-[10px]">{course.status === "completed" ? "View Cert" : "Enter Course"}</Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}