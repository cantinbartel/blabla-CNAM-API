import { PrismaClient, Role } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  const names = [
    "Jean",
    "Sophie",
    "Pierre",
    "Marie",
    "Luc",
    "Alice",
    "Thomas",
    "Emma",
    "Nicolas",
    "Julie",
    "Alexandre",
    "Manon",
    "Antoine",
    "Camille",
    "Étienne",
    "Chloé",
    "Vincent",
    "Laura",
    "Maxime",
    "Sarah",
  ];

  const cities = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Montpellier",
    "Bordeaux",
    "Lille",
    "Rennes",
    "Reims",
    "Saint-Étienne",
    "Toulon",
    "Le Havre",
    "Grenoble",
    "Dijon",
    "Angers",
    "Nîmes",
    "Aix-en-Provence",
  ];

  const fields = [
    "Informatique",
    "Mathématiques",
    "Physique",
    "Chimie",
    "Biologie",
    "Histoire",
    "Géographie",
    "Langues étrangères",
    "Littérature",
    "Philosophie",
    "Sciences économiques",
    "Sciences politiques",
    "Sociologie",
    "Psychologie",
    "Médecine",
    "Droit",
    "Économie",
    "Gestion",
    "Arts plastiques",
    "Musique",
  ];

  // Seed 20 entries for the Ara model
  for (let i = 0; i < 20; i++) {
    const araCode = uuidv4();
    const ara = await prisma.ara.create({
      data: {
        id: araCode,
        name: names[i % names.length],
        surname: `AraSurname_${i}`,
      },
    });

    // Extract the first name from the full name
    const firstName = names[i % names.length].toLowerCase();
    const username = `${firstName}_${i}`;

    // Seed 1 user for each Ara
    await prisma.user.create({
      data: {
        id: uuidv4(),
        araCode: ara.id,
        email: `${username}@example.com`,
        password: "password", // Set a default password
        role: Role.BASIC,
        centerId: uuidv4(),
        fieldId: uuidv4(),
        blackListed: false,
      },
    });
  }

  // Seed 20 entries for the Center model
  for (let i = 0; i < 20; i++) {
    await prisma.center.create({
      data: {
        id: uuidv4(),
        city: cities[i % cities.length],
        isCenter: i % 2 === 0, // Alternate between true and false
      },
    });
  }

  // Seed 20 entries for the Field model
  for (let i = 0; i < 20; i++) {
    await prisma.field.create({
      data: {
        id: uuidv4(),
        name: fields[i % fields.length],
      },
    });
  }

  // Rest of the seeding code...
}

main()
 
