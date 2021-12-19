import { useEffect, useState } from "react";
import { TerminalElement } from "./TerminalElement";
export const OnlineSentimentAnalysis = ({ setPrompt, text }) => {
  const [res, setRes] = useState(null);
  useEffect(() => {
    const setRequest = async () => {
      const response = await fetch(
        "https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/4fc6d18e-6bf6-4905-8a91-977c3f123120/v1/analyze?version=2019-07-12",
        {
          body: JSON.stringify({
            text: text.substring(text.indexOf(" ") + 1),
            features: {
              sentiment: {},
            },
          }),
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_IBM_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      ).then((r) => {
        setPrompt(true);
        return r.json();
      });
      let result = {
        text: "",
        color: "",
      };
      console.log(response);
      if (!!response.error) {
        result = { text: response.error, color: "#ff0000" };
      } else {
        result = {
          text: `${response.sentiment.document.label}`,
          color: "#00ff00",
        };
      }
      setRes(result);
    };
    setRequest();
  }, [setPrompt, text]);
  return res !== null ? (
    <TerminalElement text={res.text} color={res.color} />
  ) : null;
};
