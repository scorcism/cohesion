import express from 'express';
import { conversationsController } from '../../controller/conversations.controller';
import { authenticate } from '../../../middleware/auth.middleware';

const conversationsRouter = express.Router();

conversationsRouter.use(authenticate)

conversationsRouter.get('/health', () => {});
conversationsRouter.get('/', conversationsController.getConversations);
conversationsRouter.post('/', conversationsController.createNewConversation);
conversationsRouter.get('/messages/:convId', conversationsController.getMessages);
conversationsRouter.post('/chat', conversationsController.chat);

export default conversationsRouter;
