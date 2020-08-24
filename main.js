// загрузка данных
let request = new XMLHttpRequest();

// для блюд
request.open("GET","json/meals.json", false);
request.send(null);
const meals = JSON.parse(request.responseText);

// для ингредиентов
request.open("GET","json/ingredients.json", false);
request.send(null);
const ingredients = JSON.parse(request.responseText);

new Vue({
  el: '#app',
  data: {
    ingredients: ingredients,
    meals: meals,
    selectedIngredients: [],
    newIngredient: '',

  },
  methods: {
    addIngredient() {
      this.ingredients.push({name: this.newIngredient.toLowerCase(), isActive: false});
      this.newIngredient = '';
    },

    // добавляем ингредиент в массив только в том случае, если его еще нет в этом массиве,
    // иначе удаляем, для избежания повторений одних и тех же ингредиентов
    chooseIngredients(ingredient) {
      if (this.selectedIngredients.includes(ingredient.name)) {
        for (let i = 0; i < this.selectedIngredients.length; i++) {
          if (this.selectedIngredients[i] === ingredient.name) {
            this.selectedIngredients.splice(i, 1);
            i--;
          }
        }
        ingredient.isActive = false;
        console.log(`Убрали ${ingredient.name} // массив ${this.selectedIngredients}`);
      } else {
        this.selectedIngredients.push(ingredient.name);
        ingredient.isActive = true;
        console.log(`Добавили ${ingredient.name} // массив ${this.selectedIngredients}`);
      }
    },
  },
  computed: {
    // проверяем, удовлетворяют ли ВСЕ элементы массива выбранных ингрединтов условию:
    // имеет ли состав рецепта совпадение с данным(и) элементом(-ами);
    // тем самым фильтруем все рецепты, сужая круг поиска нужного рецепта по выбранным ингредиентам
    filteredMeals() {
      return this.meals.filter(meal => {
        return this.selectedIngredients.every(selectedIngredient => meal.composition.includes(selectedIngredient));
      });
    },

    filteredMealsByString() {
      return this.meals.filter((meal) => meal.composition.includes(this.newIngredient));
    },
  },
});
