const fs = require('fs');
const recipesLimit = fs.readFileSync('input', 'utf-8')
    .split('\n')
    .map(Number)[0];
// indices in the recipes array
const recipes = [3, 7];
let elves = [0, 1];
const isPart1 = false;

if (isPart1) {
    const recipesToCount = 10;

    while (recipes.length < recipesLimit + recipesToCount) {
        const recipe = elves.reduce((r, x) => r + recipes[x], 0);
        recipe.toString().split('').forEach(r => recipes.push(Number(r)));
        elves = elves.map(e => (((1 + recipes[e] + e) % recipes.length)));
    }

    console.log(recipes.slice(-recipesToCount).join(''));
} else {
    const recipiesLimitStr = recipesLimit.toString();
    let found = false;

    while (!found) {
        const recipe = elves.reduce((r, x) => r + recipes[x], 0);
    
        recipe.toString().split('').forEach(r => {
            if (recipes.slice(-recipiesLimitStr.length).join('') === recipiesLimitStr) {
                found = true;
                console.log(recipes.length - recipiesLimitStr.length);
            }
            recipes.push(Number(r));
        });
    
        elves = elves.map(e => ((1 + recipes[e] + e) % recipes.length));
    }
}    
