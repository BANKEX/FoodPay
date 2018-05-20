const express = require('express'),
    url = require('url'),
    hbs = require('hbs'),
    bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({
    extended: false
}));

hbs.registerPartials(__dirname + '/views/templates', () => {
    app.set("view engine", "hbs");

    var pathname = ''; // Переменная для хранения текущего url

    app.use((req, res) => {
        pathname = url.parse(req.url).pathname;
        if (pathname == '/' || pathname == '' || pathname == '/scan') {
            res.render('scan.hbs');
        } else if(pathname == "/cashbox") {
            res.render('cashbox.hbs');
        } else if (pathname == '/dashboard') {
            res.render('dashboard.hbs');
        } else if (pathname == '/admin') {
            res.render('admin.hbs');
        } else {
            res.send('404');
        }
    });
    app.listen(3000);
});