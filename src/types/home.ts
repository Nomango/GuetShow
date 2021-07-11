export interface ProjectStudent {
  number?: string;
  name?: string;
}

export interface ProjectItem {
  id?: number;
  name?: string;
  school: string;
  level?: number;
  student?: ProjectStudent;
  teachers: number[];
  brief?: string;
  cover?: string;
  content?: string;
}

export interface TeacherItem {
  id?: 5;
  name?: string;
  number?: string;
  school?: string;
}
