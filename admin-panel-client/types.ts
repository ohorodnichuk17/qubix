export interface User {
   id: string;
   email: string;
   role: string;
}

export interface Post {
   id: string;
   title: string;
   content: string;
   images: { id: string; imagePath: string }[];
}

export interface Comment {
   id: string;
   message: string;
}

export interface Story {
   id: string;
   content: string;
}