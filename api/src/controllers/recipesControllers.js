const {Recipe, Diet} = require("../db");
const axios = require("axios");
const { Op } = require('sequelize');
const {API_KEY} = process.env;


const cleanArray = (arr) => 
  arr.map((ele) => {
    return {
      id: ele.id,
      name: ele.title,
      image: ele.image,
      summary: ele.summary.replace(/<[^>]+>/g, ""),
      healthScore: ele.healthScore,
      diets: ele.diets
    };
  });
  

const createRecipe = async ( id,name , summary, image, healthScore, diets, stepByStep) => {
    const newRecipe = await Recipe.create({id, name , summary, image, healthScore, diets, stepByStep})
    console.log(stepByStep)
    
    const dietsArr = await Promise.all(diets.map(async(d)=>{return await Diet.findOne({where:{name : d}})}))
  //   const arreTypes = await Promise.all(type.map(async(t)=>{
  //     return await Type.findOne({ where: { name: t } });
  // }))
    //diets.map(async (diet)=> newRecipe.addDiet(diet))
    newRecipe.addDiet(dietsArr)
    
    return newRecipe;
}

const getIdRecipes = async (id, source) => { 
    let recipe = null;
    if(source === "api"){
      let response = (await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
      response = cleanArray([response])
      recipe = response[0]
    } else {
      let responseDB = await Recipe.findOne({where: {id}, include: {model: Diet, attributes: ["name"], through:{attributes:[],}} });
             for (let j=0; j<responseDB.dataValues.diets.length;j++){     
          responseDB.dataValues.diets[j] = responseDB.dataValues.diets[j].dataValues.name
          } 
      recipe = responseDB.dataValues
    }
    console.log(recipe) 
    return recipe; 
 }



const searchRecipeByName = async (name) => {
  const lowerCaseName = name.toLowerCase();  
  // const dbRecipes = await Recipe.findAll({where: { name: { [Op.iLike]: `%${name}%` }}})
  let dbRecipes = await Recipe.findAll({ where: { name: { [Op.iLike]: `%${name}%` } }, include: {model: Diet, attributes: ["name"], through:{attributes:[],}} });
  // console.log(dbRecipes[0].dataValues.diets);
  for (let i=0; i<dbRecipes.length;i++){
    for (let j=0; j<dbRecipes[i].dataValues.diets.length;j++){     
      dbRecipes[i].dataValues.diets[j] = dbRecipes[i].dataValues.diets[j].dataValues.name
      } 
  }
  // console.log(dbRecipes[0].dataValues)
  dbRecipes = dbRecipes.map((recipe)=> {recipe = recipe.dataValues ; return recipe})
  const apiResponse = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true&number=100`)).data;
  const apiRecipes = cleanArray(apiResponse.results);
  const filteredApi = apiRecipes.filter((recipe) => recipe.name.toLowerCase().includes(lowerCaseName));
  const response = [...filteredApi, ...dbRecipes];
  
  return response;
}


const getAllRecipes =  async () => {
// buscar en bdd
let databaseRecipes = await Recipe.findAll({include: {model: Diet, attributes:['name'], through:{attributes:[],}} });
for (let i=0; i<databaseRecipes.length;i++){  
   for (let j=0; j<databaseRecipes[i].dataValues.diets.length;j++){
       databaseRecipes[i].dataValues.diets[j] = databaseRecipes[i].dataValues.diets[j].dataValues.name
   }
}
databaseRecipes = databaseRecipes.map((recipe)=> {recipe = recipe.dataValues ; return recipe})
const apiResponse = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true&number=100`)).data;
const apiRecipes = cleanArray(apiResponse.results);
const results = [...databaseRecipes, ...apiRecipes];


return results;
}
module.exports = { createRecipe, getIdRecipes, getAllRecipes, searchRecipeByName };