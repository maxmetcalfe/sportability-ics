### Export Sportability schedule to an ICS file

1. Locate schedule on Sportability (e.g. http://www.sportability.com/spx/Leagues/Schedule.asp?LgID=47353)

2. Copy schedule text to a file in the root of this repo (e.g. `events.txt`).

3. Replace relevent info in `index.js` (you may want to specify a different `TEAM`).

4. Run `npm run start`.

5. Import ICS file (e.g. `events.ics`) into calendar system of your choice.
