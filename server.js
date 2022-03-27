const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.static(`${__dirname}/dist`));
let dirs = ['chat', 'profile', 'login', 'signin', 'error'];
dirs.forEach(d => {
    app.use(express.static(`${__dirname}/dist/${d}`));
});

app.get('/index.html', (req, res) => {
    res.redirect("/chat.html");
});

app.get('/', (req, res) => {
    res.redirect("/chat.html");
});

app.listen(PORT, function () {
  console.log(`Chat is listening on port ${PORT}!`);
}); 