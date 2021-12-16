export const textToCommand = (txt: string): Command => {
  const txtParts = txt.trim().split(/\s+/);
  return {
    text: txt,
    type: "create",
    args: txtParts.slice(1),
  };
};
