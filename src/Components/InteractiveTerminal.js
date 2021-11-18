import { useEffect, useRef, useState } from "react";
import { OutputPageNavigation } from "./OutputPageNavigation";
import { TerminalElement } from "./TerminalElement";
import "./CSS/InteractiveTerminal.css";
import { TerminalPrompt } from "./TerminalPrompt";
import { useSearchParams } from "react-router-dom";
import { FirebaseTerminal } from "./FirebaseTerminal";

export const InteractiveTerminal = () => {
  const [exitButton, setExitButton] = useState(false);
  const [searchParams] = useSearchParams();
  const [path, setPath] = useState(null);
  const [enable, setEnable] = useState(false);
  useEffect(() => {
    if (enable === true) {
      const url = `http://localhost:8000/`;
      fetch(url, {
        method: "POST",
        body: searchParams.get("data"),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((r) => setPath(`livedata/${r["unique_id"]}`));
    }
  }, [searchParams, enable]);
  // const [userInput, setUserInput] = useState("");
  const [liveText, setLiveText] = useState("");

  const endRef = useRef(null);

  return (
    <div id="terminal">
      <section id="terminal__bar">
        <div id="bar__buttons">
          <button className="bar__button" id="bar__button--exit">
            &#10005;
          </button>
          <button className="bar__button">&#9472;</button>
          <button className="bar__button">&#9723;</button>
        </div>
        <p id="bar__user">server@ubuntu: ~</p>
      </section>
      <section id="terminal__body" style={{ display: "inline-block" }}>
        {!enable ? (
          <>
            <div
              style={{
                color: "rgb(87, 252, 20)",
              }}
            >
              Type execute and press enter to proceed...
            </div>
            <TerminalPrompt
              liveText={liveText}
              setLiveText={setLiveText}
              commands={{
                execute: () => {
                  setEnable(true);
                  setLiveText("");
                },
              }}
            />
          </>
        ) : null}
        <TerminalElement color={"green"} text={""} />
        {path ? (
          <FirebaseTerminal setExitButton={setExitButton} path={path} />
        ) : null}

        {exitButton ? (
          <OutputPageNavigation uniqueKey={path.split("/")[1]} />
        ) : null}

        <span ref={endRef}>&#8203;</span>
      </section>
    </div>
  );
};
