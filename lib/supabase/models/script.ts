import { Script } from "lib/types";
import AuthorModel from "./author";

export default class ScriptModel {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  likes: number;
  author: AuthorModel;
  tags: string[];
  description: string;
  lang: string;

  constructor(script: Script) {
    this.id = script.id;
    this.created_at = script.created_at;
    this.updated_at = script.updated_at;
    this.title = script.title;
    this.content = script.content;
    this.likes = script.likes;
    this.author = AuthorModel.from(script.author);
    this.tags = script.tags;
    this.description = script.description;
    this.lang = script.lang;
  }

  static from(script: Script): ScriptModel {
    return new ScriptModel(script);
  }

  toJSON(): Script {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      title: this.title,
      content: this.content,
      likes: this.likes,
      author: this.author.toJSON(),
      tags: this.tags,
      description: this.description,
      lang: this.lang,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
