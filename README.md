# Basic Weather App

### Overview

This is a basic weather app that utilizes the [OpenWeather API](openweathermap.org/api) to retrieve current weather conditions by ZIP code, city name, or latitude/longitude.

The app is built using TypeScript. The server utilizes Node.js with Express to handle communication with the OpenWeather API, and the client utilizes React.js using Vite and Bootstrap to display a web interface.

### Examples

##### ZIP Code

* 55345
* 30349

##### City Name

* Minnetonka
* Atlanta

##### Latitude/Longitude

* 35, -92
* 44.9,-93.5
* 33.749,-84.388

### Building and Running the App

The `client` and `server` directories contain separate Node.js applications for the frontend and backend, respectively. After downloading the project, you can install each application using `npm install` and run them with `npm run dev` from inside the `client` and `server` directories.

This project was developed using Node.js version 22.12.0 and npm version 10.9.0.

### AI Disclosure

AI assistance was used sparingly while developing this project. Specifically, ChatGPT was used primarily during project setup and deployment.

My approach when using AI assistance during this project was to ask questions in a way that will help me understand the problem, then develop (i.e., code) the solution myself from there.
