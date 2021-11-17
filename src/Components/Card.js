import PlaceholderImage from "../static/Placeholder.svg";
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
}) => {
  const id = name + "-" + mode;
  return (
    <div className="card-parent">
      <div
        className={
          "card" + (classes[name.split("-")[0]] === mode ? " selected" : "")
        }
        style={{ width: "18rem" }}
      >
        <div className="card-image">
          <img
            src={PlaceholderImage}
            className="card-img-top card-image"
            alt=""
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
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <label
              className="btn btn-outline-primary"
              htmlFor={id}
              style={{ width: "70%" }}
            >
              Select
            </label>
            {settingsDisabled ? null : (
              <SettingsCog data={id} onClick={setCogClicked} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
