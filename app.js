// Put your name and ID here 

const express = require("express");
const path = require("path");
const sprintf = require("sprintf-js").sprintf;

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(
  path.resolve(__dirname, "public")
));

let month = 0;
let year = 0;

function genCalendar(month, year, req, res) {

  // If your feeling clever, come up with a more streamlined way to write this function
  function calcLastDayOfMonth(month) {
    let lastDay = 0;
    if (month === 4 || month === 6 || month === 9 || month === 11)
      lastDay = 30;
    else if (month !== 2)
      lastDay = 31;
    else if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
      lastDay = 29;
    else
      lastDay = 28;
    return lastDay;
  }

  function isToday(m, d, y) {
    const today = new Date();
    return m == today.getMonth() + 1 && y == today.getFullYear() && d == today.getDate();
  }

  const monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Calculate the last day of the given month
  let lastDayOfMonth = calcLastDayOfMonth(month);
  let header_string = `${monthNames[month]} ${year}`;
  let dayOfMonth = 1;

  //gets the first day of the month
  let firstDay = new Date(year, month - 1, 1).getDay();


  let calendar_string = '<tr>';
  for (let i = 0; i < 6; i++) { // max number of weeks
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || dayOfMonth > lastDayOfMonth) {
        calendar_string += '<td></td>';
      } else {
        // check for current day
        let currentDay = null;
        if (isToday(month, dayOfMonth, year)) {
          currentDay = 'today';
        } else {
          currentDay = '';
        }
        calendar_string += `<td class="${currentDay}">${dayOfMonth}</td>`;
        dayOfMonth++;
      }
    }
    // End current row and start a new row
    calendar_string += '</tr><tr>';
    if (dayOfMonth > lastDayOfMonth) break; // Break if we have processed all days of the month
  }
  calendar_string += '</tr>'; // End of the last row

  res.render("index", {
    header: header_string,
    calendar: calendar_string
  });
}

app.get("/calendar", function (req, res) {
  if (req.query.month && req.query.year) {
    month = parseInt(req.query.month);
    year = parseInt(req.query.year);
  } else {
    let today = new Date();
    month = today.getMonth() + 1;
    year = today.getFullYear();
  }
  // Generate the calendar and render the view
  const calendarData = genCalendar(month, year, req, res);
  res.render("index", {
    calendarData
  });
});

app.get("/backmonth", function (req, res) {
  // Assign new month and year and call genCalendar

});

app.get("/forwardmonth", function (req, res) {
  // Assign new month and year and call genCalendar
});

app.get("/backyear", function (req, res) {
  // Assign new month and year and call genCalendar
});

app.get("/forwardyear", function (req, res) {
  // Assign new month and year and call genCalendar
});

app.listen(3000);

