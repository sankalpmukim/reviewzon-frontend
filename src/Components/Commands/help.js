import { useEffect } from "react";
import { TerminalElement } from "../TerminalElement";

export const Help = ({ setPrompt, systemCommands }) => {
  useEffect(() => {
    setPrompt(true);
  }, [setPrompt]);
  const arr = [];
  for (const key in systemCommands) {
    arr.push(key);
  }
  return (
    <>
      {arr.map((key) => (
        <TerminalElement
          text={`\`${key}\`:\t${systemCommands[key].description}`}
          key={key}
          color="#00FF00"
        />
      ))}
    </>
  );
};
