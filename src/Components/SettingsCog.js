import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/fontawesome-free-solid";
import "./CSS/ChooseApproach.css";

export const SettingsCog = ({ onClick, isDisabled }) => {
  return (
    <span className="">
      <button
        className={`btn btn-${isDisabled ? `secondary` : `outline-success`} `}
        onClick={(e) => {
          if (!isDisabled) {
            onClick(e);
          }
        }}
        data-bs-toggle="modal"
        data-bs-target="#configModal"
        // style={{
        //   backgroundColor: "white",
        // }}
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon={faCog} />
      </button>
    </span>
  );
};
