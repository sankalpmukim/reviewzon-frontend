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
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState(-1);
  const navigate = useNavigate();
  const systemCommands = {
    "execute-ml": {
      Component: FirebaseWrapper,
      props: {
        setPrompt,
        setUniqueKey,
      },
      isFunction: false,
      description: "Executes ml analysis on provided dataset rules.",
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
            isFunction: false,
            description:
              "Launch output page which contains analysis and graphs on the result of training and experiments(requires `execute-ml` first)",
          }
        : {
            isFunction: true,
            function: () => {
              setTimeout(() => {
                navigate(`/output/${uniqueKey}`);
              }, 2000);
            },
            description:
              "Launch output page which contains analysis and graphs on the result of training and experiments(requires `execute-ml` first)",
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
            isFunction: false,
            description:
              "Check live sentiment on trained model(requires `execute-ml` first).",
          }
        : {
            Component: RequestDisplay,
            props: {
              setPrompt,
              uniqueKey,
              endPoint: "checksentiment",
            },
            isFunction: false,
            description:
              "Check live sentiment on trained model(requires `execute-ml` first).",
          },
  };

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [content, prompt]);

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
            current={current}
            setCurrent={setCurrent}
            history={history}
            setHistory={setHistory}
            setContent={setContent}
            setPrompt={setPrompt}
            commands={{
              ...systemCommands,
              help: {
                Component: Help,
                props: {
                  setPrompt,
                  systemCommands,
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
