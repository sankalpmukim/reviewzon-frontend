import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import { ReactComponent as PlaceholderImage } from "../static/Placeholder.svg";
import { useNavigate } from "react-router-dom";
import Logo from "../static/logo192.png";
import "./CSS/Home.css";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h1>Welcome to Reviewzon demo!</h1>
        <img src={Logo} alt="App logo" />
      </div>
      <div className="container px-4">
        <div className="row p-10">
          <div className="col-8">
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          </div>
          <div className="col-4 text-center">
            <div>
              <PlaceholderImage className="svg-image" alt="placeholder svg" />
            </div>
          </div>
        </div>
        <div className="row p-10">
          <div className="col-4 text-center">
            <div>
              <PlaceholderImage className="svg-image" alt="placeholder svg" />
            </div>
          </div>
          <div className="col-8">
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            }
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", paddingTop: "10px" }}>
        <button
          className="btn btn-success"
          style={{ width: "100px", height: "50px", fontSize: "150%" }}
          onClick={() => {
            navigate("/chooseapproach");
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};
