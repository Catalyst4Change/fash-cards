import express from 'express';
import data from './data.json' assert {type: 'json'}
import cors from 'cors'

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(cors())
app.locals.title = 'Hate-abase';
app.locals.hateSymbols = data

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/', (request, response) => {
  response.send('It works!');
});

app.get('/api/hatesymbols', (req,res) => {
  const symbols = app.locals.hateSymbols

  res.send( symbols )
})
