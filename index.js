const PORT = 3000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const articles = [];
const newspapers = [
    {
        name: 'stuff',
        address: 'https://www.stuff.co.nz',
    }
    ,
    {
        name: 'odt',
        address: 'https://www.odt.co.nz',
    },
    {
        name: 'nzherald',
        address: 'https://www.nzherald.co.nz',
    }
]

app.get('/', (req, res) => {
    res.json('Welcome to my Climate Change News API  localhost:3000/news generates a json of newspaper articles tagged with climate from 3 NZ newspapers')
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
newspapers.forEach(newspaper => {
    axios.get(newspaper.address).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a:contains("Sport")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href');
            articles.push({
                title,
                url,
                source: newspaper.name
            });
        });
    });
});
app.get('/news', (req, res) => {
    res.json(articles);
});

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId;
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address;
    axios.get(newspaperAddress).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const specificArticles = [];

        $('a:contains("Sport")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr('href');
            specificArticles.push({
                title,
                url,
                baseUrl: newspaperAddress,
                source: newspaperId
            })
        })
        res.json(specificArticles);
    }).catch(err => console.log(err));

})
