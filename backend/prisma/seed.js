const prisma = require("../db/prismaClient");

const levels = [
  {
    name: "Office Supplies",
    imageUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Office-Collage_smaller_tumjl7.svg",
    category: "OFFICE",
    objectOneName: "Tape",
    objectOneX: 61,
    objectOneY: 75,
    objectOneUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682467/tape-svgrepo-com_u3erm5.svg",
    objectTwoName: "Paper Clip",
    objectTwoX: 30,
    objectTwoY: 69,
    objectTwoUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682467/clip-svgrepo-com_nw57tt.svg",
    objectThreeName: "Stapler Remover",
    objectThreeX: 82,
    objectThreeY: 34,
    objectThreeUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682467/stapler-remover-svgrepo-com_v2hrvz.svg",
  },
  {
    name: "Food",
    imageUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754422381/food-collage_smaller_mojfad.svg",
    category: "FOOD",
    objectOneName: "Fish",
    objectOneX: 90,
    objectOneY: 58,
    objectOneUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682493/fish-svgrepo-com_qzpam8.svg",
    objectTwoName: "Peach",
    objectTwoX: 58,
    objectTwoY: 63,
    objectTwoUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682492/peach-svgrepo-com_hy2cck.svg",
    objectThreeName: "Cherry",
    objectThreeX: 51,
    objectThreeY: 72,
    objectThreeUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682493/cherry-svgrepo-com_smvpwr.svg",
  },
  {
    name: "Hotel Facilities",
    imageUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754422382/Hotel-Icons-Collage_smaller_gqjrzb.svg",
    category: "HOTEL",
    objectOneName: "Safe",
    objectOneX: 3,
    objectOneY: 62,
    objectOneUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682524/safe-svgrepo-com_avxaoz.svg",
    objectTwoName: "Alarm Clock",
    objectTwoX: 48,
    objectTwoY: 46,
    objectTwoUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682524/morning-call-svgrepo-com_z5ohws.svg",
    objectThreeName: "Toilet Paper",
    objectThreeX: 60,
    objectThreeY: 18,
    objectThreeUrl:
      "https://res.cloudinary.com/drromn4sx/image/upload/v1754682524/toilet-paper-svgrepo-com_khksbt.svg",
  },
];

async function main() {
  console.log("🌱 Seeding levels...");

  for (const level of levels) {
    await prisma.game.create({ data: level });
  }

  console.log("✅ Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
