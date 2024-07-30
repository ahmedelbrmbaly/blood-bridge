import express, { RequestHandler } from 'express';

const app = express();

app.use(express.json());

const posts: any[] = [];

const requestlogger: RequestHandler = (req, res, next) => {
  console.log('New Request', req.path, '-body', req.body);
  next();
};

app.use(requestlogger);
app.use((req, res, next) => {
  console.log(Date.now());
  next();
});

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/posts', (req, res) => {
  const post = req.body;
  posts.push(post);
  res.sendStatus(200);
});

app.listen(3000);
