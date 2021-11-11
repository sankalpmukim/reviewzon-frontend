import React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./Components/Home";

function App() {
  return (
    <div>
      {/* <div>Stuff</div> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
