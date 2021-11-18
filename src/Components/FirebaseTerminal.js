import { getDatabase, ref } from "@firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import { useState, useEffect, useRef } from "react";
import { TerminalElement } from "./TerminalElement";

export const FirebaseTerminal = ({ path, setExitButton }) => {
  const db = getDatabase();
  const [firebaseList] = useListVals(ref(db, path));
  const [firebaseListPersisted, setFirebaseListPersisted] = useState([]);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: "smooth" });
    if (
      typeof firebaseListPersisted[firebaseListPersisted.length - 1] !==
        "undefined" &&
      firebaseListPersisted[firebaseListPersisted.length - 1].end === true
    ) {
      setExitButton(true);
    }
  }, [firebaseListPersisted, setExitButton]);

  useEffect(() => {
    setFirebaseListPersisted(firebaseList);
  }, [firebaseList]);
  return (
    <div>
      {firebaseListPersisted.map((text, idx) => (
        <TerminalElement color={text.color} text={text.message} key={idx} />
      ))}
      <span ref={endRef}></span>
    </div>
  );
};
