import express from 'express';
import { createNewQuestion,createNewQuestionType,saveAnswers } from "../controllers/questionariesController.js";

const questionariesRoute = express.Router();

questionariesRoute.post("/addQuestionType",createNewQuestionType);
questionariesRoute.post("/addNewQuestion",createNewQuestion);
questionariesRoute.post("/savaAnswer",saveAnswers);

export default questionariesRoute;