import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/fontawesome-free-solid";
import "./CSS/ChooseApproach.css";

export const SettingsCog = ({ onClick }) => {
  return (
    <span className="">
      <button
        className="btn btn-outline-success "
        onClick={onClick}
        data-bs-toggle="modal"
        data-bs-target="#configModal"
        // style={{
        //   backgroundColor: "white",
        // }}
      >
        <FontAwesomeIcon icon={faCog} />
      </button>
    </span>
  );
};
