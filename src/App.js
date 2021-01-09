import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  var [planet, setPlanet] = useState(null);
  const url = "https://assignment-machstatz.herokuapp.com/planet";
  const fetchData = async (event) => {
    const response = await axios.get(url);
    setPlanet(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  function show(event) {
    var btnList = document.getElementsByClassName("btn");
    for (var i = 0; i < btnList.length; i++) {
      deSelect(btnList[i]);
    }
    var allButton = event.target;
    allButton.classList.add("btn-active");
    if (planet != null) {
      planet.map((item, index) => {
        if (item.isFavourite === false) {
          document.getElementById(index).classList.remove("hide");
        }
      });
    }
  }
  function deSelect(element) {
    element.classList.remove("btn-active");
  }

  function fetchFavourite(event) {
    var btnList = document.getElementsByClassName("btn");
    for (var i = 0; i < btnList.length; i++) {
      deSelect(btnList[i]);
    }
    var favButton = event.target;
    favButton.classList.add("btn-active");
    if (planet != null) {
      planet.map((item, index) => {
        if (item.isFavourite === false) {
          document.getElementById(index).classList.add("hide");
        }
      });
    }
  }

  function planetClickedHandler(event) {
    var element = event.target;
    var parent = event.target.parentElement;
    var flag = planet[parent.id].isFavourite;
    if (!flag) {
      planet[parent.id].isFavourite = true;
      element.style.setProperty("--fav", "#DC2626");
      return;
    } else {
      planet[parent.id].isFavourite = false;
      element.style.setProperty("--fav", "white");
      return;
    }
  }
  return (
    <div className="App">
      <div className="nav">
        <div className="nav-heading">PlanetList</div>
        <div className="tab-view">
          <button className="btn" onClick={show}>
            All planet
          </button>
          <button className="btn" onClick={fetchFavourite}>
            Favourite planet
          </button>
        </div>
      </div>
      <div className="planet">
        <h3>
          Click on the heart to create your fav list and click again to remove
          from fav list and see your favourited list clicking favourite planet
        </h3>
        <ul>
          {planet &&
            planet.map((plan, index) => {
              const name = plan.name;
              return (
                <li id={index} key={name}>
                  <div id="heart" onClick={planetClickedHandler}></div>
                  {name}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
