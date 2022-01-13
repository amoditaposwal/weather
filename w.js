var x = document.getElementById("demo");
var images = [
  "sunny",
  "partly",
  "cloudrain",
  "cold-breeze",
  "mist",
  "night",
  "rainbow",
  "rainy",
  "thunder"
];
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  getData(x, y);
}
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}
const getData = async (x, y) => {
  var response = await fetch(
    "https://weatherapi-com.p.rapidapi.com/current.json?q=" + x + "," + y + "",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "eb14ab5d16mshf1561fdb1c9fdfcp11a2a2jsn9d3835553a76"
      }
    }
  );
  var data = await response.json();
  var index;
  console.log(data);
  var condition = data.current.condition.text.toLowerCase();
  if (condition.includes("sunny")) {
    index = 0;
  } else if (
    condition.includes("cloudy") ||
    condition.includes("rain possible")
  ) {
    index = 1;
  } else if (
    condition.includes("fog") ||
    condition.includes("drizzle") ||
    condition === "mist"
  )
    index = 3;
  else if (condition.includes("heavy rain") || condition.includes("rain"))
    index = 7;
  else if (condition.includes("thunder")) index = 8;
  else if (condition.includes("freezing")) index = 4;
  else if (condition.includes("showers")) index = 2;
  else if (condition === "clear" && !data.current.is_day) index = 5;
  else index = 6;
  if (data.current.is_day)
    document.body.style.backgroundColor = "rgb(255 245 225)";
  else {
    document.body.style.backgroundColor = "rgb(134 130 232)";
    document.querySelector("#info2").color = "white";
  }
  document.querySelector("#city").innerHTML = data.location.name;
  document.querySelector("#temp").innerHTML = data.current.temp_c + "º";
  document.querySelector("#t").innerHTML = data.current.condition.text;
  document.querySelector("#wind").innerHTML = data.current.wind_kph;
  document.querySelector("#hu").innerHTML = data.current.humidity;
  document.querySelector(
    "#info"
  ).style.backgroundImage = `url(images/${images[index]}.png)`;
};
getLocation();
