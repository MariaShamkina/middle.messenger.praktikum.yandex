const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));
const dirs = ['chat', 'profile', 'login', 'signin', 'error'];
dirs.forEach((d) => {
  app.use(express.static(`${__dirname}/dist/${d}`));
});

app.get('/index.html', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/chat/chat.html`);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/chat/chat.html`);
});

app.listen(PORT, () => {
  console.log(`Chat is listening on port ${PORT}!`);
});
