import * as PIXI from "pixi.js";

const drawLineCommand: CommandFunction = ({ app, args }) => {
  // if args does not have 4 parts, throw error
  if (args.length !== 4)
    return `expected arguments length 4, received ${args.length}`;

  // define parameters from arguments
  const thickness = 2;
  const x1 = parseInt(args[0], 10),
    y1 = parseInt(args[1], 10),
    x2 = parseInt(args[2], 10),
    y2 = parseInt(args[3], 10);

  // generate line object
  let line = new PIXI.Graphics();
  // set line starting point
  line.position.set(x1, y1);
  // draw line to end point
  line
    .lineStyle(thickness, 0xffffff)
    .moveTo(0, 0)
    .lineTo(x2 - x1, y2 - y1);

  // add line to instance
  app.stage.addChild(line);
};

export default drawLineCommand;
