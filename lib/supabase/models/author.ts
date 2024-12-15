import { Author } from "lib/types";

export default class AuthorModel {
  name: string;
  avatar: string;
  links: Record<string, string>[];

  constructor(author: Author) {
    this.name = author.name;
    this.avatar = author.avatar;
    this.links = author.links;
  }

  static from(author: Author): AuthorModel {
    return new AuthorModel(author);
  }

  toJSON(): Author {
    return {
      name: this.name,
      avatar: this.avatar,
      links: this.links,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
