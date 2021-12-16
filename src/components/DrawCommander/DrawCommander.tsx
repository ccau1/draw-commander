import React, { ElementRef, useEffect, useLayoutEffect, useRef } from "react";
import DrawTerminal from "./DrawTerminal";
import styles from "./DrawCommander.module.css";
import { DrawCanvas as DrawCanvasClass } from "./classes/DrawCanvas";

interface DrawCommanderProps {
  commands?: Commands;
}

const DrawCommander = ({ commands }: DrawCommanderProps) => {
  // instantiate references and class instances
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const drawCanvasInstance = useRef<DrawCanvasClass>(
    new DrawCanvasClass()
  ).current;
  const drawTerminalRef = useRef<ElementRef<typeof DrawTerminal>>(null);

  // set commands coming in from outside
  useEffect(() => {
    commands && drawCanvasInstance.setCommands(commands);
  }, [commands, drawCanvasInstance]);

  // attach draw canvas view to our div
  useLayoutEffect(() => {
    if (canvasWrapperRef.current?.children.length) {
      canvasWrapperRef.current.innerHTML = "";
    }
    canvasWrapperRef.current?.appendChild(drawCanvasInstance.view);
  }, [drawCanvasInstance]);

  // handle incoming terminal output
  const onSubmitCommandString = (commandStr: string) => {
    const error = drawCanvasInstance.parseCommand(commandStr);
    if (error) {
      drawTerminalRef.current?.addTerminalOutput({
        text: error,
        color: "red",
      });
    }
  };

  // display initial helper text
  useEffect(() => {
    if (!drawTerminalRef.current) return;
    drawTerminalRef.current.addTerminalOutput({
      text: `
        Start drawing with the following commands:
          - C w h - define new canvas size
          - L x1 y1 x2 y2 - draw line
          - R x1 y1 x2 y2 - draw rectangle
          - Q - quit session

          (additional)

          - RM - remove last element
          - CLEAR - clear all elements
          
      `,
      color: "#5BC1DE",
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={canvasWrapperRef} className={styles.canvasWrapper} />
      <DrawTerminal
        ref={drawTerminalRef}
        onSubmitCommandString={onSubmitCommandString}
      />
    </div>
  );
};

export default DrawCommander;
