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
    var index = event.target.id;
    var childs = event.target.children;
    var flag = planet[index].isFavourite;
    if (!flag) {
      planet[index].isFavourite = true;
      childs[0].style.visibility = "visible";
      return;
    } else {
      planet[index].isFavourite = false;
      childs[0].style.visibility = "hidden";
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
