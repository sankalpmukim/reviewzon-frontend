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
        <h1>Welcome to Reviewzon!</h1>
        <img src={Logo} alt="App logo" />
      </div>
      <div className="container px-4">
        <div className="row p-10">
          <div className="col-8">
            {
              "Sentiment Analysis is an up and coming field of research in the realm of data mining. It's applications are limitless, and it opens up so many new possibilities! In our project, ReviewZon, we've utilized the strength of Natural Language Processing and Machine Learning to create an application that can evaluate a review of a product and accurately predict the sentiment of the review. It has a highly customizable setup, and the user can decide the train set and test set as they please."
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
              "ReviewZon gives the opportunity to practice everything about an ML project and makes it simpler. You can supply amazon product links to create datasets that can be used for train or test sets! Don't want to search for so many products? You can always choose the offline dataset instead! You can then watch the logs in real time while the ML Model trains, and once completed, you get an interactive command prompt experience to evaluate the generated model and visualize its outputs. Click the green button below to get started!"
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
