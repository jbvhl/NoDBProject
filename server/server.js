const express = require('express');
const ctrl = require('./controller');

const app = express();

app.use(express.json());


app.get(`/api/VietRecipes`, ctrl.getRecipes);
app.post(`/api/VietRecipe`, ctrl.createRecipes);
app.put(`/api/VietRecipe/:food`, ctrl.updateRecipe);
app.delete(`/api/VietRecipe/:food`, ctrl.deleteRecipe);


const port = 5555;
app.listen(5555, () => console.log(`Pandas in Atlanta on 5555`));