import PlaceholderImage from "../static/Placeholder.svg";
import LocalTestImage from "../static/local_test.png";
import OnlineImage from "../static/online.png";
import LocalTrainImage from "../static/local_train.png";
import "./CSS/Card.css";
import { SettingsCog } from "./SettingsCog";

export const Card = ({
  name,
  mode,
  title,
  text,
  settingsDisabled,
  classes,
  setCogClicked,
  isDisabled,
}) => {
  const id = name + "-" + mode;
  let CardImage = PlaceholderImage;
  if (id === "test-set-automatic") {
    CardImage = LocalTestImage;
  } else if (id === "training-set-automatic") {
    CardImage = LocalTrainImage;
  } else {
    CardImage = OnlineImage;
  }
  return (
    <div className={`card-parent${isDisabled ? " card-disabled" : ""}`}>
      <div
        className={
          "card" + (classes[name.split("-")[0]] === mode ? " selected" : "")
        }
        style={{ width: "18rem" }}
      >
        <div className="card-image">
          <img
            src={CardImage}
            className="card-img-top card-image"
            alt=""
            style={{ paddingLeft: "5px", paddingTop: "5px" }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
          <input
            type="radio"
            className="btn-check fancy-input"
            id={id}
            autoComplete="off"
            name={name}
            disabled={isDisabled}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <label
              className={`btn btn-${
                isDisabled ? `secondary disabled` : `outline-primary`
              }`}
              htmlFor={id}
              style={{ width: "70%" }}
            >
              Select
            </label>
            {settingsDisabled ? null : (
              <SettingsCog
                data={id}
                onClick={setCogClicked}
                isDisabled={isDisabled}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
