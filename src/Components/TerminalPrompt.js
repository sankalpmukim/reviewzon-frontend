import { useEffect } from "react";

export const TerminalPrompt = ({ liveText, setLiveText, commands }) => {
  useEffect(() => {
    const onEnterPress = (commandText) => {
      if (typeof commands[commandText] === "undefined") {
        alert(
          `${commandText} is not recognized as an internal or external command.`
        );
      } else {
        commands[commandText]();
      }
    };
    const registerKeyPresses = (e) => {
      const command = e.code;
      console.log(`${command} pressed`);
      if (command === "Backspace") {
        setLiveText((text) => text.substring(0, text.length - 1));
      } else if (command.length === 4 && command.substring(0, 3) === "Key") {
        setLiveText((text) => text + command.substring(3).toLowerCase());
      } else if (command === "Space") {
        setLiveText((text) => text + " ");
      } else if (command === "Quote") {
        setLiveText((text) => text + "'");
      } else if (command === "Minus") {
        setLiveText((text) => text + "-");
      } else if (command.length === 6 && command.substring(0, 5) === "Digit") {
        setLiveText((text) => text + command.substring(5));
      } else if (command.length === 7 && command.substring(0, 6) === "Numpad") {
        setLiveText((text) => text + command.substring(6));
      } else if (command === "Enter") {
        onEnterPress(liveText);
      } else {
        console.log(`${command.length} && ${command.substring(0, 6)}`);
      }
    };
    document.addEventListener("keyup", registerKeyPresses);

    return () => {
      document.removeEventListener("keyup", registerKeyPresses);
    };
  }, [setLiveText, commands, liveText]);
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
          {liveText}
        </span>
        <span id="terminal__prompt--cursor"></span>
      </div>
    </div>
  );
};
