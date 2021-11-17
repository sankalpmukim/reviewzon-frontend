import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/fontawesome-free-solid";
import { useEffect, useState } from "react";
import "./CSS/ProgressDisplay.css";
import { Loading } from "./Loading";
// import { TerminalBox } from "./TerminalBox";
import { InteractiveTerminal } from "./InteractiveTerminal";

export const ProgressDisplay = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [path, setPath] = useState(null);
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
      .then((r) => setPath(`livedata/${r["unique_id"]}`));
  }, [searchParams]);

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
          <h2 className="text-center">This is progress display page</h2>
        </div>
      </div>

      {path ? <InteractiveTerminal path={path} /> : <Loading />}
    </div>
  );
};
