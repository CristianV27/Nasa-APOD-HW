var baseUrl = "https://api.nasa.gov/planetary/apod";
var api_key = "mk4YRbUvNGpTkJGC7l9ndROI8mi5A3kMvNuGmaFH";
var url = new URL (baseUrl);
var buton = document.getElementById("buton");
// var allInfo = document.getElementById("allInfo");

buton.addEventListener("click", getPOD);

function getPOD() {

  displayLoader();

  url.searchParams.set("api_key", api_key);
  setDateFilter();

  fetch(url.href, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResp) {
      console.log(jsonResp);
      if (jsonResp.msg) {
        displayError(jsonResp.msg);
      } else if (jsonResp.media_type == "image") {
        displayPicture(jsonResp);
      } else if (jsonResp.media_type == "video") {
        displayVideo(jsonResp);
      }
    })
    .catch(function () {
      displayError("Something went wrong! Try again!");
    })
    .finally(hideLoader);
}

function getTitle(element) {
  var title = document.getElementById("title");
  var newTitle = document.createElement("h1");
  newTitle.innerText = element.title;
  title.appendChild(newTitle);
}

function displayPicture(picture) {
  getTitle(picture);
  var pic = document.getElementById("picture");
  var newPic = document.createElement("img");
  newPic.src = picture.url;
  pic.appendChild(newPic);
}

function displayVideo(todayVideo) {
  getTitle(todayVideo);
  var video = document.getElementById("video");
  var newVideo = document.createElement("iframe");
  newVideo.src = todayVideo.url;

  newVideo.style.width = "800px";
  newVideo.style.height = "500px";

  video.appendChild(newVideo);
}

function setDateFilter() {
  var pickedDate = document.getElementById("calendar").value;

  if (pickedDate) {
    url.searchParams.set("date", pickedDate);
  }
}

function displayError(errorMessage) {
  var errorDiv = document.getElementById("errorDiv");
  errorDiv.innerText = errorMessage;
}

function displayLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    var container = document.getElementsByClassName("container")[0];
    loader.style.display = "block";
    container.style.opacity = 0.2;

}

function hideLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    var container = document.getElementsByClassName("container")[0];
    loader.style.display = "none";
    container.style.opacity = 1;
}