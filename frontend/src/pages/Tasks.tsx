import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Clock, CheckCircle2, Calendar, Circle } from "lucide-react";
import { Card, Badge, Button, Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/primitives";
import { cn } from "../lib/utils";

export default function Tasks({ isMobile = false }: { isMobile: boolean }) {
  const [activeTab, setActiveTab] = useState("all");
  const tasks = [
    { id: 1, title: "Final Project Report", course: "Software Engineering", courseColor: "bg-blue-500", dueDate: "Oct 25", dueTime: "11:59 PM", priority: "high", status: "pending", points: 100, type: "assignment" },
    { id: 2, title: "Weekly Quiz Chapter 5", course: "Data Structures", courseColor: "bg-purple-500", dueDate: "Oct 24", dueTime: "3:00 PM", priority: "high", status: "pending", points: 50, type: "quiz" },
    { id: 3, title: "Lab Assignment 4", course: "Database Systems", courseColor: "bg-green-500", dueDate: "Oct 26", dueTime: "5:00 PM", priority: "medium", status: "in-progress", points: 75, type: "lab" },
    { id: 5, title: "Code Review Exercise", course: "Software Engineering", courseColor: "bg-blue-500", dueDate: "Oct 23", dueTime: "11:59 PM", priority: "low", status: "completed", points: 30, type: "exercise" },
  ];

  const filteredTasks = activeTab === "all" ? tasks : tasks.filter(t => t.status === activeTab);
  const pendingCount = tasks.filter(t => t.status === "pending").length;
  const progressCount = tasks.filter(t => t.status === "in-progress").length;
  const completedCount = tasks.filter(t => t.status === "completed").length;

  return (
    <motion.div className="flex-1 p-6 overflow-y-auto lg:p-8 bg-slate-50 no-scrollbar" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-8">
        <h1 className="text-[28px] lg:text-[32px] font-[600] mb-2">My Tasks</h1>
        <p className="text-[15px] text-muted-foreground">Track all your assignments and deadlines</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Pending", count: pendingCount, color: "bg-red-500", bg: "from-red-50 to-red-100/50", icon: AlertCircle },
          { label: "In Progress", count: progressCount, color: "bg-orange-500", bg: "from-orange-50 to-orange-100/50", icon: Clock },
          { label: "Completed", count: completedCount, color: "bg-green-500", bg: "from-green-50 to-green-100/50", icon: CheckCircle2 }
        ].map((stat, i) => (
          <Card key={i} className={cn("p-4 lg:p-6 rounded-[20px] border border-border/50 bg-gradient-to-br", stat.bg)}>
            <div className={cn("flex items-center gap-3", isMobile && "flex-col text-center")}>
              <div className={cn("w-10 h-10 lg:w-12 lg:h-12 rounded-[12px] flex items-center justify-center text-white", stat.color)}>
                <stat.icon className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <p className="text-[11px] lg:text-[13px] text-muted-foreground">{stat.label}</p>
                <p className="text-[20px] lg:text-[24px] font-[600]">{stat.count}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs className="space-y-6">
        <TabsList className="bg-white p-1 rounded-[12px] border border-border/50 w-full grid grid-cols-4">
          <TabsTrigger value="all" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">All</TabsTrigger>
          <TabsTrigger value="pending" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">Pending</TabsTrigger>
          <TabsTrigger value="in-progress" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px] text-[11px] lg:text-sm">Progress</TabsTrigger>
          <TabsTrigger value="completed" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">Done</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} activeTab={activeTab} className="space-y-4">
          {filteredTasks.map(task => (
             <Card key={task.id} className="p-4 lg:p-6 rounded-[20px] border border-border/50 hover:shadow-lg transition-all cursor-pointer">
             <div className="flex items-start gap-4">
               <div className="pt-1">
                 {task.status === "completed" ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : task.status === "in-progress" ? <AlertCircle className="w-6 h-6 text-orange-500" /> : <Circle className="w-6 h-6 text-muted-foreground" />}
               </div>
               <div className="flex-1 min-w-0">
                 <div className="flex items-start justify-between gap-2 mb-2">
                   <div className="flex-1">
                     <h3 className="text-[16px] lg:text-[17px] font-[600] mb-1">{task.title}</h3>
                     <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 ${task.courseColor} rounded-full`} />
                        <span className="text-[12px] lg:text-[13px] text-muted-foreground">{task.course}</span>
                     </div>
                   </div>
                   <div className="flex flex-col items-end gap-2 lg:flex-row lg:items-center">
                    <Badge variant="secondary" className={cn("text-[10px] px-2 py-0.5", task.priority === "high" ? "bg-red-100 text-red-700" : task.priority === "medium" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700")}>{task.priority}</Badge>
                    <Badge variant="outline" className="text-[10px]">{task.type}</Badge>
                   </div>
                 </div>
                 <div className="flex items-center justify-between pt-2 mt-3 border-t border-border/50">
                   <div className="flex items-center gap-4 text-[12px] lg:text-[13px] text-muted-foreground">
                     <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><span>{task.dueDate}</span></div>
                     <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>{task.dueTime}</span></div>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[13px] font-[600] text-primary">{task.points} pts</span>
                      <Button size="sm" variant={task.status === "completed" ? "outline" : "default"} className="h-8 rounded-[8px]">{task.status === "completed" ? "View" : "Start"}</Button>
                   </div>
                 </div>
               </div>
             </div>
           </Card>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}