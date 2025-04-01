import { Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed/Feed";

function MainRouter() {
    return (
      <Routes>
        <Route path="/" element={<Feed/>} index />
        </Routes>
    );
  }
  
  export default MainRouter;