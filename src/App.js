import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./Components/Home";
import { ChooseApproach } from "./Components/ChooseApproach";
import { ProgressDisplay } from "./Components/ProgressDisplay";
import { OutputDisplay } from "./Components/OutputDisplay";

function App() {
  return (
    <div>
      {/* <div>Stuff</div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chooseapproach" element={<ChooseApproach />} />
        <Route path="/progressdisplay" element={<ProgressDisplay />} />
        <Route path="/output/:uniqueKey" element={<OutputDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
