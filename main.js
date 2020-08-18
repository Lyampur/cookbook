const meal = (id, name, ...args) =>
            ({id, name, args});

const meals = [
  {
    id: 1,
    name: 'Овсянная каша',
    composition: ['рис', 'молоко', 'сливочное масло'],
  },
  {
    id: 2,
    name: 'Щи',
    composition: ['вода', 'капуста', 'картошка'],
  },
  {
    id: 3,
    name: 'Вода',
    composition: ['вода'],
  },
];

new Vue({
  el: '#app',
  data: {
    ingredients: [
      {name: 'вода',
       isActive: false},
       {name: 'соль',
        isActive: false},
        {name: 'сахар',
         isActive: false},
         {name: 'рис',
          isActive: false},
          {name: 'молоко',
           isActive: false},
     ],
    //ingredients: new Set(['соль', 'сахар', 'рис', 'молоко', 'вода']),
    selectedIngredients: [],
    //selectedIngredients: new Set(['вода']),
    meals: meals,
    meal: meals[0],
    newIngredient: '',

  },
  methods: {
    addIngredient() {
      this.ingredients.push({name: this.newIngredient.toLowerCase(), isActive: false});
      //this.ingredients.add(this.newIngredient.toLowerCase());
      this.newIngredient = '';
    },

    // для Set
    // chooseIngredients(ingredient) {
    //   if (this.selectedIngredients.has(ingredient)) {
    //     this.selectedIngredients.delete(ingredient);
    //     console.log(`Убрали ${ingredient} // массив ${Array.from(this.selectedIngredients)}`);
    //   } else {
    //     this.selectedIngredients.add(ingredient);
    //     console.log(`Добавили ${ingredient} // массив ${Array.from(this.selectedIngredients)}`);
    //   }
    // },

    // для Array
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
