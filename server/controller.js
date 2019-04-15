const recipes = [
    {
        food: `Com Bo Luc Lac (Rice with Shaking Beef)`,
        ingredients: `boneless beef sirloin, garlic cloves, soy sauce, sugar, salt, pepper, rice, red onion, lettuce, cherry tomatoes, limes`,
        instructions: `Start by cooking 3 cups of rice using either a rice cooker or pot. While you wait for the rice to cook, start prepping the sirloin by cutting it up in 1in. cubes or however desired, mince garlic, cut red onion in half then slice, cut cherry tomatoes in half as well as one lime. Put meat in a bowl, pour as much desired soy sauce in the bowl, add sugar, pepper and salt. Mix well then let it marinate until rice is done or however desired. Once rice is done, heat up a pan, pour cooking oil in pan, wait for it to get hot then throw in minced garlic and onions. Once sizzling, put the meat in and cook until done. Make salad out of lettuce and cherry tomatoes. Squeeze lime on meat if desired and serve with salad and rice! It is supposed to have a sweet salty taste with a hint of however much lime you'd like in your meal. Enjoy!`


    },
    {
        food: `Chao Ga (Chicken Congee)`,
        ingredients: `rice, whole small chicken, chicken stock, salt, pepper, water, green onion, garlic cloves, onions`,
        instructions: `Start by making 3 cups of rice using either a rice cooker or pot. While waiting for rice to cook, fill a large stock pot with water and chicken stock and bring it to a simmer, cut the onion in half, chop up the green onions and add into the pot. Clean your chicken by rubbing salt on it and washing it off then add the whole chicken to the pot. Let it simmer on low heat for about 45 minutes. To check if chicken is done, pierce it with a sharp object. If chicken juices run clear, take it out and cut it up however you'd like. By now, the rice should be done, add it to the pot and put the chicken back in. Fry up some minced garlic to add to the congee. Season it the congee with salt and pepper as desired. Cook for another 10-15 minutes. It should have the consistency of porridge. Throw in some green onions if desired and BOOM, ya' done. Great to make when not feeling well.`,
    },
    {
        food: `Banh Xeo (Vietnamese Styled Crepes)`,
        ingredients: `eggs, rice flour, sugar, ground tumeric, bean sprouts, shrimp, coconut milk, shallots, garlic, fish sauce, salt, lettuce leaves`,
        instructions: `Mix the rice flour with some sugar, 1/2tsp of salt, some tumeric, add coconut milk to the mixture then slowly mix, adding in water bit by bit until consistency is of thin crepe batter. Heat up a skillet with thin layer of cooking oil and fry up some minced garlic and shallots until your kitchen fills with the fragrance but not browned, usually takes 1-2mins. Saute shrimp in skillet, season with splash of fish sauce, salt and pepper as desired. Once finished with the filling, place in a bowl then wipe down skillet to start on crepe. Pour 1/2 of the crepe mix then stir on bottom, layer it several times then add filling, fold over and then take the filled crepe out onto a plate. Vwala, yummy savory crepe! It is customary to eat it with your hands, so wrap some lattuce around the crepe, dip in fish sauce and eat away!`
    }

];

module.exports = {
    getRecipes: (req, res) => {
        const {food} = req.query;
        if(food) {
            let matchingRecipe = recipes.filter(recipe => recipe.food.includes(food));
            res.status(200).send(matchingRecipe);
        } else {
            res.status(200).send(recipes);
        }
    },

    createRecipes: (req, res) => {
        const {food, ingredients, instructions} = req.body;
        recipes.push({
            food,
            ingredients,
            instructions,
        });
        res.status(200).send(recipes);
    },

    updateRecipe(req, res) {
        const {food} = req.params;
        const {ingredients, instructions} = req.body;

        let specRecipe = recipes.findIndex(recipe => recipe.food.includes(food));
        let foundRecipe = recipes[specRecipe];

        foundRecipe = {
            food: foundRecipe.food,
            ingredients: ingredients || foundRecipe.ingredients,
            instructions: instructions || foundRecipe.instructions,
        }
        recipes.splice(specRecipe, 1, foundRecipe);
        res.status(200).send(recipes);
    },

    deleteRecipe(req, res) {
        const {food} = req.params;
        const specRecipe = recipes.findIndex(recipe => recipe.food.includes(food));
        recipes.splice(specRecipe, 1);

        res.status(200).send(recipes)
    },

};