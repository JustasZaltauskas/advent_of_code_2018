const fs = require('fs');
const recipesLimit = fs.readFileSync('input', 'utf-8')
    .split('\n')
    .map(Number)[0];
const recipesToCount = 10;
// indices in the recipes array
const recipes = [3, 7];
let elves = [0, 1];

while (recipes.length < recipesLimit + 10) {
    const recipe = elves.reduce((r, x) => r + recipes[x], 0);
    recipe.toString().split('').forEach(r => recipes.push(Number(r)));
    elves = elves.map(e => (((1 + recipes[e] + e) % recipes.length)));
}

console.log(recipes.slice(recipesToCount).join(''));
