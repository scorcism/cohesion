import express, { Request, Response } from 'express';
import cors from 'cors'
import passport from 'passport';
import routerV1 from './api/route/v1';
const port = 3000;

const app = express();
app.use(cors())
app.use(passport.initialize())

app.get('/health', (req: Request, res: Response) => {
  res.send('cohesion Working fine');
});

app.use('api/v1', routerV1)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
