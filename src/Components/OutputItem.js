import { TerminalElement } from "./TerminalElement";
import "./CSS/OutputDisplay.css";

export const OutputItem = ({ imgSrc, title, bodyText, unique }) =>
  imgSrc !== "None" ? (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${unique}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#main${unique}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`main${unique}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionParent"
      >
        <div className="accordion-body grid-separate">
          <div className="output-image">
            <img src={imgSrc} alt={`${title} graph/visualization`} />
          </div>
          <div className="output-text">{bodyText}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${unique}`}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#main${unique}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`main${unique}`}
        className="accordion-collapse collapse"
        data-bs-parent="#accordionParent"
      >
        <div className="accordion-body">
          <div className="output-text">
            {bodyText.split("\n").map((line) => (
              <TerminalElement color="#000000" text={line} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
