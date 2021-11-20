import { useEffect } from "react";

export const StaticPrompt = ({ oldText, setPrompt }) => {
  useEffect(() => {
    setPrompt(false);
  }, [setPrompt]);
  return (
    <div id="terminal__prompt">
      <span id="terminal__prompt--user">server@ubuntu:</span>
      <span id="terminal__prompt--location">~</span>
      <span id="terminal__prompt--bling">$</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "1rem",
        }}
      >
        <span style={{ color: "greenyellow" }}>
          {` `}
          {oldText}
        </span>
      </div>
    </div>
  );
};
