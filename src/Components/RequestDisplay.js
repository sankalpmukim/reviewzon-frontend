import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "@firebase/remote-config";
import { TerminalElement } from "./TerminalElement";

export const RequestDisplay = ({ setPrompt, text, uniqueKey, endPoint }) => {
  const [res, setRes] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const configEvent = async () => {
      const remoteConfig = getRemoteConfig();
      const change = await fetchAndActivate(remoteConfig);

      console.log(`activated ${change}`);
      const val = getValue(remoteConfig, "reviewzon_online");
      console.log(val);
      const url = JSON.parse(val._value)["backend_url"];
      console.log(`sent text ${text}`);
      const response = await fetch(`${url}/${endPoint}`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          uniqueKey: uniqueKey,
          data: JSON.parse(searchParams.get("data")),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((resp) => resp.json());
      setRes(response);
    };
    configEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (res !== null) {
      setPrompt(true);
    }
  }, [res, setPrompt]);
  return res !== null ? (
    <TerminalElement text={res.message} color={res.color} />
  ) : null;
};
