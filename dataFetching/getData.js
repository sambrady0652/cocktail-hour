const fetch = require('node-fetch')
const fs = require('fs').promises;

// NOTE: all of this data comes from The Cocktail DB (at https://www.thecocktaildb.com/api.php) -- thanks to the assistance. Go support their patreon!

async function addIngredient() {
  for (let i = 1; i <= 602; i++) {
    try {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`)
      if (!res.ok) {
        throw res
      }
      const ingredient = await res.json()
      const ingredientObj = ingredient['ingredients'][0]
      const compressedIngredient = {
        id: ingredientObj['idIngredient'],
        name: ingredientObj['strIngredient'],
        type: ingredientObj["strType"],
        alcoholic: ingredientObj["strAlcohol"]
      }
      await fs.writeFile('ingredients.js', JSON.stringify(compressedIngredient), { flag: 'a' });
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }
}

async function addDrinks() {
  try {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z`)
    if (!res.ok) {
      throw res
    }
    const drinksObj = await res.json()
    const newArr = compressArray(drinksObj)
    await fs.writeFile('drinks.js', JSON.stringify(newArr), { flag: 'a' });
  } catch (error) {
    console.error(`Got an error trying to write to a file: ${error.message}`);
  }

}

const compressArray = (drinksObj) => {
  array = drinksObj['drinks']
  const newArr = []
  for (let i = 0; i < array.length; i++) {
    const drink = array[i]
    const ingredients = makeIngArray(drink)
    const measurements = makeMeasureArray(drink)

    const compressedDrink = {
      id: drink["idDrink"],
      name: drink["strDrink"],
      alcoholic: drink["strAlcoholic"],
      instructions: drink["strInstructions"],
      image_url: drink["strDrinkThumb"],
      ingredients,
      measurements
    }

    newArr.push(compressedDrink)
  }
  return newArr
}

const makeIngArray = (drink) => {
  let arr = []
  for (let i = 1; i <= 15; i++) {
    let ing = drink[`strIngredient${i}`]
    if (ing !== null) {
      arr.push(ing)
    }
  }

  return arr
}

const makeMeasureArray = (drink) => {
  let arr = []
  for (let i = 1; i <= 15; i++) {
    let ing = drink[`strMeasure${i}`]
    if (ing !== null) {
      arr.push(ing)
    }
  }

  return arr
}


(async function () {
  await addDrinks();
})();