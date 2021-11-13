import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/fontawesome-free-solid";
import { useEffect, useRef, useState } from "react";
import "./CSS/ProgressDisplay.css";

export const ProgressDisplay = () => {
  const [searchParams] = useSearchParams();
  const [textToDisplay, setTextToDisplay] = useState([]);
  const endRef = useRef(null);
  const navigate = useNavigate();
  const [conn, setConn] = useState(null);
  useEffect(() => {
    const url = `ws://localhost:5000`;

    const connection = new WebSocket(url);
    setConn(connection);
    connection.onopen = () => {
      connection.send(`message from client`);
    };
    connection.onerror = (err) => {
      console.log(`WebSocket Error:${err}`);
    };
    connection.onmessage = (e) => {
      setTextToDisplay((arr) => arr.concat([e.data]));
    };
  }, []);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [textToDisplay]);

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
      {conn ? (
        <button
          className="btn btn-secondary"
          onClick={() => {
            conn.send("counter-increment");
          }}
        >
          +
        </button>
      ) : null}
      <div className="terminal-box">
        {textToDisplay.map((t, i) => (
          <div className="terminal-child" key={i}>
            {t}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <pre>{JSON.stringify(JSON.parse(searchParams.get("data")), null, 4)}</pre>
    </div>
  );
};
