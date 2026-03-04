import express from 'express' 
const router=express.Router();
import {fetchdata} from '../Controllers/fetchdata.js';
router.get('/fetchdata/:imdbid',fetchdata);
export default router;