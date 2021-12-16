import * as PIXI from "pixi.js";
import commands from "./commands";

export class DrawCanvas {
  // internal variables
  protected _app: PIXI.Application;
  protected _renderer: PIXI.AbstractRenderer;
  protected _width: number;
  protected _height: number;
  protected _commands: Commands = commands;

  // Getters
  get width() {
    return this._width;
  }
  get height() {
    return this._width;
  }
  get size() {
    return { width: this._width, height: this._height };
  }

  get view() {
    return this._app.view;
  }

  // Setters

  constructor(options?: { size?: Size; commands?: Commands }) {
    // instantiate size
    this._width = options?.size?.width || 300;
    this._height = options?.size?.height || 300;
    // merge original command set with argument commands
    commands && this.setCommands(commands);
    // generate pixi app instance
    this._app = new PIXI.Application({
      width: this.width,
      height: this.height,
    });
    // define renderer
    this._renderer = this._app.renderer;
    this._renderer.backgroundColor = 0x000000;
    this._renderer.plugins.interaction.autoPreventDefault = false;
  }

  /**
   * merge existing commands with new commands
   * @param {Commands} commands - an object of commands to merge with existing
   * */
  setCommands(commands: Commands) {
    this._commands = { ...this._commands, ...commands };
  }

  /**
   * parse command from string
   * @param {string} str - command line string
   * @returns {string|null} - returns a string error or null if success
   * */
  parseCommand(str: string): string | null {
    const strParts = str.trim().split(/\s+/);

    const cmdKey = Object.keys(commands).find(
      (c) =>
        strParts[0].toLowerCase() === c ||
        (commands[c].alias || []).includes(strParts[0].toLowerCase())
    );

    if (!cmdKey) {
      return "command not found";
    }

    const error = commands[cmdKey].run({
      instance: this,
      app: this._app,
      renderer: this._renderer,
      args: strParts.slice(1),
    });

    return error || null;
  }

  /**
   * resize renderer to new width and height
   * @param {{width: number; height: number;}} size - width and height of new size
   * */
  resizeTo(size: { width: number; height: number }) {
    this._width = size.width;
    this._height = size.height;
    this._renderer.resize(size.width, size.height);
  }
}
