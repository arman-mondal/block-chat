// App.js
import ChatPage from "./pages/ChatPage";
import './App.css'
import HomePage from "./pages/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage /> } />
    </Routes>
    
    </>
  );
}

export default App;
