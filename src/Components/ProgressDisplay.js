import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/fontawesome-free-solid";
import "./CSS/ProgressDisplay.css";
// import { TerminalBox } from "./TerminalBox";
import { InteractiveTerminal } from "./InteractiveTerminal";

export const ProgressDisplay = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container"
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          padding: "2rem",
          width: "93vw",
        }}
      >
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              navigate("/chooseapproach");
            }}
            style={{
              width: "100px",
              height: "50px",
              fontSize: "150%",
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div>
          <h2 className="text-center">ReviewZon terminal</h2>
        </div>
      </div>
      <div className="grid-container">
        <InteractiveTerminal />
      </div>
    </div>
  );
};
