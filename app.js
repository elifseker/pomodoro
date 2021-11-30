// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

// weather 
//const api = "https://weather-api-361.herokuapp.com/zip?zip="
//const api = "https://pomodoro-map.appspot.com/weather?location="
const api = "http://localhost:8081/weather?location="
document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
    const weatherForm = document.querySelector('#weatherForm');
    weatherForm.addEventListener('submit', function (event) {
        let req = new XMLHttpRequest();
        let cityInfo = document.getElementById('cityInfo').value
        let URL = api + cityInfo
        req.open('GET', URL, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                let response = JSON.parse(req.responseText);
                console.log(response)
                let city = response.City + " "
                let temp = Math.round(response.Temp);
                document.getElementById('weatherResult').textContent = city + temp + "℉";
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(null);
        event.preventDefault();
    });
}

// date 
const dt = new Date();

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

document.getElementById("date").innerHTML = dt.toLocaleDateString(undefined, options);
// time
var tm = new Date();

document.getElementById("time").innerHTML = tm.toLocaleTimeString();

