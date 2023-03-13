import Answer from "../models/answer_model.js";
import QuestionType from "../models/questionType_model.js";
import Question from "../models/question_model.js";

export const createNewQuestionType = async(req, res, next) =>{
    try{
        const newType = await QuestionType.create(res.body);
        return res.status(201).json(newType);
    }catch(e){
        next(e);
    }
}


export const createNewQuestion = async(req,res,next) =>{
    try{
        const newQuestion = await Question.create(req.body);
        return res.status(201).json(newQuestion);
    }catch(e){next(e);}
}

export const saveAnswers = async(req,res,next) =>{
    try{
        const answers = await Answer.create(req.body);
        return res.status(201).json(answers);
    }catch(e){
        next(e);
    }
}