import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  var [planet, setPlanet] = useState(null);
  var [btn, setBtn] = useState(null);

  const url = "https://assignment-machstatz.herokuapp.com/planet";
  const fetchData = async () => {
    const response = await axios.get(url);
    setPlanet(response.data);
  };

  function fetchFavourite(event) {
    if (event.target.id === "btn2") {
      setBtn(event.target.id);
      console.log(btn);
    }
  }

  function planetClickedHandler(event) {
    var index = event.target.id;
    var childs = event.target.childNodes;
    var flag = planet[index].isFavourite;
    if (!flag) {
      planet[index].isFavourite = true;
      console.log(childs[0]);
      childs[0].style.visibility = "visible";
      return;
    } else {
      planet[index].isFavourite = false;
      console.log(childs[0]);
      childs[0].style.visibility = "hidden";
      return;
    }
  }
  return (
    <div className="App">
      <div>
        <button id="btn1" className="btn" onClick={fetchData}>
          All planet
        </button>
        <button id="btn2" className="btn" onClick={fetchFavourite}>
          Favourite planet
        </button>
      </div>
      <div id="all" className="planet">
        {planet &&
          planet.map((plan, index) => {
            const name = plan.name;
            return (
              <li id={index} key={name} onClick={planetClickedHandler}>
                <div className="tick-mark"></div>
                {name}
              </li>
            );
          })}
      </div>
      {
        // if(btn==="btn2") {

        // }
        <div id="fav">
          {planet &&
            planet.map((plan, index) => {
              const name = plan.name;
              return (
                <li id={index} key={name} onClick={planetClickedHandler}>
                  <div className="tick-mark"></div>
                  {name}
                </li>
              );
            })}
        </div>
      }
    </div>
  );
}
