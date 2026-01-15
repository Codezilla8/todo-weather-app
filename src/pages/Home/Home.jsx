import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-root">
      <div className="bg-layer" />
      <div className="overlay" />

      <div className="content">
        <h1 className="hello">Hello</h1>

        <div className="links">
          <Link to="/weather">Check weather</Link>
          <Link to="/todo">Check your boxes</Link>
        </div>
      </div>
    </div>
  );
}
