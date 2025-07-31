# APLC-Assignment

# 🌦️ APLC Weather Data Analysis Assignment

> Advanced Programming Language Concepts (CT006-3-3)  
> Asia Pacific University of Technology & Innovation  
> **Year:** 2025  
> **Student:** Howard Tan How Kiat  
> **Lecturer:** Ms.Fatin Izzati

---

## 📁 Project Overview

This project demonstrates the application of **functional programming** in **JavaScript** and **declarative logic programming** in **Prolog**.  
The data is derived from weather records and analysed to extract patterns and fulfil specific computational tasks.

---

## 📌 Functional Programming Tasks (`analysis.js`)

### ✅ Features Implemented:
- ✔️ **Display** all weather records (MinTemp, MaxTemp, Rainfall, WindGustSpeed)
- ✔️ **Search** for days with:
  - MaxTemp > 35°C **or**
  - WindGustSpeed > 40 km/h
- ✔️ **Count** the number of days it rained today (RainToday == 'Yes')
- ✔️ **Map**: Create a new field `DailyRange = MaxTemp - MinTemp`
- ✔️ **Sort** weather data by MaxTemp, Rainfall, and Humidity3pm (descending)
- ✔️ **Filter** hot-and-dry days (MaxTemp > 35 and Humidity3pm < 30) using **lambda**
- ✔️ **Filter by wind direction** using **currying and partial application**
- ✔️ **Generate Prolog knowledge base** (`weather.pl`)

---

## 🔧 How to Run JavaScript

### 🛠 Requirements:
- [Node.js](https://nodejs.org/) installed
- [Swi-Prolog](https://www.swi-prolog.org/download/stable) installed


### ▶️ How To Execute:
```bash
node analysis.js
```
###  Sample Prolog Queries:
```bash
?- [weather].                             % Load the knowledgebase
?- rain_tomorrow(Day).                   % List all days with RainTomorrow == 'Yes'
?- hot_windy(Day).                       % Days with MaxTemp > 30 AND WindGustSpeed > 40
?- no_rain_today_but_rain_tomorrow(Day).% Days with no rain today, but rain tomorrow
```

### Run in SWI-Prolog:
Ensure SWI-Prolog is installed, then run:
```bash
swipl
?- consult('weather.pl').
```

### Example NDJSON Format (weather.json)
```json
{"MinTemp": 14.1, "MaxTemp": 34.5, "Rainfall": 0.0, "WindGustSpeed": 44, "Humidity3pm": 28, "RainToday": "No", "RainTomorrow": "Yes", "WindDir9am": "NW"}
{"MinTemp": 17.3, "MaxTemp": 36.7, "Rainfall": 0.4, "WindGustSpeed": 38, "Humidity3pm": 35, "RainToday": "Yes", "RainTomorrow": "No", "WindDir9am": "E"}
```
