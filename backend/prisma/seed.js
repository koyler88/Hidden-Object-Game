const prisma = require('../db/prismaClient');

const levels = [
  {
    name: 'Office Supplies',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Office-Collage_smaller_tumjl7.svg',
    category: 'OFFICE',
    objectOneX: 0,
    objectOneY: 0,
    objectTwoX: 0,
    objectTwoY: 0,
    objectThreeX: 0,
    objectThreeY: 0,
  },
  {
    name: 'Food',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422381/food-collage_smaller_mojfad.svg',
    category: 'FOOD',
    objectOneX: 0,
    objectOneY: 0,
    objectTwoX: 0,
    objectTwoY: 0,
    objectThreeX: 0,
    objectThreeY: 0,
  },
  {
    name: 'Hotel Facilities',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Hotel-Icons-Collage_smaller_gqjrzb.svg',
    category: 'HOTEL',
    objectOneX: 0,
    objectOneY: 0,
    objectTwoX: 0,
    objectTwoY: 0,
    objectThreeX: 0,
    objectThreeY: 0,
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
