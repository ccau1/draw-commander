const createCommand: CommandFunction = ({ instance, args }) => {
  // if args does not have 2 parts, throw error
  if (args.length !== 2)
    return `expected arguments length 2, received ${args.length}`;
  // call instance's resize
  instance.resizeTo({ width: parseInt(args[0]), height: parseInt(args[1]) });
};

export default createCommand;
