const {Recipe, Diet} =require("../db");
const {createRecipe, getIdRecipes, getAllRecipes, searchRecipeByName } = require("../controllers/recipesControllers");
const { v4: uuidv4 } = require("uuid");

const getRecipesHandler = async (req, res) => {
  const { name } = req.query;
  const results = name ? await searchRecipeByName(name) : await getAllRecipes();
  res.json(results);
};


//recipe-trae una por ID
 const getRecipesById = async (req, res) => {  
   const {id} = req.params;
   
   const source = isNaN(id) ? "bdd" : "api";
  
   try {     const recipe = await getIdRecipes(id,source);
     res.status(200).json(recipe);
   } catch (error) {
     res.status(400).send({error:error.message})
   }       
 }


// const getRecipesById = async (req, res) => {
//   const { idRecipe } = req.params;
//   const source = isNaN(idRecipe) ? "bdd" : "api";

//   try {
//     let recipe;

//     if (source === "api") {
//       recipe = await getIdRecipes(idRecipe);
//     } else {
//       recipe = await Recipe.findByPk(idRecipe, {
//         include: {
//           model: Diet,
//           attributes: ["name"],
//           through: { attributes: [] },
//         },
//       });
//     }

//     res.status(200).json(cleanArray([recipe]));
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };






//post, create recipe 
const postRecipesHandler = async (req, res) => {
    
  try {
    const { name, summary, image, healthScore, diets, stepByStep } = req.body;
    console.log(stepByStep)
    const id = uuidv4(); // Generar un UUID válido
    const newRecipe = await createRecipe(id, name, summary, image, healthScore, diets, stepByStep);
    res.status(201).json(newRecipe);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
    
    getRecipesHandler,
    getRecipesById,
    postRecipesHandler
}