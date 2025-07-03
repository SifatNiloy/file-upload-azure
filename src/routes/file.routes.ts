import express from 'express';
import multer from 'multer';
import { handleUpload } from '../controllers/file.controller';

const upload = multer({ dest: 'src/uploads/' });

const router = express.Router();
router.post('/upload', upload.single('file'), handleUpload);
export default router;
