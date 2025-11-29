import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Settings, Mail, Phone, MapPin, Calendar, BookOpen, Award, TrendingUp, Bell, Shield, ChevronRight } from "lucide-react";
import { Card, Avatar, AvatarFallback, Button, Badge, Progress, Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/primitives";
import { cn } from "../lib/utils";

export default function Profile({ isMobile = false }: { isMobile: boolean }) {
  const [activeTab, setActiveTab] = useState("overview");
  const stats = [
    { label: "Courses", value: "12", icon: BookOpen, color: "bg-blue-500" },
    { label: "Completed", value: "7", icon: Award, color: "bg-green-500" },
    { label: "GPA", value: "3.85", icon: TrendingUp, color: "bg-purple-500" },
    { label: "Credits", value: "42", icon: Calendar, color: "bg-orange-500" },
  ];
  
  return (
    <motion.div className="flex-1 p-6 pb-24 overflow-y-auto lg:p-8 bg-slate-50 no-scrollbar lg:pb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card className="p-6 lg:p-8 rounded-[20px] border border-border/50 mb-6 bg-gradient-to-br from-slate-50 to-white">
        <div className={cn("flex gap-6", isMobile ? "flex-col items-center text-center" : "items-start")}>
          <div className="relative">
            <Avatar className={cn("border-4 border-white shadow-lg bg-muted flex items-center justify-center", isMobile ? "w-24 h-24" : "w-32 h-32")}>
              <AvatarFallback className="text-4xl font-semibold text-muted-foreground">MD</AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-0 right-0 w-8 h-8 rounded-full shadow-lg lg:h-10 lg:w-10"><Edit className="w-4 h-4" /></Button>
          </div>
          <div className="flex-1">
            <div className={cn("mb-4", !isMobile && "flex justify-between items-start")}>
              <div>
                <h1 className="text-[22px] lg:text-[28px] font-[600] mb-1">Muhammad Daffa Ramdhani</h1>
                <p className="text-[13px] lg:text-[15px] text-muted-foreground mb-3">Computer Science • Class of 2026</p>
                <div className={cn("flex gap-2", isMobile && "justify-center")}>
                  <Badge className="text-blue-700 bg-blue-100">Student</Badge>
                  <Badge className="text-green-700 bg-green-100">Active</Badge>
                </div>
              </div>
              {!isMobile && <Button variant="outline" className="rounded-[12px]"><Settings className="w-4 h-4 mr-2" />Edit Profile</Button>}
            </div>
            
            <div className={cn("grid gap-3 text-[13px] lg:text-[14px]", isMobile ? "grid-cols-1" : "grid-cols-2")}>
              <div className="flex items-center justify-center gap-2 lg:justify-start"><Mail className="w-4 h-4 text-muted-foreground" /><span>muhammad.daffa@university.edu</span></div>
              <div className="flex items-center justify-center gap-2 lg:justify-start"><Phone className="w-4 h-4 text-muted-foreground" /><span>+62 812-3456-7890</span></div>
              <div className="flex items-center justify-center gap-2 lg:justify-start"><MapPin className="w-4 h-4 text-muted-foreground" /><span>Jakarta, Indonesia</span></div>
              <div className="flex items-center justify-center gap-2 lg:justify-start"><Calendar className="w-4 h-4 text-muted-foreground" /><span>Joined September 2023</span></div>
            </div>
            
            {isMobile && <Button variant="outline" className="w-full rounded-[12px] mt-6"><Settings className="w-4 h-4 mr-2" />Edit Profile</Button>}
          </div>
        </div>
      </Card>

      <div className={cn("grid gap-4 mb-6", isMobile ? "grid-cols-2" : "grid-cols-4")}>
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 lg:p-6 rounded-[20px] border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 lg:w-10 lg:h-10 ${stat.color} rounded-[10px] flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 text-white lg:w-5 lg:h-5" />
              </div>
            </div>
            <p className="text-[11px] lg:text-[13px] text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-[22px] lg:text-[28px] font-[600]">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Tabs className="space-y-6">
        <TabsList className="bg-white p-1 rounded-[12px] border border-border/50 w-full lg:w-auto grid grid-cols-3 lg:inline-flex">
          <TabsTrigger value="overview" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">Overview</TabsTrigger>
          <TabsTrigger value="achievements" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">Achievements</TabsTrigger>
          <TabsTrigger value="settings" activeTab={activeTab} setActiveTab={setActiveTab} className="rounded-[8px]">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" activeTab={activeTab}>
            <Card className="p-6 rounded-[20px] border border-border/50 mb-6">
              <h3 className="text-[18px] font-[600] mb-4">Academic Progress</h3>
              <div className="space-y-4">
                {[{ l: "Overall GPA", v: "3.85 / 4.00", p: 96 }, { l: "Course Completion", v: "58%", p: 58 }, { l: "Assignment Success", v: "92%", p: 92 }].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[14px] mb-2"><span>{item.l}</span><span className="font-[600]">{item.v}</span></div>
                    <Progress value={item.p} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
        </TabsContent>
        
        <TabsContent value="achievements" activeTab={activeTab} className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-2")}>
            {[{t: "Quick Learner", d: "Completed 5 courses", i: TrendingUp, c: "bg-blue-500", e: true}, {t: "Perfect Score", d: "100% in 3 assignments", i: Award, c: "bg-amber-500", e: true}, {t: "Consistent", d: "No missed deadlines", i: Calendar, c: "bg-green-500", e: true}, {t: "Team Player", d: "Active in discussions", i: BookOpen, c: "bg-purple-500", e: false}].map((a, i) => (
               <Card key={i} className={cn("p-6 rounded-[20px] border border-border/50 flex items-start gap-4", !a.e && "opacity-50 grayscale")}>
                 <div className={`${a.c} w-14 h-14 rounded-[14px] flex items-center justify-center flex-shrink-0 text-white`}><a.i className="w-7 h-7" /></div>
                 <div>
                   <h3 className="font-[600] mb-1">{a.t}</h3>
                   <p className="text-[13px] text-muted-foreground mb-2">{a.d}</p>
                   <Badge variant={a.e ? "default" : "outline"} className={cn("text-[10px]", a.e ? "bg-green-100 text-green-700" : "")}>{a.e ? "Earned" : "Locked"}</Badge>
                 </div>
               </Card>
            ))}
        </TabsContent>
        
        <TabsContent value="settings" activeTab={activeTab} className="space-y-4">
           <Card className="p-6 rounded-[20px] border border-border/50 divide-y divide-border/50">
             {[{t: "Notifications", d: "Manage preferences", i: Bell}, {t: "Privacy & Security", d: "Control privacy", i: Shield}, {t: "Account Settings", d: "Update info", i: Settings}].map((s,i) => (
               <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                 <div className="flex items-center gap-3">
                   <s.i className="w-5 h-5 text-muted-foreground" />
                   <div><p className="font-[500] text-[15px]">{s.t}</p><p className="text-[13px] text-muted-foreground">{s.d}</p></div>
                 </div>
                 <ChevronRight className="w-5 h-5 text-muted-foreground" />
               </div>
             ))}
           </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}