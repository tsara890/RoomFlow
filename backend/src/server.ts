
import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

app.get("/", (_req, res) => {
  res.json({ message: "RoomFlow API deluje" });
});

// preveri povezavo z db
app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "OK",
      database: "connected",
    });
  } catch {
    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
    });
  }
});

app.listen(port, () => {
  console.log(`RoomFlow API: http://localhost:${port}`);
});
