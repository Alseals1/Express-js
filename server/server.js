const express = require("express"),
    app = express(),
    path = require("path"),
    fs = require("fs");

app.use(express.json())
app.use(express.urlencoded({ extended: false}));


app.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})



app.post("/info-form", (req, res) => {
    let info = {
        email: req.body.email,
        password: req.body.password
    }


let data = JSON.stringify(info)
fs.appendFile("./info.json", data, (err) =>{
    if (err) throw err;
    console.log('Done')
})

res.redirect('/formsubmissions');
})

app.get('/formsubmissions', (req, res) => {
    fs.readFile("./info.json", (err, data) => {
        res.type("text").send(data);
    });
})
// app.get('/', (req, res) => {
//     res.send('Hello from the web server side...')
// });

app.use(express.static(path.join(__dirname, '../public')));


app.listen(3000);