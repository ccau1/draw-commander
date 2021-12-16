import bucketFillCommand from "./bucketFill";
import clearCommand from "./clear";
import createCommand from "./create";
import drawLineCommand from "./drawLine";
import drawRectCommand from "./drawRect";
import quitCommand from "./quit";
import removeTopCommand from "./removeTop";

const commands = {
  b: { run: bucketFillCommand },
  c: { run: createCommand },
  l: { run: drawLineCommand, alias: ["line"] },
  r: { run: drawRectCommand, alias: ["rect"] },
  q: { run: quitCommand, alias: ["quit"] },
  rm: { run: removeTopCommand, alias: ["remove"] },
  clear: { run: clearCommand },
} as Commands;

export default commands;
