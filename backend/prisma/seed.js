const prisma = require('../db/prismaClient');

const levels = [
  {
    name: 'Office Supplies',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Office-Collage_smaller_tumjl7.svg',
    category: 'OFFICE',
    objectOneX: 482,
    objectOneY: 602,
    objectTwoX: 236,
    objectTwoY: 546,
    objectThreeX: 650,
    objectThreeY: 272,
  },
  {
    name: 'Food',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422381/food-collage_smaller_mojfad.svg',
    category: 'FOOD',
    objectOneX: 719,
    objectOneY: 464,
    objectTwoX: 464,
    objectTwoY: 502,
    objectThreeX: 408,
    objectThreeY: 571,
  },
  {
    name: 'Hotel Facilities',
    imageUrl: 'https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Hotel-Icons-Collage_smaller_gqjrzb.svg',
    category: 'HOTEL',
    objectOneX: 25,
    objectOneY: 493,
    objectTwoX: 382,
    objectTwoY: 367,
    objectThreeX: 476,
    objectThreeY: 148,
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
