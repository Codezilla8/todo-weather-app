import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Weather from "./pages/Weather/Weather";
import Todo from "./pages/Todo/Todo";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}
