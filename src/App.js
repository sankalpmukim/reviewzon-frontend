import React from "react";
import { Route, Routes } from "react-router";
import { ChooseApproach } from "./Components/ChooseApproach";
import { ProgressDisplay } from "./Components/ProgressDisplay";
import { Home } from "./Components/Home";

function App() {
  return (
    <div>
      {/* <div>Stuff</div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chooseapproach" element={<ChooseApproach />} />
        <Route path="/progressdisplay" element={<ProgressDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
