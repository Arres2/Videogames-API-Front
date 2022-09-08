import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./views/Home/Home";
// import GenresView from "./views/Genres/Genres";
import Detail from "./views/Detail/Detail";
import Landing from "./views/Landing/Landing";
import Create from "./views/Create/Create";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/videogames" element={<Home />} />
        <Route path="/videogames/:gameId" element={<Detail />} />
        {/* <Route path="/genres" element={<GenresView />} /> */}
        <Route path="/create" element={<Create />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
