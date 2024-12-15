import supabase from "./client";
import CommandModel from "./models/command";
import ScriptModel from "./models/script";

interface KDBInterface {
  fetchScripts(): Promise<ScriptModel[]>;
  fetchCommands(): Promise<CommandModel[]>;
  fetchScript(id: string): Promise<ScriptModel>;
  fetchCommand(id: string): Promise<CommandModel>;
}

export default class DB implements KDBInterface {
  private async fetchFromSupabase<T>(
    table: string,
    query: string = "*"
  ): Promise<T[]> {
    const { data, error } = await supabase.from(table).select(query);

    if (error) {
      console.error(`Error fetching data from ${table}:`, error);
      throw new Error(`Failed to fetch data from ${table}`);
    }

    return (data as T[]) || [];
  }

  private async fetchSingleFromSupabase<T>(
    table: string,
    title: string,
    query: string = "*"
  ): Promise<T> {
    const { data, error } = await supabase
      .from(table)
      .select(query)
      .eq(`title`, title)
      .single();

    if (error) {
      console.error(`Error fetching ${table} with title ${title}:`, error);
      throw new Error(`Failed to fetch ${table} with id ${title}`);
    }

    return data as T;
  }

  private async fetchContent(url: string): Promise<string> {
    try {
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        console.error(
          `Error fetching content from ${url}: ${response.statusText}`
        );
        throw new Error(`Failed to fetch content from ${url}`);
      }

      return await response.text();
    } catch (error) {
      console.error(`Error fetching content from ${url}:`, error);
      throw new Error(`Failed to fetch content from ${url}`);
    }
  }

  async fetchScripts(): Promise<ScriptModel[]> {
    const data = await this.fetchFromSupabase<ScriptModel>(
      "scripts",
      "*, author(*)"
    );

    return data
      .sort(
        (a, b) =>
          b.updated_at?.localeCompare(a.updated_at || "") ||
          b.created_at?.localeCompare(a.created_at || "")
      )
      .map((script) => ScriptModel.from(script));
  }

  async fetchCommands(): Promise<CommandModel[]> {
    const data = await this.fetchFromSupabase<CommandModel>("commands");

    return data
      .sort(
        (a, b) =>
          b.updated_at?.localeCompare(a.updated_at || "") ||
          b.created_at?.localeCompare(a.created_at || "")
      )
      .map((command) => CommandModel.from(command));
  }

  async fetchScript(title: string): Promise<ScriptModel> {
    const data = await this.fetchSingleFromSupabase<ScriptModel>(
      "scripts",
      title,
      "*, author(*)"
    );
    const script = ScriptModel.from(data);

    if (script.content) {
      script.content = await this.fetchContent(script.content);
    }

    return script;
  }

  async fetchCommand(id: string): Promise<CommandModel> {
    const data = await this.fetchSingleFromSupabase<CommandModel>(
      "commands",
      id
    );
    const command = CommandModel.from(data);

    if (command.content) {
      command.content = await this.fetchContent(command.content);
    }

    return command;
  }
}
