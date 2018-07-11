
var dom = document.querySelector(".aa");
dom.innerHTML = "to about";
dom.addEventListener("click", function() {
  window.location = "about.html";
});

var num = JSON.stringify("2011-02-22,2012-05-25");

// var num = "2018-10-11";

var dd = document.querySelector(".dd");
dd.innerHTML =
  "<a href='javascript:void(0)' onclick='sha( " + num + " )'>点我</a>";

function sha(data) {
  console.log(data);
}

