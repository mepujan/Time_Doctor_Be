import express from 'express';
import { createNewQuestion,createNewQuestionType,saveAnswers } from "../controllers/questionariesController.js";

const questionariesRoute = express.Router();

questionariesRoute.post("/api/addQuestionType",createNewQuestionType);
questionariesRoute.post("/api/addQuestion",createNewQuestion);
questionariesRoute.post("/api/saveAnswer",saveAnswers);

export default questionariesRoute;