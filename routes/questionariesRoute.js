import express from 'express';
import { createNewQuestion,createNewQuestionType,saveAnswers,getQuestionsByTypeId } from "../controllers/questionariesController.js";
import { LoginRequired } from '../middlewares/login_required.js';

const questionariesRoute = express.Router();

questionariesRoute.post("/api/addQuestionType",createNewQuestionType);
questionariesRoute.post("/api/addQuestion",createNewQuestion);
questionariesRoute.post("/api/saveAnswer",LoginRequired,saveAnswers);
questionariesRoute.get("/api/questions/:questionType",getQuestionsByTypeId);

export default questionariesRoute;