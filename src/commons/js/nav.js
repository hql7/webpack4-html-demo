var nav = document.querySelector("#nav-box");
var data = [
  { name: "about", url: "about.html" },
  { name: "index", url: "index.html" }
];

function html(data) {
  data = data || [];
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += "<li><a href = '" + data[i].url + "'>" + data[i].name + "</a></li>";
  }
  return "<ul>" + html + "</ul>";
}

nav.innerHTML = html(data);
