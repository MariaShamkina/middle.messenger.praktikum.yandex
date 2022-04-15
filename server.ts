const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Chat is listening on port ${PORT}!`);
});
