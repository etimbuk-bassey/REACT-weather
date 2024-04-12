import { css, keyframes } from "@emotion/css";
import React, { useEffect, useState } from "react";
import axios from "axios";
React;

interface IUser {
  location: ILocation;
  current: ICurrent;
  forecast: IForecast;
}

interface ILocation {
  name: string;
  region: string;
  country: string;
}

interface ICurrent {
  condition: ICondition;
  last_updated: number;
  temp_c: number;
  wind_dir: string;
  uv: number,
  humidity: number,
  pressure_in: number,
  wind_degree: number,
  air_quality: IAirquality
}

interface IAirquality {
  pm10: number
}

interface ICondition {
  text: string;
  icon: string;
}

interface IForecast {
  forecastday: IForecastday;
}

interface IForecastday {
  day: IDay;
  date: string;
}

interface IDay {
  condition: ICondition;
}

export default function Weather() {
  const [info, setInfo] = useState<IUser>();
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("uyo");

  useEffect(() => {
    const url =
      "http://api.weatherapi.com/v1/forecast.json?key=02056759d8aa4cee897105756241004&days=4&aqi=yes&alerts=no";

    const searchParam = searchTerm ? `&q=${searchTerm}` : "";

    const baseURL = url + searchParam;
    axios
      .get(baseURL)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [searchTerm]);
  if (error) return `Error: ${error}`;
  if (!info) return null;
  console.log(info, "info");
  console.log(searchTerm, "searchTerm");

  const currentInfo = [
    { name: "uv", link: info.current.uv },
    { name: "wind dir", link: info.current.wind_dir },
    { name: "humidity", link: info.current.humidity },
    { name: "pressure", link: info.current.pressure_in},
    { name: "wind deg", link: info.current.wind_degree },
    { name: "air quality", link: info.current.air_quality.pm10 },
  ];

  const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;
  const Style = css({
    "&": {
      // backgroundImage: "url(./images/backdownload.png)",
      // backgroundSize: "100px",
      display: "flex",
      flexWrap: "wrap",
    },
    "& .item1": {
      flexGrow: "1",
      // flexBasis: "100",
    },
    "& .item2": {
      flexGrow: "1",
    },
    "& .item1 .search": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "30px",
    },
    "& .item1 .search form": {
      display: "block",
      position: "relative",
      background: "fff",
      borderRadius: "20px",
    },
    "& input, button": {
      fontSize: "20px",
      height: "2rem",
      border: "0",
      padding: "15px",
    },
    "& input[type=search]": {
      outline: "none",
      width: "100%",
      color: "#03131A",
      background: "#fff",
      padding: "0 1.6rem",
      borderRadius: "10px",
      appearance: "none",
      transition: "all .3s cubic-bezier(0, 0, 0.43, 1.49)",
      transitionProperty: " width, border-radius",
      zIndex: "1",
      position: "relative",
    },
    "& button": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "0",
      right: "0",
      width: "4rem",
      cursor: "pointer",
      fontWeight: "bold",
      borderRadius: "0px 10px 10px 0px",
      background: "#1a4651",
    },
    "& input:not(:placeholder-shown)": {
      borderRadius: "10px 0px 0px 10px",
      width: "calc(100% - 4rem)",
      "& button": {
        display: "block",
      },
    },
    "& label": {
      position: "absolute",
      clip: "react(1px,1px,1px,1px)",
      padding: "0px",
      border: "0px",
      height: "1px",
      width: "1px",
      overflow: "hidden",
    },
    "& .item1 .current": {
      display: "flex",
      // justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      margin: " 50px 20px",
    },
    "& .item1 .current .current-logo": {
      flexGrow: "1",
      display: "flex",
      justifyContent: "center",
    },
    "& .item1 .current .current-logo img": {
      width: "300px",
      animation: `${bounce} 5s ease infinite`,
    },
    "& .item1 .current .current-info": {
      textAlign: "center",
      flexGrow: "1",
      border: "1px solid #D4FF9D",
      borderRadius: "5px",
    },
    "& .item1 .current .current-info .h3": {
      background: "#D4FF9D",
      color: "#1a4651",
    },
    "& .item1 .current .current-info h1": {
      margin: "0px",
      fontSize: "70px",
      color: "#8FD6E8",
    },
    "& .item1 .current .current-info .country": {
      display: "inline-block",
      background: "#1a4651",
      padding: "5px 10px",
      borderRadius: "5px",
      margin: " 4px 0",
    },
    "& .item1 .current .current-info .country p": {
      margin: "0px",
    },
    "& .item1 .status": {
      background: "#1a4651",
      borderRadius: "5px",
      display:"flex",
      flexWrap: "wrap",
      margin: "20px"
    },
    "& .item1 .status .status-i":{
      flexGrow: "1",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      padding:"20px",
    } ,
    "& .item1 .status .status-i:hover":{
      background: "#03131A",
      animation: `${bounce} 2s ease infinite`,
    },
    "& .item2 h2": {
      textAlign: "center",
    },
    "& .item2 h2 span": {
      color: "#D4FF9D",
    },
    "& .item2 .forecast": {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      // border: "1px solid #8FD6E8",
      borderRadius: "5px",
      margin: "10px",
    },
    "& .item2 .forecast:hover": {
      border: "1px solid #1a4651",
      animation: `${bounce} 4s ease infinite`,
      background:"#03131A"
    },
    "& .item2 .forecast .for-img": {
      flexGrow: "1",
      display: "flex",
      justifyContent: "center",
    },
    "& .item2 .forecast .for-img img": {
      width: "140px",
    },
    "& .item2 .forecast .for-info": {
      flexGrow: "1",
      display: "flex",
      justifyContent: "center",
    },
    "& .item2 .forecast .for-info h1": {
      color: "#D4FF9D",
      fontSize: "40px",
    },
    "& .item2 .forecast .for-time": {
      flexGrow: "1",
      display: "flex",
      justifyContent: "center",
    },
  });

  return (
    <div className={`container ${Style}`}>
      <div className="item1">
        <div className="search">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.search.value);
            }}
          >
            <label htmlFor="search"></label>
            <input
              type="search"
              placeholder="Search Locations..😒"
              name="search"
              autoFocus
            />
            <button type="submit" title="search">
              🔍
            </button>
          </form>
        </div>

        <div className="current">
          <div className="current-logo">
            <img src={info.current.condition.icon} alt="weather-icon" />
          </div>
          <div className="current-info">
            <div>
              <div className="h3">
                <h3>
                  {info.location.name}, <small>{info.location.region}</small>
                </h3>
              </div>

              <h1>{info.current.temp_c}&deg; C</h1>
              <p>{info.current.condition.text}</p>
              <h4>{info.current.last_updated}</h4>
            </div>
            <div className="country">
              <p>{info.location.country}</p>
            </div>
          </div>
        </div>
        <div className="status">
          {currentInfo.map((item, id) => (
            <div className="status-i" key={id}>
              <div>
              <h2>{item.link}</h2>
              <p>{item.name}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="item2">
        <div>
          <h2>
            4 Days <span>Forecast</span>
          </h2>
          {info.forecast.forecastday.map((item, id: number) => (
            <div key={id} className="forecast">
              <div className="for-img">
                <img src={item.day.condition.icon} alt="status" />
              </div>
              <div className="for-info">
                <div>
                  <h1>{item.day.maxtemp_c}&deg; C</h1>
                  <p>{item.day.condition.text}</p>
                </div>
              </div>
              <div className="for-time">
                <div>
                  <div>
                    <p>
                      <b>DATE:</b> {item.date}
                    </p>
                  </div>
                  <div>
                    <h4>Sunrise: {item.astro.sunrise}</h4>
                    <h4>Sunset: {item.astro.sunset}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
