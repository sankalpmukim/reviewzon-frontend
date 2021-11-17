import { useRef, useEffect, useState } from "react";
import { getDatabase, ref } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import { TerminalElement } from "./TerminalElement";

export const TerminalBox = ({ path }) => {
  const db = getDatabase();
  const [firebaseList] = useListVals(ref(db, path));
  const [textToDisplay, setTextToDisplay] = useState([]);
  useEffect(() => {
    if (firebaseList.length > textToDisplay.length) {
      setTextToDisplay(firebaseList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseList]);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [textToDisplay]);

  return (
    <div className="terminal-box">
      {textToDisplay.map((text, idx) => (
        <TerminalElement color={text.color} text={text.message} key={idx} />
      ))}
      <div ref={endRef}></div>
    </div>
  );
};
