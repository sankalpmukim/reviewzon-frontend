import { useEffect } from "react";
import { TerminalElement } from "../TerminalElement";

export const Help = ({ setPrompt }) => {
  useEffect(() => {
    setPrompt(true);
  }, [setPrompt]);
  return <TerminalElement text={`This is the help text`} />;
};
