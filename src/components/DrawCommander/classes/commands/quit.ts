import { DrawCanvas } from "../DrawCanvas";
import clearCommand from "./clear";

const quitCommand: CommandFunction = (args) => {
  // extract fields from incoming arguments
  const { instance, app } = args;

  // animate minimizing canvas
  const minimizeCanvas = () => {
    (instance as DrawCanvas).resizeTo({
      width: Math.max((instance as DrawCanvas).width - 30, 0),
      height: Math.max((instance as DrawCanvas).height - 30, 0),
    });
    if (instance.width === 0 || instance.height === 0)
      app.ticker.remove(minimizeCanvas);
  };
  // add animation to app ticker
  app.ticker.add(minimizeCanvas);
  // clear all drawings
  clearCommand(args);
};

export default quitCommand;
