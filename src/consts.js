const parsedCookies = document.cookie.split(';').reduce((res, c) => {
    const [key, val] = c.trim().split('=').map(decodeURIComponent)
    try {
        return Object.assign(res, { [key]: JSON.parse(val) })
    }
    catch (e) {
        return Object.assign(res, { [key]: val })
    }
}, {});

const baseDiet = {
    highProtein: {
      ingredients: {
        eggs: { grams: 300, protein: 36, fat: 20, carbs: 0 },
        chickenBreast: { grams: 200, protein: 62, fat: 3, carbs: 0 },
        salmon: { grams: 150, protein: 30, fat: 20, carbs: 0 },
        quinoa: { grams: 100, protein: 4, fat: 2, carbs: 21 },
        broccoli: { grams: 100, protein: 3, fat: 0, carbs: 7 },
      },
      meals: {
        breakfast: 'Egg white omelette with spinach',
        lunch: 'Grilled chicken breast with quinoa and broccoli',
        dinner: 'Baked salmon with a side of asparagus',
      },
    },
    balanced: {
      ingredients: {
        yogurt: { grams: 200, protein: 10, fat: 5, carbs: 20 },
        turkey: { grams: 100, protein: 29, fat: 1, carbs: 0 },
        avocado: { grams: 100, protein: 2, fat: 15, carbs: 9 },
        mixedSalad: { grams: 200, protein: 5, fat: 0, carbs: 10 },
        brownRice: { grams: 150, protein: 3, fat: 1, carbs: 34 },
      },
      meals: {
        breakfast: 'Greek yogurt with honey and mixed berries',
        lunch: 'Turkey and avocado wrap with mixed salad',
        dinner: 'Stir-fried tofu with brown rice and vegetables',
      },
    },
    vegetarian: {
      ingredients: {
        chiaSeeds: { grams: 50, protein: 5, fat: 3, carbs: 15 },
        chickpeas: { grams: 150, protein: 10, fat: 3, carbs: 30 },
        lentils: { grams: 100, protein: 9, fat: 0, carbs: 20 },
        brownRice: { grams: 150, protein: 3, fat: 1, carbs: 34 },
        mixedVegetables: { grams: 200, protein: 5, fat: 0, carbs: 10 },
      },
      meals: {
        breakfast: 'Chia seed pudding with almond milk and banana',
        lunch: 'Chickpea salad with brown rice',
        dinner: 'Vegetable curry with lentils and brown rice',
      },
    },
    keto: {
      ingredients: {
        eggs: { grams: 200, protein: 26, fat: 17, carbs: 1 },
        bacon: { grams: 100, protein: 37, fat: 42, carbs: 0 },
        cauliflower: { grams: 300, protein: 12, fat: 0, carbs: 15 },
        shrimp: { grams: 150, protein: 36, fat: 1, carbs: 1 },
        zucchini: { grams: 200, protein: 2, fat: 0, carbs: 8 },
      },
      meals: {
        breakfast: 'Avocado and bacon omelette',
        lunch: 'Cauliflower rice stir-fry with shrimp',
        dinner: 'Zucchini noodles with pesto and grilled chicken',
      },
    },
    lazy: {
      ingredients: {
        banana: { grams: 100, protein: 1, fat: 0, carbs: 27 },
        spinach: { grams: 50, protein: 1, fat: 0, carbs: 1 },
        proteinPowder: { grams: 30, protein: 24, fat: 1, carbs: 3 },
        hummus: { grams: 100, protein: 8, fat: 6, carbs: 14 },
        pasta: { grams: 200, protein: 7, fat: 1, carbs: 42 },
      },
      meals: {
        breakfast: 'Smoothie with banana, spinach, and protein powder',
        lunch: 'Wrap with hummus and vegetables',
        dinner: 'Pasta with marinara sauce and a side salad',
      },
    },
    paleo: {
      ingredients: {
        steak: { grams: 250, protein: 62, fat: 32, carbs: 0 },
        sweetPotatoes: { grams: 150, protein: 2, fat: 0, carbs: 30 },
        mixedVegetables: { grams: 200, protein: 5, fat: 0, carbs: 10 },
        eggs: { grams: 200, protein: 26, fat: 17, carbs: 1 },
        nuts: { grams: 30, protein: 6, fat: 15, carbs: 5 },
      },
      meals: {
        breakfast: 'Scrambled eggs with vegetables',
        lunch: 'Grilled steak with sweet potatoes and greens',
        dinner: 'Roasted chicken with mixed vegetables',
      },
    },
    mediterranean: {
      ingredients: {
        fish: { grams: 150, protein: 30, fat: 10, carbs: 0 },
        oliveOil: { grams: 30, protein: 0, fat: 30, carbs: 0 },
        vegetables: { grams: 200, protein: 5, fat: 0, carbs: 10 },
        chickpeas: { grams: 150, protein: 10, fat: 3, carbs: 30 },
        wholeGrainBread: { grams: 100, protein: 8, fat: 1, carbs: 49 },
      },
      meals: {
        breakfast: 'Greek yogurt with honey and walnuts',
        lunch: 'Chickpea salad with olive oil dressing',
        dinner: 'Grilled fish with roasted vegetables and whole grain bread',
      },
    },
  };

export {parsedCookies, baseDiet};