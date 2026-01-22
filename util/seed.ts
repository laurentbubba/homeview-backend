// Execute: npx ts-node util/seed.ts

import { Category } from '../model/category';
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import pg, { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const main = async () => {
    // Clean up existing data
    await prisma.task.deleteMany();
    await prisma.recipe.deleteMany();
    await prisma.category.deleteMany();
    await prisma.recipeType.deleteMany();
    await prisma.ingredient.deleteMany();

    // ============ TASKS AND CATEGORIES ============
    const houseChores = await prisma.category.create({
        data: {
            name: 'House Chores',
            description: 'Everything that needs to be done in the house, short and longterm',
        },
    });
    
    const houseChoresObjectId = houseChores.id;

    const cleanDishes = await prisma.task.create({
        data: {
            name: 'Clean the dishes',
            description: 'Clean the pans, the pots and other kitchenware.',
            categoryId: houseChoresObjectId,
            isFinished: false
        },
    });

    const sweepFloor = await prisma.task.create({
        data: {
            name: 'Sweep the floor',
            description: 'First sweep the floor with the broom and then vacuum for perfection.',
            categoryId: houseChoresObjectId,
            isFinished: false
        },
    });

    const brushTeeth = await prisma.task.create({
        data: {
            name: 'Brush my teeth',
            description: 'Brush teeth real cleaaaaaaaaaaannn.',
            categoryId: houseChoresObjectId,
            isFinished: false
        },
    });

    const doLaundry = await prisma.task.create({
        data: {
            name: 'Do laundry',
            description: 'Wash, dry, and fold all dirty clothes.',
            categoryId: houseChoresObjectId,
            isFinished: false
        },
    });

    const vacuum = await prisma.task.create({
        data: {
            name: 'Vacuum the carpets',
            description: 'Vacuum all carpeted areas thoroughly.',
            categoryId: houseChoresObjectId,
            isFinished: false
        },
    });

    // ============ WORK CATEGORY ============
    const work = await prisma.category.create({
        data: {
            name: 'Work',
            description: 'Work-related tasks and projects',
        },
    });

    const workObjectId = work.id;

    await prisma.task.create({
        data: {
            name: 'Complete project proposal',
            description: 'Finish writing and review the Q1 project proposal document.',
            categoryId: workObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Team meeting preparation',
            description: 'Prepare slides and agenda for weekly team standup.',
            categoryId: workObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Code review',
            description: 'Review pull requests from team members.',
            categoryId: workObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Update documentation',
            description: 'Update API documentation for new endpoints.',
            categoryId: workObjectId,
            isFinished: false
        },
    });

    // ============ STUDYING CATEGORY ============
    const studying = await prisma.category.create({
        data: {
            name: 'Studying',
            description: 'Learning and educational tasks',
        },
    });

    const studyingObjectId = studying.id;

    await prisma.task.create({
        data: {
            name: 'Read TypeScript handbook',
            description: 'Continue reading advanced TypeScript patterns chapter.',
            categoryId: studyingObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Complete online course module',
            description: 'Finish module 5 of the web development course.',
            categoryId: studyingObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Practice coding exercises',
            description: 'Solve 10 LeetCode problems for algorithm practice.',
            categoryId: studyingObjectId,
            isFinished: false
        },
    });

    // ============ CHRISTMAS CATEGORY ============
    const christmas = await prisma.category.create({
        data: {
            name: 'Christmas',
            description: 'Holiday preparation and celebration tasks',
        },
    });

    const christmasObjectId = christmas.id;

    await prisma.task.create({
        data: {
            name: 'Buy Christmas gifts',
            description: 'Purchase gifts for family members before December 15.',
            categoryId: christmasObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Decorate the house',
            description: 'Put up Christmas decorations, tree, and lights.',
            categoryId: christmasObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Prepare Christmas dinner',
            description: 'Plan menu and shop for ingredients for Christmas dinner.',
            categoryId: christmasObjectId,
            isFinished: false
        },
    });

    await prisma.task.create({
        data: {
            name: 'Send holiday cards',
            description: 'Write and send Christmas cards to friends and family.',
            categoryId: christmasObjectId,
            isFinished: false
        },
    });

    // ============ RECIPES AND INGREDIENTS ============
    const mainCourse = await prisma.recipeType.create({
        data: {
            name: 'main course',
            description: 'Main dishes for meals',
        },
    });

    const pastaCarbo = await prisma.recipe.create({
        data: {
            name: 'Pasta Carbonara',
            type: { connect: { id: mainCourse.id } },
            cookingDescription: '1. Cook pasta in salted boiling water until al dente. 2. Fry bacon until crispy and chop. 3. Mix eggs with grated Parmesan. 4. Drain pasta, reserve pasta water. 5. Toss hot pasta with bacon, then remove from heat. 6. Add egg mixture quickly while tossing to create creamy sauce. 7. Add pasta water as needed for consistency. 8. Season with salt and pepper. Serve immediately.',
            ingredients: {
                create: [
                    { name: 'Spaghetti', quantity: 400, unit: 'grams' },
                    { name: 'Bacon', quantity: 200, unit: 'grams' },
                    { name: 'Eggs', quantity: 4, unit: 'pieces' },
                    { name: 'Parmesan Cheese', quantity: 100, unit: 'grams' },
                    { name: 'Salt', quantity: 10, unit: 'grams' },
                    { name: 'Black Pepper', quantity: 5, unit: 'grams' },
                ]
            }
        }
    });

    const chickenStir = await prisma.recipe.create({
        data: {
            name: 'Chicken Stir Fry',
            type: { connect: { id: mainCourse.id } },
            cookingDescription: '1. Cut chicken into bite-sized pieces. 2. Chop vegetables. 3. Heat oil in a wok or large pan over high heat. 4. Stir fry chicken until cooked through. 5. Add vegetables and stir fry for 3-4 minutes. 6. Add soy sauce and garlic, mix well. 7. Cook for another minute. 8. Serve hot with rice.',
            ingredients: {
                create: [
                    { name: 'Chicken Breast', quantity: 500, unit: 'grams' },
                    { name: 'Bell Peppers', quantity: 2, unit: 'pieces' },
                    { name: 'Broccoli', quantity: 200, unit: 'grams' },
                    { name: 'Soy Sauce', quantity: 60, unit: 'ml' },
                    { name: 'Garlic', quantity: 3, unit: 'cloves' },
                    { name: 'Vegetable Oil', quantity: 30, unit: 'ml' },
                    { name: 'Ginger', quantity: 1, unit: 'tablespoon' },
                ]
            }
        }
    });

    const dessert = await prisma.recipeType.create({
        data: {
            name: 'dessert',
            description: 'Sweet treats and desserts',
        },
    });

    const chocolateCake = await prisma.recipe.create({
        data: {
            name: 'Chocolate Cake',
            type: { connect: { id: dessert.id } },
            cookingDescription: '1. Preheat oven to 175°C. 2. Mix flour, cocoa powder, sugar, and baking powder. 3. Add eggs, milk, and oil. 4. Beat until smooth. 5. Pour into greased pan. 6. Bake for 30-35 minutes until a toothpick comes out clean. 7. Cool before serving.',
            ingredients: {
                create: [
                    { name: 'Flour', quantity: 200, unit: 'grams' },
                    { name: 'Cocoa Powder', quantity: 50, unit: 'grams' },
                    { name: 'Sugar', quantity: 200, unit: 'grams' },
                    { name: 'Eggs', quantity: 3, unit: 'pieces' },
                    { name: 'Milk', quantity: 240, unit: 'ml' },
                    { name: 'Vegetable Oil', quantity: 120, unit: 'ml' },
                    { name: 'Baking Powder', quantity: 2, unit: 'teaspoons' },
                    { name: 'Vanilla Extract', quantity: 1, unit: 'teaspoon' },
                ]
            }
        }
    });

    const appetizer = await prisma.recipeType.create({
        data: {
            name: 'appetizer',
            description: 'Small dishes served before the main course',
        },
    });

    const vegetableSoup = await prisma.recipe.create({
        data: {
            name: 'Vegetable Soup',
            type: { connect: { id: appetizer.id } },
            cookingDescription: '1. Chop all vegetables. 2. Heat olive oil in a pot and sauté onions. 3. Add carrots and celery, cook for 5 minutes. 4. Add potatoes and vegetable broth. 5. Bring to boil, then simmer for 20 minutes. 6. Add spinach and tomatoes. 7. Season with salt, pepper, and herbs. 8. Simmer for another 5 minutes. Serve hot.',
            ingredients: {
                create: [
                    { name: 'Carrots', quantity: 3, unit: 'pieces' },
                    { name: 'Potatoes', quantity: 4, unit: 'pieces' },
                    { name: 'Onion', quantity: 1, unit: 'piece' },
                    { name: 'Celery', quantity: 2, unit: 'stalks' },
                    { name: 'Spinach', quantity: 100, unit: 'grams' },
                    { name: 'Tomatoes', quantity: 3, unit: 'pieces' },
                    { name: 'Vegetable Broth', quantity: 1000, unit: 'ml' },
                    { name: 'Olive Oil', quantity: 30, unit: 'ml' },
                    { name: 'Salt', quantity: 5, unit: 'grams' },
                    { name: 'Black Pepper', quantity: 2, unit: 'grams' },
                ]
            }
        }
        
    })

    const beefTacos = await prisma.recipe.create({
        data: {
            name: 'Beef Tacos',
            type: { connect: { id: mainCourse.id } },
            cookingDescription: '1. Brown ground beef in a skillet over medium-high heat. 2. Drain excess fat. 3. Add taco seasoning and water, simmer for 5 minutes. 4. Warm taco shells in the oven. 5. Shred lettuce and dice tomatoes. 6. Assemble tacos by layering beef, cheese, lettuce, and tomatoes. 7. Serve with sour cream and salsa.',
            ingredients: {
                create: [
                    { name: 'Ground Beef', quantity: 500, unit: 'grams' },
                    { name: 'Taco Shells', quantity: 8, unit: 'pieces' },
                    { name: 'Taco Seasoning', quantity: 30, unit: 'grams' },
                    { name: 'Cheddar Cheese', quantity: 150, unit: 'grams' },
                    { name: 'Lettuce', quantity: 100, unit: 'grams' },
                    { name: 'Tomatoes', quantity: 2, unit: 'pieces' },
                    { name: 'Sour Cream', quantity: 100, unit: 'ml' },
                ]
            }
        }
    });

    const salmonAsparagus = await prisma.recipe.create({
        data: {
            name: 'Baked Salmon with Asparagus',
            type: { connect: { id: mainCourse.id } },
            cookingDescription: '1. Preheat oven to 200°C. 2. Place salmon fillets and trimmed asparagus on a baking sheet. 3. Drizzle with olive oil and lemon juice. 4. Season with minced garlic, salt, and dill. 5. Bake for 12-15 minutes until salmon flakes easily with a fork. 6. Serve with lemon wedges.',
            ingredients: {
                create: [
                    { name: 'Salmon Fillets', quantity: 2, unit: 'pieces' },
                    { name: 'Asparagus', quantity: 250, unit: 'grams' },
                    { name: 'Lemon', quantity: 1, unit: 'piece' },
                    { name: 'Olive Oil', quantity: 20, unit: 'ml' },
                    { name: 'Garlic', quantity: 2, unit: 'cloves' },
                    { name: 'Dried Dill', quantity: 1, unit: 'teaspoon' },
                ]
            }
        }
    });

    const mushroomRisotto = await prisma.recipe.create({
        data: {
            name: 'Mushroom Risotto',
            type: { connect: { id: mainCourse.id } },
            cookingDescription: '1. Warm vegetable broth in a pot. 2. Sauté mushrooms in butter until brown, then set aside. 3. Sauté onions and garlic, then add Arborio rice and toast for 2 minutes. 4. Add a ladle of broth, stirring constantly until absorbed. 5. Repeat until rice is creamy and cooked. 6. Stir in mushrooms, parmesan, and butter. 7. Season with salt and pepper.',
            ingredients: {
                create: [
                    { name: 'Arborio Rice', quantity: 300, unit: 'grams' },
                    { name: 'Mixed Mushrooms', quantity: 400, unit: 'grams' },
                    { name: 'Vegetable Broth', quantity: 1200, unit: 'ml' },
                    { name: 'Onion', quantity: 1, unit: 'piece' },
                    { name: 'Parmesan Cheese', quantity: 50, unit: 'grams' },
                    { name: 'Butter', quantity: 40, unit: 'grams' },
                    { name: 'White Wine', quantity: 100, unit: 'ml' },
                ]
            }
        }
    });

    const MargheritaPizza = await prisma.recipe.create({
        data: {
            name: 'Pizza Margherita',
            type: { connect: { id: mainCourse.id } },
            cookingDescription: '1. Preheat oven to 250°C. 2. Roll out pizza dough on a floured surface. 3. Spread tomato sauce over dough. 4. Place fresh mozzarella slices evenly. 5. Bake for 8-10 minutes until crust is golden and cheese bubbled. 6. Remove from oven and top with fresh basil leaves and a drizzle of olive oil.',
            ingredients: {
                create: [
                    { name: 'Pizza Dough', quantity: 1, unit: 'piece' },
                    { name: 'Tomato Sauce', quantity: 150, unit: 'ml' },
                    { name: 'Fresh Mozzarella', quantity: 125, unit: 'grams' },
                    { name: 'Fresh Basil', quantity: 10, unit: 'leaves' },
                    { name: 'Extra Virgin Olive Oil', quantity: 15, unit: 'ml' },
                ]
            }
        }
    });
    
    const appleCrumble = await prisma.recipe.create({
        data: {
            name: 'Apple Crumble',
            type: { connect: { id: dessert.id } },
            cookingDescription: '1. Preheat oven to 190°C. 2. Peel, core, and slice apples. 3. Toss apples with sugar and cinnamon, place in a baking dish. 4. Mix flour, oats, brown sugar, and cold butter until it looks like crumbs. 5. Sprinkle topping over apples. 6. Bake for 35-40 minutes until golden brown. 7. Serve warm with vanilla ice cream.',
            ingredients: {
                create: [
                    { name: 'Apples', quantity: 4, unit: 'pieces' },
                    { name: 'Flour', quantity: 150, unit: 'grams' },
                    { name: 'Rolled Oats', quantity: 100, unit: 'grams' },
                    { name: 'Butter', quantity: 100, unit: 'grams' },
                    { name: 'Brown Sugar', quantity: 100, unit: 'grams' },
                    { name: 'Cinnamon', quantity: 1, unit: 'teaspoon' },
                ]
            }
        }
    });

    const pannaCotta = await prisma.recipe.create({
        data: {
            name: 'Vanilla Panna Cotta',
            type: { connect: { id: dessert.id } },
            cookingDescription: '1. Bloom gelatin in cold water. 2. Heat cream, sugar, and vanilla in a saucepan (do not boil). 3. Stir in the softened gelatin until dissolved. 4. Pour mixture into ramekins. 5. Refrigerate for at least 4 hours. 6. Serve with a berry coulis or fresh fruit.',
            ingredients: {
                create: [
                    { name: 'Heavy Cream', quantity: 500, unit: 'ml' },
                    { name: 'Sugar', quantity: 50, unit: 'grams' },
                    { name: 'Gelatin Sheets', quantity: 3, unit: 'pieces' },
                    { name: 'Vanilla Bean', quantity: 1, unit: 'piece' },
                    { name: 'Mixed Berries', quantity: 100, unit: 'grams' },
                ]
            }
        }
    });

    const tiramisu = await prisma.recipe.create({
        data: {
            name: 'Classic Tiramisu',
            type: { connect: { id: dessert.id } },
            cookingDescription: '1. Whisk egg yolks and sugar until pale. 2. Fold in mascarpone cheese. 3. Dip ladyfingers quickly in cold espresso. 4. Layer dipped ladyfingers in a dish. 5. Spread half the cream mixture over them. 6. Repeat layering. 7. Dust heavily with cocoa powder. 8. Chill for 6 hours before serving.',
            ingredients: {
                create: [
                    { name: 'Mascarpone Cheese', quantity: 500, unit: 'grams' },
                    { name: 'Ladyfingers', quantity: 24, unit: 'pieces' },
                    { name: 'Espresso', quantity: 300, unit: 'ml' },
                    { name: 'Sugar', quantity: 100, unit: 'grams' },
                    { name: 'Eggs', quantity: 4, unit: 'pieces' },
                    { name: 'Cocoa Powder', quantity: 20, unit: 'grams' },
                ]
            }
        }
    });

    const berrySmoothieBowl = await prisma.recipe.create({
        data: {
            name: 'Fruit & Berry Bowl',
            type: { connect: { id: dessert.id } },
            cookingDescription: '1. Slice bananas and strawberries. 2. Place yogurt in a bowl. 3. Arrange fruit and berries on top in rows. 4. Sprinkle with granola and honey. 5. Add a garnish of mint leaves. 6. Serve immediately as a light dessert or breakfast.',
            ingredients: {
                create: [
                    { name: 'Greek Yogurt', quantity: 250, unit: 'grams' },
                    { name: 'Strawberries', quantity: 100, unit: 'grams' },
                    { name: 'Blueberries', quantity: 50, unit: 'grams' },
                    { name: 'Banana', quantity: 1, unit: 'piece' },
                    { name: 'Granola', quantity: 30, unit: 'grams' },
                    { name: 'Honey', quantity: 1, unit: 'tablespoon' },
                ]
            }
        }
    });

    // await prisma.schedule.deleteMany();
    // await prisma.course.deleteMany();
    // await prisma.lecturer.deleteMany({});
    // await prisma.user.deleteMany();

    // const fullStack = await prisma.course.create({
    //     data: {
    //         name: 'Full-stack development',
    //         description: 'Learn how to build a full stack web application.',
    //         phase: 2,
    //         credits: 6,
    //     },
    // });

    // const softwareEngineering = await prisma.course.create({
    //     data: {
    //         name: 'Software Engineering',
    //         description: 'Learn how to build and deploy a software application.',
    //         phase: 2,
    //         credits: 6,
    //     },
    // });

    // const frontEnd = await prisma.course.create({
    //     data: {
    //         name: 'Front-end Development',
    //         description: 'Learn how to build a front-end web application.',
    //         phase: 1,
    //         credits: 6,
    //     },
    // });

    // const backEnd = await prisma.course.create({
    //     data: {
    //         name: 'Back-end Development',
    //         description: 'Learn how to build a REST-API in a back-end application.',
    //         phase: 1,
    //         credits: 6,
    //     },
    // });

    // const admin = await prisma.user.create({
    //     data: {
    //         username: 'admin',
    //         password: 'admin123',
    //         firstName: 'admin',
    //         lastName: '',
    //         email: 'administration@ucll.be',
    //     },
    // });

    // const lecturerJP = await prisma.lecturer.create({
    //     data: {
    //         expertise: 'Full-stack development, Front-end development',
    //         user: {
    //             create: {
    //                 username: 'johanp',
    //                 password: 'johanp123',
    //                 firstName: 'Johan',
    //                 lastName: 'Pieck',
    //                 email: 'johan.pieck@ucll.be',
    //             },
    //         },
    //         courses: {
    //             connect: [{ id: fullStack.id }, { id: frontEnd.id }],
    //         },
    //     },
    // });

    // const lecturerES = await prisma.lecturer.create({
    //     data: {
    //         expertise: 'Software Engineering, Back-end Development',
    //         user: {
    //             create: {
    //                 username: 'elkes',
    //                 password: 'elkes123',
    //                 firstName: 'Elke',
    //                 lastName: 'Steegmans',
    //                 email: 'elke.steegmans@ucll.be',
    //             },
    //         },
    //         courses: {
    //             connect: [{ id: fullStack.id }, { id: softwareEngineering.id }],
    //         },
    //     },
    // });

    // const lecturerGJ = await prisma.lecturer.create({
    //     data: {
    //         expertise: 'Full-stack development, Back-end Development',
    //         user: {
    //             create: {
    //                 username: 'greetjej',
    //                 password: await bcrypt.hash('greetjej123', 12),
    //                 firstName: 'Greetje',
    //                 lastName: 'Jongen',
    //                 email: 'greetje.jongen@ucll.be',
    //             },
    //         },
    //         courses: {
    //             connect: [{ id: fullStack.id }, { id: backEnd.id }],
    //         },
    //     },
    // });

    // await prisma.schedule.create({
    //     data: {
    //         start: set(new Date(), { hours: 8, minutes: 30 }),
    //         end: set(new Date(), { hours: 10, minutes: 30 }),
    //         course: {
    //             connect: { id: fullStack.id },
    //         },
    //     },
    // });

    // await prisma.schedule.create({
    //     data: {
    //         start: set(new Date(), { hours: 13, minutes: 30 }),
    //         end: set(new Date(), { hours: 15, minutes: 30 }),
    //         course: {
    //             connect: { id: fullStack.id },
    //         },
    //     },
    // });

    // await prisma.schedule.create({
    //     data: {
    //         start: set(new Date(), { hours: 13, minutes: 30 }),
    //         end: set(new Date(), { hours: 15, minutes: 30 }),
    //         course: {
    //             connect: { id: softwareEngineering.id },
    //         },
    //     },
    // });

    // await prisma.schedule.create({
    //     data: {
    //         start: set(new Date(), { hours: 10, minutes: 45 }),
    //         end: set(new Date(), { hours: 12, minutes: 45 }),
    //         course: {
    //             connect: { id: backEnd.id },
    //         },
    //     },
    // });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
