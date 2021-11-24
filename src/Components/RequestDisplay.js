import { useEffect, useState } from "react";
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue,
} from "@firebase/remote-config";
import { TerminalElement } from "./TerminalElement";

export const RequestDisplay = ({ setPrompt, text }) => {
  const [res, setRes] = useState(null);
  useEffect(() => {
    const configEvent = async () => {
      const remoteConfig = getRemoteConfig();
      const change = await fetchAndActivate(remoteConfig);

      console.log(`activated ${change}`);
      const val = getValue(remoteConfig, "reviewzon_online");
      console.log(val);
      const url = JSON.parse(val._value)["backend_url"];
      console.log(`sent text ${text}`);
      const response = await fetch(`${url}/placeholder`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((resp) => resp.json());
      setRes(response);
      setPrompt(true);
    };
    configEvent();
  });
  return res !== null ? (
    <TerminalElement text={res.message} color={res.color} />
  ) : null;
};
