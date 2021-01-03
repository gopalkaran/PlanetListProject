import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  var [planet, setPlanet] = useState(null);

  const url = "https://assignment-machstatz.herokuapp.com/planet";
  const fetchData = async (event) => {
    const response = await axios.get(url);
    setPlanet(response.data);
    console.log(response.data);
  };
  function show(event) {
    fetchData();
    var btnList = document.getElementsByClassName("btn");
    for (var i = 0; i < btnList.length; i++) {
      deSelect(btnList[i]);
    }
    var allButton = event.target;
    allButton.classList.add("btn-active");
    if (planet != null) {
      planet.map((item, index) => {
        var listElement = document.getElementById(index);
        listElement.style.display = "block";
        // listElement.style.gap = "3rem";
        if (item.isFavourite === true) {
          var childs = listElement.children;
          console.log(childs[0]);
          childs[0].style.display = "none";
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
          document.getElementById(index).style.display = "none";
        }
      });
    }
  }

  function planetClickedHandler(event) {
    var index = event.target.id;
    var childs = event.target.childNodes;
    console.log(childs);
    var flag = planet[index].isFavourite;
    if (!flag) {
      planet[index].isFavourite = true;
      console.log(childs[0]);
      childs[0].style.display = "inline-block";
      return;
    } else {
      planet[index].isFavourite = false;
      console.log(childs[0]);
      childs[0].style.display = "none";
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
                <span>{name}</span>
              </li>
            );
          })}
      </div>
    </div>
  );
}
