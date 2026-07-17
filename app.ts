const express = require('express');


const app = express();
const PORT = 8001;

app.get('/', (req, res) => {
  res.json('Hello World');
  res.end();
});
app.get('/health', (req, res) => {
  res.json({
    'success': true,
    "message": "server is running"
  });
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});