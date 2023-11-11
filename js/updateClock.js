function updateClock() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = dayNames[currentTime.getDay()];

  var date = currentTime.getDate();
  var month = currentTime.getMonth() + 1; // January is 0!
  var year = currentTime.getFullYear();

  // Pad single digit minutes and seconds with a leading zero
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  // Set the content of the elements with the current time and date
  document.getElementById("current-time").innerText = hours + ":" + minutes + " " + (hours >= 12 ? "PM" : "AM");
  document.getElementById("current-day").innerText = day;
  document.getElementById("current-date").innerText = month + "/" + date + "/" + year;

  // Update the clock every second
  setTimeout(updateClock, 1000);
}

// Initial call to update the clock
updateClock();
