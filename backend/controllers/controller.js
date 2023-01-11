import Questions from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import questions, { answers } from "../database/data.js";

// get all questions
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

// insert all questions
export async function insertQuestions(req, res) {
  try {
    Questions.insertMany({ questions, answers }, ( err, data ) => {
        res.json({ msg: "Data Saved Successfully...!" });
      }
    );
  } catch (error) {
    res.json({ error });
  }
}

// delete all questions
export async function deleteQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

// get all result
export async function getResult(req, res) {
  try {
    const r = await Result.find();
      res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

// insert all result
export async function insertResult(req, res) {
  try {
    const { username, result, attempts, points, achieved} = req.body;
    if(!username && !result) throw new Error("Data not Provided...!")
    Result.create({ username, result, attempts, points, achieved}, ( err, data ) => {
      res.json({ msg: "Result Saved Successfully...!" });
    })
  } catch (error) {
    res.json({ error });
  }
}

// delete all result
export async function deleteResult(req, res) {
  try {
    const { username, result, attempts, points, achieved} = req.body;
    if(!username && !result) throw new Error("Data not Provided...!")
    await Result.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}