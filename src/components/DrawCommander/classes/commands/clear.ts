const clearCommand: CommandFunction = ({ app, args }) => {
  // remove all elements inside canvas
  app.stage.removeChildren();
};

export default clearCommand;
