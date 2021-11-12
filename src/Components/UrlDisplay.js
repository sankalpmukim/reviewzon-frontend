import { XCircle } from "react-bootstrap-icons";
import "./CSS/ChooseApproach.css";

export const UrlDisplay = ({ url, close }) => (
  <div className="form-group buttonIn">
    <input
      type="url"
      className="form-control"
      id="test-link"
      value={url}
      readOnly
    />
    <XCircle className="inside-button" onClick={close} />
  </div>
);
