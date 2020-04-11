import express from 'express';
import { serveApp } from '../controllers/home';

const router = express.Router();

router.get('/', serveApp);

export default router;
