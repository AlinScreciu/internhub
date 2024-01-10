import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const companies = [
  {
    name: "TechHub",
    description:
      "Leading technology company specializing in software development.",
    country: "United States",
    headquarters: "Silicon Valley",
    employees: 1000,
    domain: "Technology",
  },
  {
    name: "HealthSolutions",
    description: "Innovative healthcare solutions provider.",
    country: "Canada",
    headquarters: "Toronto",
    employees: 500,
    domain: "Healthcare",
  },
  {
    name: "GreenEnergy Co.",
    description: "Sustainable energy solutions for a better future.",
    country: "Germany",
    headquarters: "Berlin",
    employees: 200,
    domain: "Energy",
  },
  {
    name: "FashionVogue",
    description: "Trendsetting fashion company with a global presence.",
    country: "France",
    headquarters: "Paris",
    employees: 800,
    domain: "Fashion",
  },
  {
    name: "FoodMasters",
    description: "Culinary experts bringing delicious food experiences.",
    country: "Italy",
    headquarters: "Rome",
    employees: 300,
    domain: "Food",
  },
  {
    name: "SpaceTech Innovations",
    description: "Pioneering space exploration and technology advancement.",
    country: "United States",
    headquarters: "Houston",
    employees: 1200,
    domain: "Space",
  },
  {
    name: "EduTech Solutions",
    description: "Revolutionizing education through innovative technology.",
    country: "United Kingdom",
    headquarters: "London",
    employees: 600,
    domain: "Education",
  },
  {
    name: "TravelWonders",
    description: "Creating memorable travel experiences for explorers.",
    country: "Spain",
    headquarters: "Barcelona",
    employees: 400,
    domain: "Travel",
  },
  {
    name: "FinancialGenius",
    description: "Financial services company providing smart solutions.",
    country: "United States",
    headquarters: "New York",
    employees: 900,
    domain: "Finance",
  },
  {
    name: "SportsTech Dynamics",
    description: "Innovative sports technology enhancing athletic performance.",
    country: "Australia",
    headquarters: "Sydney",
    employees: 250,
    domain: "Sports",
  },
];

async function main() {
  await prisma.company.createMany({ data: companies });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
