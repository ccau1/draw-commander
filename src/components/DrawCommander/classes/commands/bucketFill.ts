const bucketFillCommand: CommandFunction = ({ app, args }) => {
  // if args does not have 3 parts, throw error
  if (args.length !== 3)
    return `expected arguments length 3, received ${args.length}`;

  // // extract parts from args
  // const x = parseInt(args[0]),
  //   y = args[1],
  //   c = args[2];
  // TODO: pending implementation
  return "command BucketFill not implemented";
};

export default bucketFillCommand;
