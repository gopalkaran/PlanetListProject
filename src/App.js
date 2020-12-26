import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  var [planet, setPlanet] = useState(null);

  const url = "https://assignment-machstatz.herokuapp.com/planet";
  const fetchData = async () => {
    const response = await axios.get(url);
    setPlanet(response.data);
    console.log(response.data);
  };

  function fetchFavourite() {
    if (planet != null) {
      planet.map((item, index) => {
        if (item.isFavourite === false) {
          document.getElementById(index).style.display = "none";
        }
      });
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
    </div>
  );
}
