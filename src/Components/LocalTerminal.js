import { useState, useEffect, useRef } from "react";
import { TerminalElement } from "./TerminalElement";
import DATA from "./LOCAL_DATA";

export const LocalTerminal = ({ path, setPrompt }) => {
  const [outputList, setOutputList] = useState([]);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
    if (
      typeof outputList[outputList.length - 1] !== "undefined" &&
      outputList[outputList.length - 1].end === true
    ) {
      setPrompt(true);
    }
  }, [outputList, setPrompt]);

  useEffect(() => {
    let curr = 0;
    const updateList = (curr, DATA, setOutputList) => {
      if (curr < DATA.length) {
        setOutputList((lst) => [...lst, DATA[curr]]);
        setTimeout(() => {
          updateList(curr + 1, DATA, setOutputList);
        }, 300);
      }
    };
    setTimeout(() => {
      updateList(curr, DATA, setOutputList);
    }, 300);
  }, []);
  return (
    <div>
      {outputList.map((text, idx) => (
        <TerminalElement color={text.color} text={text.message} key={idx} />
      ))}
      <span ref={endRef}></span>
    </div>
  );
};
