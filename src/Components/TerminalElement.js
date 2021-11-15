import "./CSS/ProgressDisplay.css";
export const TerminalElement = ({ text, color }) => {
  const countSymbols = (text) => {
    let count = 0;
    while (text[count] === ">") {
      count++;
    }
    return count;
  };
  const textIndent = String(2 * countSymbols(text)) + "rem";
  let textToDisplay;
  if (countSymbols(text) > 0) {
    textToDisplay = `${text.substring(countSymbols(text))}`;
  } else {
    textToDisplay = `${text.substring(countSymbols(text))}`;
  }
  return (
    <div
      className="terminal-child"
      style={{
        color,
        textIndent,
      }}
    >
      {textToDisplay}
    </div>
  );
};
