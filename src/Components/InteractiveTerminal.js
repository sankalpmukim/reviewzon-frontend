import { getDatabase, ref } from "@firebase/database";
import { useEffect, useRef, useState } from "react";
import { useListVals } from "react-firebase-hooks/database";
import { TerminalElement } from "./TerminalElement";
import "./CSS/InteractiveTerminal.css";

export const InteractiveTerminal = ({ path }) => {
  // const [userInput, setUserInput] = useState("");
  const [liveText, setLiveText] = useState("");
  const textToDisplay = `  execute`;
  useEffect(() => {
    for (let i = 0; i < textToDisplay.length; i++) {
      setTimeout(
        () => setLiveText((text) => text + textToDisplay[i]),
        (i + 1) * 100
      );
    }
  }, [textToDisplay]);

  const db = getDatabase();
  const [firebaseList] = useListVals(ref(db, path));
  const [firebaseListPersisted, setFirebaseListPersisted] = useState([]);
  const begRef = useRef(null);
  useEffect(() => {
    if (
      firebaseList.length > firebaseListPersisted.length - 1 &&
      textToDisplay.length === liveText.length
    ) {
      begRef.current.style.removeProperty("display");
      begRef.current.style.removeProperty("justify-content");
      begRef.current.style.removeProperty("align-items");
      setFirebaseListPersisted(firebaseList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseList]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
  }, [firebaseListPersisted]);
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
      <section id="terminal__body">
        <div id="terminal__prompt">
          <span id="terminal__prompt--user">server@ubuntu:</span>
          <span id="terminal__prompt--location">~</span>
          <span id="terminal__prompt--bling">$</span>
          <div
            ref={begRef}
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
          </div>
        </div>
        <TerminalElement color={"green"} text={""} />
        {firebaseListPersisted.map((text, idx) => (
          <TerminalElement color={text.color} text={text.message} key={idx} />
        ))}
        <span id="terminal__prompt--cursor"></span>
        <span ref={endRef}>&#8203;</span>
      </section>
    </div>
  );
};
