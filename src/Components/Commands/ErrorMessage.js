import { useEffect } from "react";
import { TerminalElement } from "../TerminalElement";

export const ErrorMessage = ({ setPrompt, commandText, entireText }) => {
  useEffect(() => {
    setPrompt(true);
  }, [setPrompt]);
  return (
    <>
      {" "}
      {entireText ? (
        <TerminalElement text={`${commandText}`} color={`#FF0000`} />
      ) : (
        <TerminalElement
          text={`${commandText} is not recognized as an internal commands`}
          color={`#FF0000`}
        />
      )}
    </>
  );
};
