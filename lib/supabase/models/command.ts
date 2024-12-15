import { Command } from "lib/types";
import AuthorModel from "./author";

export default class CommandModel {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  likes: number;
  author: AuthorModel;
  tags: string[];
  output: string;
  description: string;
  lang: string;

  constructor(command: Command) {
    this.id = command.id;
    this.created_at = command.created_at;
    this.updated_at = command.updated_at;
    this.title = command.title;
    this.content = command.content;
    this.likes = command.likes;
    this.author = AuthorModel.from(command.author);
    this.tags = command.tags;
    this.output = command.output;
    this.description = command.description;
    this.lang = command.lang;
  }

  static from(command: Command): CommandModel {
    return new CommandModel(command);
  }

  toJSON(): Command {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      title: this.title,
      content: this.content,
      likes: this.likes,
      author: this.author.toJSON(),
      tags: this.tags,
      output: this.output,
      description: this.description,
      lang: this.lang,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
