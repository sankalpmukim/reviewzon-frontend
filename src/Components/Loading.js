import "./CSS/ProgressDisplay.css";
import LoadingGif from "../static/loading-gif.gif";

export const Loading = () => (
  <div className="loading">
    <img src={LoadingGif} alt="loading gif" />
  </div>
);
