export interface User {
    id: number;
    username: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
}

export interface Course {
    id: number;
    title: string;
    description: string;
    teacher: number;
    teacher_detail?: User;
    created_at?: string;
    updated_at?: string;
}