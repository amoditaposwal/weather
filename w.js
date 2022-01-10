var x = document.getElementById("demo");
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
const getData= async(x,y)=> {
   var response=await fetch(
    "https://weatherapi-com.p.rapidapi.com/current.json?q=" + x + "," + y + "",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "eb14ab5d16mshf1561fdb1c9fdfcp11a2a2jsn9d3835553a76",
      },
    }
  );
  var data= await response.json();
  console.log(data);

  document.querySelector("#city").innerHTML=data.location.name;
  document.querySelector("#temp").innerHTML=data.current.temp_c+"º";
  document.querySelector("#t").innerHTML=data.current.condition.text;
}
getLocation();
