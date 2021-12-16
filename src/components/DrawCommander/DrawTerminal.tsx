import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./DrawTerminal.module.css";

interface DrawTerminalProps {
  onSubmitCommandString: (command: string) => void;
}

const DrawTerminal: React.ForwardRefRenderFunction<
  { addTerminalOutput: (output: TerminalOutput) => void },
  DrawTerminalProps
> = ({ onSubmitCommandString }: DrawTerminalProps, ref) => {
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const [terminalOutputs, setTerminalOutputs] = useState<TerminalOutput[]>([]);
  const [inputText, setInputText] = useState("");

  // on input submit string, store string to our history and pass
  // string to above
  const _onSubmitCommandString = (txt: string, color?: string) => {
    terminalOutputs.push({ text: txt, color, isUser: true });
    setTerminalOutputs([...terminalOutputs]);
    onSubmitCommandString(txt);
    setInputText("");
    setTimeout(
      () =>
        terminalOutputRef.current?.scrollTo({
          top: terminalOutputRef.current.scrollHeight,
          behavior: "smooth",
        }),
      10
    );
  };

  // expose methods for parent to call
  useImperativeHandle(
    ref,
    () => ({
      addTerminalOutput: (output: TerminalOutput) => {
        terminalOutputs.push(output);
        setTerminalOutputs([...terminalOutputs]);
        setTimeout(
          () =>
            terminalOutputRef.current?.scrollTo({
              top: terminalOutputRef.current.scrollHeight,
              behavior: "smooth",
            }),
          10
        );
      },
    }),
    [terminalOutputs]
  );

  return (
    <div className={styles.wrapper}>
      {/* output container */}
      <div ref={terminalOutputRef} className={styles.history}>
        {terminalOutputs.map((terminalOutput, terminalOutputIndex) => (
          <div
            className={
              styles.terminalOutput +
              (terminalOutput.isUser ? " " + styles.isUser : "")
            }
            key={`output_${terminalOutputIndex}`}
          >
            {terminalOutput.text
              .split(/\r?\n/)
              .map((lineText, lineTextIndex) => (
                <span
                  key={`output_line_${terminalOutputIndex}_${lineTextIndex}`}
                  style={{
                    ...(terminalOutput.color
                      ? { color: terminalOutput.color }
                      : {}),
                  }}
                >
                  {lineText}
                </span>
              ))}
          </div>
        ))}
      </div>
      {/* input container */}
      <div className={styles.inputWrapper}>
        <span>{"::"}</span>
        <input
          type={"text"}
          placeholder="enter command here..."
          multiple
          value={inputText}
          className={styles.input}
          onChange={(ev) => setInputText(ev.target.value)}
          onKeyUp={(ev) =>
            ev.key === "Enter" && _onSubmitCommandString(inputText)
          }
        />
      </div>
    </div>
  );
};

export default forwardRef(DrawTerminal);
