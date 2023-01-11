import { Router } from 'express'
const router = Router();

// import controllers
import { getQuestions, insertQuestions, deleteQuestions, getResult, insertResult, deleteResult } from '../controllers/controller.js'

// Questions routes
router.route('/questions')
    .get(getQuestions)          // GET request
    .post(insertQuestions)      // POST request
    .delete(deleteQuestions)    // DELETE request

// Result routes
router.route('/result')
    .get(getResult)             // GET request
    .post(insertResult)         // POST request
    .delete(deleteResult)       // DELETE request
export default router;