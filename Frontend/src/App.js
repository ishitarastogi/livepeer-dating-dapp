import "./App.css";
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Explore from "./components/explore/Explore";
//  import Check from "./components/Check";
function App() {
  return (
    <div className="App">
      {/* <Check/> */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
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
