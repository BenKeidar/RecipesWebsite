export const sample_foods: any[] = [
    {
        id: 1,
        name: 'בגט',
        ingredients: ['קמח','מים','מלח'],
        doughIng: [],
        sauceIng: [],
        tags: ['Bread'],
        favorite: false,
        instructions: ['ללוש. לאפות.'], 
        imageUrl: './assets/images/food-1.jpg',
        origins: ['צרפת'],
        cookTime: '10-20',
        link: "",
      },
      {
        id: 2,
        name: 'פיצה',
        ingredients: ['גבינה'],
        doughIng: ['קמח','מים'],
        sauceIng: ['רוטב'],
        tags: ['לחם', 'מאפה'],
        favorite: false,
        instructions: ["מכניסים את האטריות לקערה גדולה ושופכים מים רותחים עד כיסוי. מערבבים וממתינים 5-10 דקות. מוודאים שהאטריות רכות, ואם לא - משאירים אותן עוד 5 דקות בקערה. מסננים את המים. כדי שהאטריות לא יידבקו עד שהמרק מוכן, מזלפים מעל כמה טיפות שמן שומשום או שמן רגיל ומערבבים.",
        "קוצצים דק את השום ומגררים את הג'ינג'ר על החלק הדק בפומפייה.","מסירים את גרגירי התירס מהקלחים.", "מחממים שמן בסיר גדול ומטגנים את השום והג'ינג'ר כשתי דקות. מוסיפים קארי ומטגנים עוד 2-3 דקות."], 
        imageUrl: './assets/images/food-2.jpg',
        origins: ['איטליה'],
        cookTime: '25-30',
        link: "https://www.youtube.com/watch?v=nAMD6re5BjM",
      }
]

export const sample_foods2: any[] = [
  {
      id: 1,
      name: 'Pizza Pepperoni',
      cookTime: '10-20',
      price: 10,
      favorite: false,
      origins: ['italy'],
      stars: 4.5,
      imageUrl: './assets/images/food-1.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
    },
    {
      id: 2,
      name: 'Meatball',
      price: 20,
      cookTime: '20-30',
      favorite: true,
      origins: ['persia', 'middle east', 'china'],
      stars: 4.7,
      imageUrl: './assets/images/food-2.jpg',
      tags: ['SlowFood', 'Lunch'],
    },
    {
      id: 3,
      name: 'Hamburger',
      price: 5,
      cookTime: '10-15',
      favorite: false,
      origins: ['germany', 'us'],
      stars: 3.5,
      imageUrl: './assets/images/food-3.jpg',
      tags: ['FastFood', 'Hamburger'],
    },
    {
      id: 4,
      name: 'Fried Potatoes',
      price: 2,
      cookTime: '15-20',
      favorite: true,
      origins: ['belgium', 'france'],
      stars: 3.3,
      imageUrl: './assets/images/food-4.jpg',
      tags: ['FastFood', 'Fry'],
    },
    {
      id: 5,
      name: 'Chicken Soup',
      price: 11,
      cookTime: '40-50',
      favorite: false,
      origins: ['india', 'asia'],
      stars: 3.0,
      imageUrl: './assets/images/food-5.jpg',
      tags: ['SlowFood', 'Soup'],
    },
    {
      id: 6,
      name: 'Vegetables Pizza',
      price: 9,
      cookTime: '40-50',
      favorite: false,
      origins: ['italy'],
      stars: 4.0,
      imageUrl: './assets/images/food-6.jpg',
      tags: ['FastFood', 'Pizza', 'Lunch'],
    }
]

export const sample_tags:any[] = [
  { name: 'All', count: 14},
  { name: 'FastFood', count: 4},
  { name: 'Pizza', count: 2},
  { name: 'Lunch', count: 3},
  { name: 'SlowFood', count: 2},
  { name: 'Hamburger', count: 1},
  { name: 'Fry', count: 1},
  { name: 'Soup', count: 1}
]

export const sample_users:any[] = [
  { 
    name: "Ben Keidar", 
    email: "benkeidar123@gmail.com",
    password: "123456",
    address: "Jerusalem",
    isAdmin: true
  },
  { 
    name: "John Doe", 
    email: "john@gmail.com",
    password: "123456",
    address: "Tel aviv",
    isAdmin: false
  }
]