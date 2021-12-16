import * as PIXI from "pixi.js";

const drawRectCommand: CommandFunction = ({ app, args }) => {
  // if args does not have 4 parts, throw error
  if (args.length !== 4)
    return `expected arguments length 4, received ${args.length}`;

  // define parameters from arguments
  const x1 = parseInt(args[0], 10),
    y1 = parseInt(args[1], 10),
    x2 = parseInt(args[2], 10),
    y2 = parseInt(args[3], 10);

  // if any number is negative, throw error
  if (x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0) {
    return "all coords must be positive numbers";
  }

  // generate line object
  let rect = new PIXI.Graphics();
  // define color of rectangle fill
  rect.beginFill(0xffffff);
  // define rect position & size
  rect.drawRect(
    x1 > x2 ? x2 : x1,
    y1 > y2 ? y2 : y1,
    Math.abs(x2 - x1),
    Math.abs(y2 - y1)
  );

  // add line to canvas
  app.stage.addChild(rect);
};

export default drawRectCommand;
