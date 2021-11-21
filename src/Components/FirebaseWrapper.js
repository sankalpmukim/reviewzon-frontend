import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FirebaseTerminal } from "./FirebaseTerminal";

export const FirebaseWrapper = ({ setPrompt, setUniqueKey }) => {
  const [path, setPath] = useState(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const url = `http://localhost:8000/`;
    fetch(url, {
      method: "POST",
      body: searchParams.get("data"),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((r) => {
        setPath(`livedata/${r["unique_id"]}`);
        setUniqueKey(r["unique_id"]);
      });
  }, [searchParams, setUniqueKey]);
  return path ? <FirebaseTerminal path={path} setPrompt={setPrompt} /> : null;
};
