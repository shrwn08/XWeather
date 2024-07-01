import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    const key_id = "e049bd75748e4fefb09172650242803";
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${key_id}&q=${city}`
      );
      setWeatherData(response.data.current);
      setError(""); // Clear error message on success
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    fetchWeatherData();
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  console.log(weatherData);

  return (
    <div className="h-screen w-screen bg-sky-100 flex justify-center items-center flex-col gap-5">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-4">
            <div className="">
              <input
                type="text"
                placeholder="Enter your city"
                className="h-8 w-48 border-2 p-2 "
                onChange={handleChange}
                value={city}
                required
              />
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-green-400 p-1 px-2 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center">
          <p>Loading data...</p>
        </div>
      )}

      {isSubmit && !error && weatherData && (
        <div className="weather-cards flex gap-4">
          <div className="weather-card flex justify-center items-center flex-col text-black font-bold h-24 w-48 bg-white rounded-lg">
            <p>Temperature</p>
            <p>{weatherData.temp_c}°C</p>
          </div>
          <div className="weather-card flex justify-center items-center flex-col text-black font-bold h-24 w-48 bg-white rounded-lg">
            <p>Humidity</p>
            <p>{weatherData.humidity}%</p>
          </div>
          <div className="weather-card flex justify-center items-center flex-col text-black font-bold h-24 w-48 bg-white rounded-lg">
            <p>Condition</p>
            <p>{weatherData.condition.text}</p>
          </div>
          <div className="weather-card flex justify-center items-center flex-col text-black font-bold h-24 w-48 bg-white rounded-lg">
            <p>Wind Speed</p>
            <p>{weatherData.wind_kph}kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;