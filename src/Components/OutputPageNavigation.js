import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./CSS/ProgressDisplay.css";
import { TerminalPrompt } from "./TerminalPrompt";

export const OutputPageNavigation = ({ uniqueKey }) => {
  const navigate = useNavigate();
  const [liveText, setLiveText] = useState("");
  useEffect(() => {
    console.log(`finally hit output navigation`);
  }, []);

  return (
    <span>
      <div
        style={{
          color: "rgb(87, 252, 20)",
        }}
      >
        Type launch-output and press enter to proceed...
      </div>
      <TerminalPrompt
        liveText={liveText}
        setLiveText={setLiveText}
        commands={{
          "launch-output": () => {
            setTimeout(() => {
              navigate(`/output/${uniqueKey}`);
            }, 2000);
          },
        }}
      />
    </span>
  );
};
