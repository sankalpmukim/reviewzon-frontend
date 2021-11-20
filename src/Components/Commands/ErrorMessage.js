import { useEffect } from "react";
import { TerminalElement } from "../TerminalElement";

export const ErrorMessage = ({ setPrompt, commandText }) => {
  useEffect(() => {
    setPrompt(true);
  }, [setPrompt]);
  return (
    <TerminalElement
      text={`${commandText} is not recognized as an internal commands`}
      color={`#FF0000`}
    />
  );
};
