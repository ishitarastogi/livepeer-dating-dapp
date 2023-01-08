import "./App.css";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Explore from "./components/explore/Explore";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/createProfile" element={<Profile />} />
        <Route path="/next" element={<Post />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}

export default App;
