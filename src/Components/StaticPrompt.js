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
        }}
      >
        <pre style={{ color: "greenyellow", margin: "0" }}>
          {` `}
          {oldText}
        </pre>
      </div>
    </div>
  );
};
