
var dom = document.querySelector(".cc");
dom.innerHTML = "to index";
dom.addEventListener("click", function() {
  window.location = "index.html";
});

var imgBox = document.querySelector(".img-box");
imgBox.style.width = "200px";
imgBox.style.height = "200px";
imgBox.style.background = "url(" + require("../../assets/img/1.jpg") + ")";
imgBox.style.backgroundSize = "100% 100%";
