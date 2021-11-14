import "./CSS/ProgressDisplay.css";
export const TerminalElement = ({ text, color }) => (
  <div className="terminal-child" style={{ color }}>
    {text}
  </div>
);
