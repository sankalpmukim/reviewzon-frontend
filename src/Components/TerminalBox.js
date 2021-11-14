import { useRef, useEffect } from "react";
import { getDatabase, ref } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import { TerminalElement } from "./TerminalElement";

export const TerminalBox = ({ path }) => {
  const db = getDatabase();
  const [textToDisplay] = useListVals(ref(db, path));
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [textToDisplay]);

  return (
    <div className="terminal-box">
      {textToDisplay.map((text, idx) => (
        <TerminalElement
          color={text.split(":")[0]}
          text={text.split(":")[1]}
          key={idx}
        />
      ))}
      <div ref={endRef}></div>
    </div>
  );
};
