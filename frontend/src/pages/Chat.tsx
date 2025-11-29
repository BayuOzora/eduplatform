import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Phone, Video, MoreVertical, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback, Badge, Button, Input } from "../components/ui/primitives";
import { cn } from "../lib/utils";

export default function Chat({ isMobile = false }: { isMobile: boolean }) {
  const [selectedChat, setSelectedChat] = useState<number | null>(isMobile ? null : 1);
  const [msgText, setMsgText] = useState("");

  const conversations = [
    { id: 1, name: "Software Engineering Group", type: "group", avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop", lastMessage: "Sarah: The deadline has been extended!", time: "2m ago", unread: 3, online: true },
    { id: 2, name: "Dr. Sarah Johnson", type: "private", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", lastMessage: "Thanks for submitting the assignment", time: "1h ago", unread: 0, online: true },
    { id: 3, name: "Database Project Team", type: "group", avatar: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop", lastMessage: "Mike: I've pushed the latest changes", time: "3h ago", unread: 5, online: false },
  ];

  const messages = [
    { id: 1, sender: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", content: "Hey everyone! Did you see the announcement?", time: "10:30 AM", isOwn: false },
    { id: 2, sender: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", content: "Yes! That's great news. We have an extra week now.", time: "10:32 AM", isOwn: true },
    { id: 3, sender: "Mike Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", content: "Perfect timing. I was worried about the database implementation.", time: "10:35 AM", isOwn: false },
  ];

  const activeConv = conversations.find(c => c.id === selectedChat);

  if (isMobile && !selectedChat) {
    return (
      <motion.div className="flex-1 pb-20 overflow-y-auto bg-slate-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="sticky top-0 z-10 p-4 bg-white border-b border-border">
          <h2 className="text-[20px] font-[600] mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9 rounded-[12px] bg-muted/50 border-0 h-10 text-[14px]" />
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {conversations.map((conv) => (
            <div key={conv.id} onClick={() => setSelectedChat(conv.id)} className="flex gap-3 p-4 transition-colors bg-white active:bg-muted/50">
              <div className="relative">
                <Avatar className="w-12 h-12"><AvatarImage src={conv.avatar} /><AvatarFallback>{conv.name[0]}</AvatarFallback></Avatar>
                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1"><h3 className="font-[600] text-[15px]">{conv.name}</h3><span className="text-[11px] text-muted-foreground">{conv.time}</span></div>
                <div className="flex justify-between"><p className="text-[13px] text-muted-foreground truncate">{conv.lastMessage}</p>{conv.unread > 0 && <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]">{conv.unread}</Badge>}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-1 h-full overflow-hidden bg-slate-50">
      {!isMobile && (
        <div className="flex flex-col bg-white border-r w-80 border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-[24px] font-[600] mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9 rounded-[12px] bg-muted/50 border-0" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div key={conv.id} onClick={() => setSelectedChat(conv.id)} className={cn("p-4 border-b border-border/50 cursor-pointer hover:bg-muted/50 transition-colors flex gap-3", selectedChat === conv.id && "bg-muted/50")}>
                <div className="relative">
                  <Avatar className="w-10 h-10"><AvatarImage src={conv.avatar} /><AvatarFallback>{conv.name[0]}</AvatarFallback></Avatar>
                  {conv.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1"><h3 className="font-[600] text-[14px] truncate">{conv.name}</h3><span className="text-[11px] text-muted-foreground">{conv.time}</span></div>
                  <p className="text-[12px] text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={cn("flex-1 flex flex-col bg-slate-50 h-full", isMobile && "fixed inset-0 z-50 bg-white")}>
        <div className="flex items-center justify-between flex-shrink-0 p-4 bg-white border-b lg:p-6 border-border">
          <div className="flex items-center gap-3">
            {isMobile && <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)} className="-ml-2"><ArrowLeft className="w-5 h-5" /></Button>}
            <Avatar className="w-10 h-10"><AvatarImage src={activeConv?.avatar} /><AvatarFallback>{activeConv?.name[0]}</AvatarFallback></Avatar>
            <div>
              <h3 className="text-[15px] lg:text-[16px] font-[600]">{activeConv?.name}</h3>
              <p className="text-[12px] lg:text-[13px] text-muted-foreground">{activeConv?.type === 'group' ? '12 members' : 'Active now'}</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="rounded-[10px]"><Phone className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-[10px]"><Video className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-[10px]"><MoreVertical className="w-5 h-5" /></Button>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto lg:p-6">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-3", msg.isOwn ? "flex-row-reverse" : "")}>
              {!msg.isOwn && <Avatar className="w-8 h-8"><AvatarImage src={msg.avatar} /><AvatarFallback>{msg.sender[0]}</AvatarFallback></Avatar>}
              <div className={cn("flex flex-col max-w-[75%]", msg.isOwn ? "items-end" : "items-start")}>
                {!msg.isOwn && <p className="text-[12px] font-[500] mb-1 ml-1">{msg.sender}</p>}
                <div className={cn("px-4 py-2.5 rounded-[16px]", msg.isOwn ? "bg-primary text-primary-foreground rounded-br-[4px]" : "bg-white border border-border/50 rounded-bl-[4px]")}>
                  <p className="text-[14px]">{msg.content}</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex-shrink-0 p-4 bg-white border-t lg:p-6 border-border">
          <div className="flex items-center gap-2 lg:gap-3">
            <Button variant="ghost" size="icon" className="rounded-[10px] shrink-0"><Paperclip className="w-5 h-5" /></Button>
            <Input value={msgText} onChange={e => setMsgText(e.target.value)} placeholder="Type a message..." className="flex-1 rounded-[12px] border-border/50" />
            <Button size="icon" className="rounded-[12px] shrink-0"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}