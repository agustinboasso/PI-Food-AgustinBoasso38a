const {Router} = require("express");
const {getDietsHandler,
    } = require("../handlers/dietsHandlers")

const diets = Router();

diets.get("/", getDietsHandler);


module.exports = diets;
