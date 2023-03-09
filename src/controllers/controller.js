const db = require("../models/index");
const { questions, answers } = require("../database/data.js");

/** get all questions */
async function getQuestions(req, res) {
  try {
    const questions = await db.Questions.findAll();

    const _questions = questions.map((quest) => ({
      ...quest?.get(),
      answers: +quest?.get().answers,
      options: JSON.parse(quest?.get().options),
    }));

    res.json(_questions);
  } catch (error) {
    res.json(error);
  }
}

/** insert all questions */
async function insertQuestions(req, res) {
  try {
    const questionsToInsert = questions.map((question, index) => {
      return {
        question: JSON.stringify(question.question),
        options: JSON.stringify(question.options),
        answers: answers[index],
      };
    });

    const newQuestion = await db.Questions.bulkCreate(questionsToInsert);

    res.json(newQuestion);
  } catch (error) {
    res.json(error);
  }
}

/** delete questions */
async function deleteQuestions(req, res) {
  try {
    await db.Questions.destroy({
      where: {},
      truncate: true,
    });
    res.json("Question delete request");
  } catch (error) {
    res.json(error);
  }
}

/** get all result */
async function getResults(req, res) {
  try {
    const result = await db.Result.findAll();

    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

/** post result */
async function storeResult(req, res) {
  try {
    const { username, result } = req.body;
    const answers = await db.Questions.findAll({
      attributes: ["answers"],
    });

    let store = 0;
    let attempts = 0;

    answers.forEach((item, index) => {
      if (+item.dataValues.answers === +result[index] && result !== null) {
        store += 10;
      }
    });

    result.forEach((item) => {
      if (item !== null) attempts++;
    });

    if (!req.body) {
      throw Error("Data Not Provided...!");
    }

    const response = await db.Result.create({
      username,
      result: JSON.stringify(result),
      attempts,
      points: store,
      achived: store >= 30 ? "Passed" : "Failed",
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
}

/** delete all result */
async function deleteResults(req, res) {
  try {
    await db.Result.destroy({
      where: {},
      truncate: true,
    });
    res.json("Result delete request");
  } catch (error) {
    res.json(error);
  }
}

module.exports = {
  getQuestions,
  insertQuestions,
  deleteQuestions,
  getResults,
  storeResult,
  deleteResults,
};

// how to delete all rows in sequelize?
