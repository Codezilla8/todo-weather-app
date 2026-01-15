import { useEffect, useState } from "react";
import axios from "axios";
import "./weather.css";

const API_KEY = "7be3ce22738f4ea4959212709261501"; // put your real key

export default function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Kolkata");

  useEffect(() => {
    fetchWeather(query);
  }, []);

  async function fetchWeather(city) {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        {
          params: {
            key: API_KEY,
            q: city,
            days: 7,
            aqi: "yes",
            alerts: "no",
          },
        }
      );

      if (res.data.error) {
        throw new Error(res.data.error.message);
      }

      setData(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Unable to fetch weather data"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    fetchWeather(query.trim());
  }

  if (loading) {
    return <div className="weather-loading">Loading weather…</div>;
  }

  if (error) {
    return <div className="weather-error">{error}</div>;
  }

  const { location, current, forecast } = data;

  return (
    <div className="weather-page">

      {/* background pattern */}
      <div className="bg-pattern" />

      <div className="weather-container">

        {/* Search */}
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city..."
          />
        </form>

        {/* MAIN CARD */}
        <div className="card main-card">
          <div>
            <p className="location">
              {location.name}, {location.country}
            </p>

            <h1 className="temp">
              {Math.round(current.temp_c)}°
            </h1>

            <p className="condition">
              {current.condition.text}
            </p>

            <p className="feels-like">
              Feels like {Math.round(current.feelslike_c)}°
            </p>
          </div>

          <img
            src={`https:${current.condition.icon}`}
            alt="weather icon"
            className="main-icon"
          />
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="card stat-card">
            <span>Wind</span>
            <strong>{current.wind_kph} km/h</strong>
          </div>

          <div className="card stat-card">
            <span>Humidity</span>
            <strong>{current.humidity}%</strong>
          </div>

          <div className="card stat-card">
            <span>UV Index</span>
            <strong>{current.uv}</strong>
          </div>
        </div>

        {/* HOURLY */}
        <section>
          <h2>Today</h2>
          <div className="hourly-scroll">
            {forecast.forecastday[0].hour.slice(0, 12).map((hour, i) => (
              <div key={i} className="card hourly-card">
                <span>{hour.time.split(" ")[1]}</span>
                <img src={`https:${hour.condition.icon}`} alt="" />
                <strong>{Math.round(hour.temp_c)}°</strong>
              </div>
            ))}
          </div>
        </section>

        {/* WEEKLY */}
        <div className="card weekly-card">
          <h2>Next 7 days</h2>

          {forecast.forecastday.map((day, i) => (
            <div key={i} className="weekly-row">
              <span>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </span>

              <img src={`https:${day.day.condition.icon}`} alt="" />

              <span>
                {Math.round(day.day.maxtemp_c)}° /
                {Math.round(day.day.mintemp_c)}°
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
