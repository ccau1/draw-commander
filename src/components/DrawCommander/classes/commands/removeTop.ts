const removeTopCommand: CommandFunction = ({ app }) => {
  // if there is nothing to remove, return error
  if (!app.stage.children.length) return "no elements to remove";
  // remove element at last index
  app.stage.removeChildAt(app.stage.children.length - 1);
};

export default removeTopCommand;
