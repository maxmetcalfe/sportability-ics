#!/usr/bin/env node

// Create ICS files for BASH Sportability events.
// Max Metcalfe - 9/15/2019

const ics = require("ics");
const fs = require("fs");

// Pick your team
const TEAM = "Rink Rats";

// Specify raw events file.
const FILE_PATH="./events.txt";

// Define locations
const LOCATIONS = {
  "James Lick Arena": { lat: 40.0095, lon: 105.2669 }
};

// Define duraction of event.
const DURATION = { hours: 2 };

let date;
let time;
let location;
let title;
let events = [];

// Load raw events file.
let lines = fs.readFileSync(FILE_PATH).toString().split("\n");

console.log(`✅   Loaded raw events file: ${FILE_PATH}`);

function formatDate(dateString) {
  let dateSplit = dateString.split(" ")[1].split("/");
  return [dateSplit[2], dateSplit[0], dateSplit[1]];
}

function formatTime(timeString) {
  let timeSplit = timeString.split(":");
  let hours = parseInt(timeSplit[0]);
  let minutes = timeSplit[1].charAt(0) + timeSplit[1].charAt(1);
  let amPM = timeSplit[1].charAt(2);

  minutes = minutes === "00" ? "0" : minutes;
  hours = amPM === "p" ? hours = 12 + hours : hours;

  return [hours, minutes];
}

// Process lines
lines.forEach((line) => {

  // Detect if this line contains the date.
  let dateLine = line.indexOf("Sat ") > -1;

  if (dateLine) {
    date = formatDate(line.split("\t")[0]);
    time = formatTime(line.split("\t")[1]);
    location = line.split("\t")[4];
    title = line.split("\t")[2];
  } else {
    time = formatTime(line.split("\t")[0]);
    location = line.split("\t")[4];
    title = line.split("\t")[1];
  }

  // We found an entry for our team.
  if (line.indexOf(TEAM) > -1) {
    let event = {
      title: title,
      start: date.concat(time),
      duration: DURATION,
      location: location,
      geo: LOCATIONS[location]
    };

    events.push(event);
  }
});

console.log(`✅   Created ${events.length} events.`);

// Write ICS file.
ics.createEvents(events, (error, value) => {
  if (error) {
    console.log(error);
  }

  fs.writeFileSync(`${__dirname}/event.ics`, value);
  console.log(`✅   Generated ICS file.`);
  console.log("😄   Done.");
});
