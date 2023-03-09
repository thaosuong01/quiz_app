const router = require("express").Router();
const controller = require("../controllers/controller.js");

/**Questions Routes API */
router
  .route("/questions")
  .get(controller.getQuestions)
  .post(controller.insertQuestions)
  .delete(controller.deleteQuestions);

router
  .route("/result")
  .get(controller.getResults)
  .post(controller.storeResult)
  .delete(controller.deleteResults);

module.exports = router;
