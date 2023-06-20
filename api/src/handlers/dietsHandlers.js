const { getDiets,  } = require("../controllers/dietControllers");

const getDietsHandler = async (req, res) => {
    try {
      const response = await getDiets();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  module.exports = {
    getDietsHandler,
    
  }