# API Creation Project

The goal of this project was to learn how to create a webscraper and generate a api from the data.

3 New Zealand newspapers are searched for the keyword Sport

Modify by changing:
- const newspapers at line 9 in index.js to add or change newspapers
- swap "Sport" for any other search term in lines 35 and 58


### localhost:3000/news

Generates a json of newspaper articles tagged with "Sport" from 3 NZ newspapers:
- Stuff
- ODT
- NZ Herald

### localhost:3000/news/[newspaperId]

newspaperId = stuff||odt||nzherald

Generates a json of newspaper articles tagged with "Sport" from the one paper with full url

js modules used:

- express
- cheerio
- axiom
- nodemon

From command line:   npm run start 
