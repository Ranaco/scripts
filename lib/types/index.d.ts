export type Script = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  likes: number;
  author: Author;
  tags: string[];
  description: string;
  lang: string;
};

export type Command = Script & {
  output: string;
};

export type Author = {
  name: string;
  avatar: string;
  links: Record<string, string>[];
};
