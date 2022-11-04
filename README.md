### A SPA application for the aggregation of RSS feeds. The app receives a source as input, checks the source for updates every 5 seconds, and allows you to read each post as a short description, and a direct link to the specific post.


[![Actions Status](https://github.com/Vox1oot/frontend-project-lvl3/workflows/hexlet-check/badge.svg)](https://github.com/Vox1oot/frontend-project-lvl3/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/0bc877fa117152120c0c/maintainability)](https://codeclimate.com/github/Vox1oot/frontend-project-lvl3/maintainability)
[![Node CI](https://github.com/Vox1oot/frontend-project-lvl3/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Vox1oot/frontend-project-lvl3/actions/workflows/nodejs.yml)

### Go to app -> [RSS-aggregator](https://morsa-frontend-project-lvl3.vercel.app/)

### Principle of operation:
The user enters the address of the source of interest into the aggregator. Then the aggregator itself checks the source for updates at 5-second intervals, and if they are available, adds the update to the list, and displays it on the screen. After that, the user has the opportunity to review the updates.

### Installation Guide:
* ```$ git clone https://github.com/Vox1oot/frontend-project-lvl3.git```
* ```make install```
* ```make server```
<b>- launch webpack-dev-server for development</b>
* ```make build```
<b>- package assembly</b>
