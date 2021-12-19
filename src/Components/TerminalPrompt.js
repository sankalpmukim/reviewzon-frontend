import { useEffect, useState } from "react";
import { ErrorMessage } from "./Commands/ErrorMessage";
import { OnlineSentimentAnalysis } from "./OnlineSentimentAnalysis";
import { RequestDisplay } from "./RequestDisplay";
import { StaticPrompt } from "./StaticPrompt";

export const TerminalPrompt = ({ setPrompt, commands, setContent }) => {
  const [liveText, setLiveText] = useState("");
  useEffect(() => {
    const onEnterPress = (totalText) => {
      const AddErrorMessage = (commandText, entireText) => {
        if (entireText) {
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
                  entireText,
                },
              },
            ])
          );
        } else {
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
                  entireText,
                },
              },
            ])
          );
        }
      };
      const commandText = totalText.split(" ")[0];
      if (typeof commands[commandText] === "undefined") {
        AddErrorMessage(commandText, false);
      } else if (
        commands[commandText].Component === RequestDisplay ||
        commands[commandText].Component === OnlineSentimentAnalysis
      ) {
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
        if (commands[commandText].isFunction === false) {
          if (commandText === "execute-ml") {
            let doExperiment;
            try {
              const oneDashIdx = totalText.split(" ")[1].indexOf("-");
              const twoDashIdx = totalText.split(" ")[1].indexOf("--");
              if (
                (oneDashIdx === 0 &&
                  totalText
                    .split(" ")[1]
                    .substring(oneDashIdx + 1, oneDashIdx + 2) === "e") ||
                (twoDashIdx === 0 &&
                  totalText
                    .split(" ")[1]
                    .substring(
                      twoDashIdx + 2,
                      twoDashIdx + 2 + "experiment".length
                    ) === "experiment")
              ) {
                doExperiment = true;
              } else {
                totalText = totalText.trim();
                if (
                  oneDashIdx === 0 ||
                  twoDashIdx === 0 ||
                  (commandText === "execute-ml" &&
                    totalText.length > commandText.length)
                ) {
                  if (totalText.split(" ")[1].trim() === "") {
                    AddErrorMessage(`Please don't use extra spaces.`, true);
                  } else {
                    AddErrorMessage(
                      `${
                        totalText.split(" ")[1]
                      } is not recognised as an appropriate flag to execute-ml command`,
                      true
                    );
                  }
                } else {
                  doExperiment = false;
                  console.log(`oneDashIndex: ${oneDashIdx}`);
                  console.log(`twoDashIndex: ${twoDashIdx}`);
                  console.log(
                    totalText.substring(oneDashIdx + 1, oneDashIdx + 2)
                  );
                }
              }
            } catch {
              doExperiment = false;
            }
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
                  ...commands[commandText],
                  props: {
                    ...commands[commandText].props,
                    doExperiment,
                  },
                },
              ])
            );
          } else {
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
          }
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
          setLiveText((text) => text + "\t");
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
