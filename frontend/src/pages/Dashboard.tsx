import { motion } from "framer-motion";
import { FileText, CheckCircle, MessageCircle, Calendar, Clock, BookOpen, Users } from "lucide-react";
import { Card, Badge, Progress } from "../components/ui/primitives";
import { cn } from "../lib/utils";

// Sub-components for Dashboard (bisa dipisah lagi jika perlu)
function GreetingSection({ isMobile }: { isMobile: boolean }) {
  const progressValue = 68;
  return (
    <div className={cn("bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-[20px] p-6", isMobile ? 'lg:p-8' : 'lg:p-10')}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className={cn("font-[600] mb-2", isMobile ? "text-[24px]" : "text-[28px] lg:text-[32px]")}>Hi Muhammad Daffa</h2>
          <p className="text-[15px] lg:text-[16px] text-foreground/70 mb-6">Welcome back! You're doing great this semester.</p>
          <div className="max-w-md space-y-2">
            <div className="flex items-center justify-between text-[14px]">
              <span className="text-foreground/70">Overall Progress</span>
              <span className="font-[600]">{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="h-2 bg-white/50" />
          </div>
        </div>
        {!isMobile && (
          <div className="relative items-center justify-center hidden w-24 h-24 lg:flex">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#030213" strokeWidth="8" strokeDasharray={`${progressValue * 2.51} 251`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[18px] font-[600]">{progressValue}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickActions({ isMobile }: { isMobile: boolean }) {
  const actions = [
    { icon: FileText, title: "Materi", description: "Browse learning materials", color: "bg-blue-500" },
    { icon: CheckCircle, title: "Tugas", description: "View assignments", color: "bg-green-500" },
    { icon: MessageCircle, title: "Diskusi", description: "Join discussions", color: "bg-purple-500" },
  ];
  return (
    <div className={cn("grid gap-4", isMobile ? 'grid-cols-1' : 'grid-cols-3')}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Card key={action.title} className="p-6 rounded-[16px] border border-border/50 hover:border-border cursor-pointer transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className={`${action.color} w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] font-[600] mb-1">{action.title}</h3>
                <p className="text-[14px] text-muted-foreground">{action.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function UpcomingTasks() {
  const tasks = [
    { id: 1, title: "Final Project Report", course: "Software Engineering", dueDate: "Oct 25", dueTime: "11:59 PM", priority: "high", color: "bg-red-500" },
    { id: 2, title: "Weekly Quiz Chapter 5", course: "Data Structures", dueDate: "Oct 24", dueTime: "3:00 PM", priority: "medium", color: "bg-orange-500" },
    { id: 3, title: "Lab Assignment 4", course: "Database Systems", dueDate: "Oct 26", dueTime: "5:00 PM", priority: "low", color: "bg-blue-500" },
  ];
  return (
    <Card className="p-6 rounded-[20px] border border-border/50 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[20px] font-[600]">Upcoming Tasks</h3>
        <button className="text-[14px] text-primary hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 rounded-[16px] border border-border/50 hover:border-border transition-all cursor-pointer hover:shadow-sm">
            <div className="flex items-start gap-3">
              <div className={`w-1 h-16 ${task.color} rounded-full flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-[15px] font-[600] truncate">{task.title}</h4>
                  <Badge variant="secondary" className={cn("text-[10px] px-2 py-0.5", task.priority === "high" ? "bg-red-100 text-red-700" : task.priority === "medium" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700")}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-[13px] text-muted-foreground mb-3">{task.course}</p>
                <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /><span>{task.dueDate}</span></div>
                  <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /><span>{task.dueTime}</span></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentCourses() {
  const courses = [
    { id: 1, title: "Software Engineering", instructor: "Dr. Sarah Johnson", progress: 75, students: 42, color: "bg-blue-500", nextClass: "Mon, 10:00 AM" },
    { id: 2, title: "Data Structures & Algo", instructor: "Prof. Michael Chen", progress: 60, students: 38, color: "bg-purple-500", nextClass: "Tue, 2:00 PM" },
    { id: 3, title: "Database Systems", instructor: "Dr. Emily Davis", progress: 82, students: 35, color: "bg-green-500", nextClass: "Wed, 9:00 AM" },
  ];
  return (
    <Card className="p-6 rounded-[20px] border border-border/50 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[20px] font-[600]">Recent Courses</h3>
        <button className="text-[14px] text-primary hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="p-5 rounded-[16px] border border-border/50 hover:border-border transition-all cursor-pointer hover:shadow-sm">
            <div className="flex items-start gap-4">
              <div className={`${course.color} w-12 h-12 rounded-[12px] flex items-center justify-center flex-shrink-0`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[15px] font-[600] mb-1 truncate">{course.title}</h4>
                <p className="text-[13px] text-muted-foreground mb-3">{course.instructor}</p>
                <div className="mb-3 space-y-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-[500]">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-3.5 h-3.5" />
                    <span>{course.students} students</span>
                  </div>
                  <span className="text-muted-foreground">Next: {course.nextClass}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function Dashboard({ isMobile = false }: { isMobile: boolean }) {
  return (
    <motion.main 
      className="flex-1 p-6 space-y-6 overflow-y-auto lg:p-8 bg-slate-50 no-scrollbar"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <GreetingSection isMobile={isMobile} />
      <div>
        <h3 className="text-[18px] font-[600] mb-4">Quick Actions</h3>
        <QuickActions isMobile={isMobile} />
      </div>
      <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2")}>
        <UpcomingTasks />
        <RecentCourses />
      </div>
    </motion.main>
  );
}