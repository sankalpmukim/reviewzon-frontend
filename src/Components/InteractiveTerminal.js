import { useEffect, useRef, useState } from "react";
import { Help } from "./Commands/help";
// import { OutputPageNavigation } from "./OutputPageNavigation";
// import { TerminalElement } from "./TerminalElement";
import "./CSS/InteractiveTerminal.css";
import { TerminalPrompt } from "./TerminalPrompt";
import { FirebaseWrapper } from "./FirebaseWrapper";

export const InteractiveTerminal = () => {
  const [content, setContent] = useState([]);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [content]);

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
        <Help setPrompt={setPrompt} />
        {content.map((obj, idx) => (
          <obj.component {...obj.props} key={idx} />
        ))}
        {prompt ? (
          <TerminalPrompt
            setContent={setContent}
            setPrompt={setPrompt}
            commands={{
              help: {
                component: Help,
                props: {
                  setPrompt,
                },
              },
              "execute-ml": {
                component: FirebaseWrapper,
                props: {
                  setPrompt,
                },
              },
            }}
          />
        ) : null}
        <span ref={endRef}>&#8203;</span>
      </section>
    </div>
  );
};
