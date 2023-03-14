import Answer from "../models/answer_model.js";
import QuestionType from "../models/questionType_model.js";
import Question from "../models/question_model.js";
import {v4 as uuid} from 'uuid';
import { sendmail } from "../sendemail.js";

export const createNewQuestionType = async(req, res, next) =>{
    try{
        const newType = await QuestionType.create(req.body);
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
        const {id,email,user_name} = req;
        const answers = req.body;
        for(const answer of answers){
            answer.questionTypeId = parseInt(answer.questionTypeId);
            const response = Answer.build(answer);
            response.userId = id;
            await response.save();
        }
        
        return res.status(201).json({message:"save successfully"});
    }catch(e){
        console.error(e);
        next(e);
    }
}

export const getQuestionsByTypeId = async(req,res,next) =>{
    try{
        const {questionType} = req.params;
        const questions = await Question.findAll({where:{
            questionTypeId:questionType
        }});
        return res.status(200).json(questions?questions:[]);
    }catch(e){
        next(e);
    }
}