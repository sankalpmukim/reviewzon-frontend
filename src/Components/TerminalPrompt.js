import { useEffect, useState } from "react";
import { ErrorMessage } from "./Commands/ErrorMessage";
import { RequestDisplay } from "./RequestDisplay";
import { StaticPrompt } from "./StaticPrompt";

export const TerminalPrompt = ({ setPrompt, commands, setContent }) => {
  const [liveText, setLiveText] = useState("");
  useEffect(() => {
    const onEnterPress = (totalText) => {
      const commandText = totalText.split(" ")[0];
      if (typeof commands[commandText] === "undefined") {
        setContent((existingContent) =>
          existingContent.concat([
            {
              Component: StaticPrompt,
              props: {
                oldText: totalText,
                setPrompt: setPrompt,
              },
            },
            {
              Component: ErrorMessage,
              props: {
                setPrompt,
                commandText,
              },
            },
          ])
        );
      } else if (commands[commandText].Component === RequestDisplay) {
        setContent((existingContent) =>
          existingContent.concat([
            {
              Component: StaticPrompt,
              props: {
                oldText: totalText,
                setPrompt: setPrompt,
              },
            },
            {
              Component: commands[commandText].Component,
              props: { ...commands[commandText].props, text: totalText },
            },
          ])
        );
      } else {
        // commands[commandText]();
        if (typeof commands[commandText].Component !== "undefined") {
          setContent((existingContent) =>
            existingContent.concat([
              {
                Component: StaticPrompt,
                props: {
                  oldText: totalText,
                  setPrompt: setPrompt,
                },
              },
              commands[commandText],
            ])
          );
        } else {
          commands[commandText].function();
        }
      }
      setLiveText("");
    };
    const registerKeyPresses = (e) => {
      const command = e.code;
      // console.log(`${command} pressed`);
      if (!e.ctrlKey && !e.altKey && !e.metaKey) {
        if (command === "Backspace") {
          setLiveText((text) => text.substring(0, text.length - 1));
        } else if (command.length === 4 && command.substring(0, 3) === "Key") {
          if (e.shiftKey) {
            setLiveText((text) => text + command.substring(3).toUpperCase());
          } else {
            setLiveText((text) => text + command.substring(3).toLowerCase());
          }
        } else if (command === "Space") {
          setLiveText((text) => text + " ");
        } else if (command === "Quote") {
          setLiveText((text) => text + "'");
        } else if (command === "Minus") {
          setLiveText((text) => text + "-");
        } else if (command === "Tab") {
          e.preventDefault();
          setLiveText((text) => text + "    ");
        } else if (command === "Comma") {
          setLiveText((text) => text + ",");
        } else if (
          command.length === 6 &&
          command.substring(0, 5) === "Digit"
        ) {
          setLiveText((text) => text + command.substring(5));
        } else if (
          command.length === 7 &&
          command.substring(0, 6) === "Numpad"
        ) {
          setLiveText((text) => text + command.substring(6));
        } else if (command === "Enter") {
          onEnterPress(liveText);
        } else {
          console.log(`${command.length} && ${command.substring(0, 6)}`);
        }
      } else if (e.ctrlKey && e.code === "Backspace") {
        setLiveText((text) => {
          const arr = text
            .trim()
            .split(" ")
            .filter((v, i, a) => i !== a.length - 1);
          const str = arr.join(" ");
          return str;
        });
      }
    };
    document.addEventListener("keydown", registerKeyPresses);

    return () => {
      document.removeEventListener("keydown", registerKeyPresses);
    };
  }, [setLiveText, commands, liveText, setContent, setPrompt]);

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
        <pre
          style={{
            color: "greenyellow",
            margin: "0",
          }}
        >
          {` `}
          {liveText}
        </pre>
        <span id="terminal__prompt--cursor"></span>
      </div>
    </div>
  );
};
