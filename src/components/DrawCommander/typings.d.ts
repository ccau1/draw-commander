interface Size {
  width: number;
  height: number;
}

interface TerminalOutput {
  text: string;
  color?: string;
  isUser?: boolean;
}

interface Data {
  commands: Command[];
  size: { width: number; height: number };
}

interface Command {
  text: string;
  type: "create" | "line" | "rect" | "fill";
  args: Array<string | int>;
}

interface Commands {
  [key: string]: {
    run: CommandFunction;
    alias?: string[];
  };
}

interface CommandFunction {
  (options: {
    instance: DrawCanvas;
    args: string[];
    app: PIXI.Application;
    renderer: PIXI.AbstractRenderer;
  }): string | void;
}
