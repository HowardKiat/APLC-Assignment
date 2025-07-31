const fs = require('fs');

// Load JSON
function loadData(file) {
    const raw = fs.readFileSync(file, 'utf8').trim();
    if (raw.startsWith('[')) return JSON.parse(raw);
    return raw.split(/\n/).map(line => JSON.parse(line));
}

const data = loadData('weather.json');

// ---------------- Functional Operations ----------------

// Display all records
console.log('---- DISPLAY WEATHER RECORDS ----');
data.forEach((d, i) => {
    console.log(`Day ${i + 1}: Min=${d.MinTemp}°C, Max=${d.MaxTemp}°C, Rain=${d.Rainfall}mm, Gust=${d.WindGustSpeed}km/h`);
});

// Search: MaxTemp>35 OR WindGustSpeed>40
const extremeDays = data.filter(d => d.MaxTemp > 35 || d.WindGustSpeed > 40);
console.log('\n---- EXTREME WEATHER ----');
console.log(extremeDays);

// Count RainToday == 'Yes'
const rainTodayCount = data.reduce((count, d) => count + (d.RainToday === 'Yes' ? 1 : 0), 0);
console.log(`\nDays it rained today: ${rainTodayCount}`);

// Map DailyRange
const withRange = data.map(d => ({ ...d, DailyRange: d.MaxTemp - d.MinTemp }));
console.log('\n---- DAILY RANGE ----');
withRange.forEach((d, i) => console.log(`Day ${i + 1} Range = ${d.DailyRange}°C`));

// Sort by MaxTemp, Rainfall, Humidity3pm DESC
const sorted = [...data].sort((a, b) =>
    b.MaxTemp - a.MaxTemp || b.Rainfall - a.Rainfall || b.Humidity3pm - a.Humidity3pm
);
console.log('\n---- SORTED (MaxTemp, Rainfall, Humidity3pm) ----');
console.log(sorted.map(d => `Max=${d.MaxTemp}, Rain=${d.Rainfall}, H3pm=${d.Humidity3pm}`));

// Lambda, Currying & Partial Application
const hotAndDry = d => d.MaxTemp > 35 && d.Humidity3pm < 30;
console.log('\n---- HOT & DRY DAYS ----');
console.log(data.filter(hotAndDry));

const filterByWindDir = dir => list => list.filter(d => d.WindDir9am === dir);
const filterNW = filterByWindDir('NW');
console.log('\n---- WIND DIR 9AM == NW ----');
console.log(filterNW(data));

// Generate Prolog Knowledgebase
let prolog = '% Weather Knowledgebase\n';
prolog += '% weather(Day, MaxTemp, WindGustSpeed, RainToday, RainTomorrow).\n';
data.forEach((d, i) => {
    prolog += `weather(${i + 1}, ${d.MaxTemp}, ${d.WindGustSpeed}, ${d.RainToday.toLowerCase()}, ${d.RainTomorrow.toLowerCase()}).\n`;
});

// Prolog rules
prolog += `
rain_tomorrow(Day) :- weather(Day, _, _, _, yes).
hot_windy(Day) :- weather(Day, Max, Wind, _, _), Max > 30, Wind > 40.
no_rain_today_but_rain_tomorrow(Day) :- weather(Day, _, _, no, yes).
`;

fs.writeFileSync('weather.pl', prolog, 'utf8');
console.log('\n Prolog file generated: weather.pl');
