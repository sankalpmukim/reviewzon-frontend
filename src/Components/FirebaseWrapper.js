import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "@firebase/remote-config";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LocalTerminal } from "./LocalTerminal";
import { FirebaseTerminal } from "./FirebaseTerminal";

export const FirebaseWrapper = ({ setPrompt, setUniqueKey, doExperiment }) => {
  const [path, setPath] = useState(null);
  const [searchParams] = useSearchParams();
  const [showErr, setShowErr] = useState(
    JSON.parse(searchParams.get("data")).backendOnline === false
  );

  useEffect(() => {
    const sendData = {
      ...JSON.parse(searchParams.get("data")),
      doExperiment,
    };
    const configEvent = async () => {
      const remoteConfig = getRemoteConfig();
      const change = await fetchAndActivate(remoteConfig);

      console.log(`activated ${change}`);
      const val = getValue(remoteConfig, "reviewzon_online");
      console.log(val);
      const url = JSON.parse(val._value)["backend_url"];
      await fetch(url, {
        method: "POST",
        body: JSON.stringify(sendData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((r) => {
          setPath(`livedata/${r["unique_id"]}`);
          setUniqueKey(r["unique_id"]);
        })
        .catch((err) => {
          console.log(err);
          setShowErr(true);
          setUniqueKey("0");
        });
    };
    configEvent();
  }, [doExperiment, searchParams, setUniqueKey, setPrompt]);
  return (
    <>
      {showErr ? <LocalTerminal setPrompt={setPrompt} /> : null}
      {path ? <FirebaseTerminal path={path} setPrompt={setPrompt} /> : null}
    </>
  );
};
