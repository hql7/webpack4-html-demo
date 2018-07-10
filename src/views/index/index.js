import "./index.css";
/* import "../../commons/css/clear.css";
import "../../commons/js/nav" */

var dom = document.querySelector(".aa");
dom.innerHTML = "to about";
dom.addEventListener("click", function() {
  window.location = "about.html";
});

var num = JSON.stringify("11-55-11");

// var num = "2018-10-11";

function sha(data) {
  console.log(data);
}

var dd = document.querySelector(".dd");
dd.innerHTML =
  "<a href='javascript:void(0)' onclick='sha( " + num + " )'>点我</a>";
