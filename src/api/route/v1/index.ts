import express from 'express';
import authRouter from './auth.route';
import chatRoute from './chat.route';
import ollamaRoute from './ollama.route';

const router = express.Router();

interface Route {
  path: string;
  routes: express.Router;
}

const routes: Route[] = [
  { path: '/auth', routes: authRouter },
  { path: '/ollama', routes: ollamaRoute },
  { path: '/chat', routes: chatRoute },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;