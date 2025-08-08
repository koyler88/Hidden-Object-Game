const prisma = require('../db/prismaClient');

const levels = [
  {
    name: 'Office Supplies',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Office-Collage_smaller_tumjl7.svg',
    category: 'OFFICE',
    objectOneX: 61,
    objectOneY: 75,
    objectTwoX: 30,
    objectTwoY: 69,
    objectThreeX: 82,
    objectThreeY: 34,
  },
  {
    name: 'Food',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422381/food-collage_smaller_mojfad.svg',
    category: 'FOOD',
    objectOneX: 51,
    objectOneY: 72,
    objectTwoX: 91,
    objectTwoY: 58,
    objectThreeX: 58,
    objectThreeY: 63,
  },
  {
    name: 'Hotel Facilities',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Hotel-Icons-Collage_smaller_gqjrzb.svg',
    category: 'HOTEL',
    objectOneX: 3,
    objectOneY: 62,
    objectTwoX: 48,
    objectTwoY: 46,
    objectThreeX: 60,
    objectThreeY: 19,
  },
];

async function main() {
  console.log('🌱 Seeding levels...');

  for (const level of levels) {
    await prisma.game.create({ data: level });
  }

  console.log('✅ Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
