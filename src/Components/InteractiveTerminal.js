import { useEffect, useRef, useState } from "react";
import { Help } from "./Commands/help";
// import { OutputPageNavigation } from "./OutputPageNavigation";
// import { TerminalElement } from "./TerminalElement";
import "./CSS/InteractiveTerminal.css";
import { TerminalPrompt } from "./TerminalPrompt";
import { FirebaseWrapper } from "./FirebaseWrapper";
import { useNavigate } from "react-router-dom";
import { TerminalElement } from "./TerminalElement";
import { RequestDisplay } from "./RequestDisplay";

export const InteractiveTerminal = () => {
  const [content, setContent] = useState([]);
  const [prompt, setPrompt] = useState(false);
  const [uniqueKey, setUniqueKey] = useState("");
  const navigate = useNavigate();

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
          <obj.Component {...obj.props} key={idx} />
        ))}
        {prompt ? (
          <TerminalPrompt
            setContent={setContent}
            setPrompt={setPrompt}
            commands={{
              help: {
                Component: Help,
                props: {
                  setPrompt,
                },
              },
              "execute-ml": {
                Component: FirebaseWrapper,
                props: {
                  setPrompt,
                  setUniqueKey,
                },
              },
              "launch-output":
                uniqueKey === ""
                  ? {
                      Component: ({ setPrompt }) => {
                        useEffect(() => {
                          setPrompt(true);
                        }, [setPrompt]);
                        return (
                          <TerminalElement
                            text={`sentiment analysis not yet done. try typing \`execute-ml\` to go ahead.`}
                            color={`#FF0000`}
                          />
                        );
                      },
                      props: {
                        setPrompt,
                      },
                    }
                  : () => {
                      setTimeout(() => {
                        navigate(`/output/${uniqueKey}`);
                      }, 2000);
                    },
              "check-sentiment":
                uniqueKey === ""
                  ? {
                      Component: ({ setPrompt }) => {
                        useEffect(() => {
                          setPrompt(true);
                        }, [setPrompt]);
                        return (
                          <TerminalElement
                            text={`sentiment analysis not yet done. try typing \`execute-ml\` to go ahead.`}
                            color={`#FF0000`}
                          />
                        );
                      },
                      props: {
                        setPrompt,
                      },
                    }
                  : {
                      Component: RequestDisplay,
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
