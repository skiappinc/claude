function fillRecipeForm() {

  const f = (s, v) => {
    const el = document.querySelector(s);
    if (el) el.value = v;
  };

  const p = t => t.split('\n').map(x => `<p>${x}</p>`).join('');

  const n = t => t.split('\n').map((x, i) => `<p>${i + 1}. ${x}</p>`).join('');

  const g = {
    description: "A lightly sweet crumb and a simple honey-butter finish make this cornbread especially tender.",
    ingredients: p(`For the Cornbread:
1/2 cup (1 stick) salted butter
1 1/4 cups all-purpose flour
3/4 cup cornmeal
1 tablespoon baking powder
1/2 cup granulated sugar
1 cup buttermilk, room temperature
1/2 cup honey
2 large eggs, room temperature
1 tablespoon vanilla extract
1/3 cup canola or vegetable oil
Shortening, for preparing the skillet
For the Honey Butter Glaze:
1/4 cup salted butter
1/4 cup honey
2 tablespoons powdered sugar, optional
Pinch of salt`),
    instructions: n(`Preheat the oven to 375°F.
Melt the butter in a saucepan over medium heat until it turns golden brown and gives off a nutty aroma. Set aside to cool slightly.
In a large bowl, whisk together the flour, cornmeal, baking powder, and granulated sugar.
In another bowl, whisk together the buttermilk, honey, eggs, vanilla extract, oil, and the cooled browned butter until smooth.
Gradually add the wet ingredients to the dry ingredients, stirring until just combined. A few lumps are fine.
Coat a cast iron skillet with shortening and preheat it in the oven for 4 to 5 minutes.
Carefully pour the batter into the hot skillet and spread it evenly.
Bake for 20 to 24 minutes, until golden on top and a toothpick inserted in the center comes out with just a few moist crumbs.
Remove the cornbread from the oven and, while it's still warm, poke small holes across the top with a toothpick.
For the glaze, melt the butter and honey together in a saucepan over low heat. Stir in the powdered sugar, if using, and a pinch of salt until smooth.
Pour the glaze evenly over the warm cornbread, letting it soak into the holes.
Serve warm.`),
    notes: p(`Store at room temperature in an airtight container for up to 3 days.
Store in the refrigerator, tightly covered, for up to 5 days.
Freeze wrapped individual slices for up to 3 months.`)
  };

  for (const k in g) {
    const ed = window.tinyMCE?.get(`tasty-recipes-recipe-${k}`);
    if (ed) ed.setContent(g[k]);
  }

  [
    "prep_time",
    "cook_time",
    "total_time",
    "yield",
    "category",
    "method",
    "cuisine",
    "keywords",
    "diet",
    "serving_size",
    "calories",
    "sugar",
    "sodium",
    "fat",
    "saturated_fat",
    "unsaturated_fat",
    "trans_fat",
    "cholesterol",
    "carbohydrates",
    "fiber",
    "protein"
  ].forEach(k => {

    f(`[name="${k}"]`, ({
      prep_time: "15 minutes",
      cook_time: "25 minutes",
      total_time: "45 minutes",
      yield: "8 servings",
      category: "Side Dish",
      method: "Baking",
      cuisine: "Southern American",
      keywords: "honey butter cornbread, southern cornbread, cast iron cornbread",
      diet: "",
      serving_size: "1 slice",
      calories: "556",
      sugar: "43 g",
      sodium: "346 mg",
      fat: "30 g",
      saturated_fat: "",
      unsaturated_fat: "",
      trans_fat: "",
      cholesterol: "",
      carbohydrates: "69 g",
      fiber: "",
      protein: "6 g"
    })[k]);

  });

}

fillRecipeForm();
