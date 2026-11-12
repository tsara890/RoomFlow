
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

app.get("/rooms", async (_req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        building: true,
        floor: true,
        capacity: true,
        equipment: true,
      },
    });

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Napaka pri pridobivanju sob",
    });
  }
});


app.get("/rooms/:id/availability", async (req, res) => {
  try {
    const roomId = String(req.params.id);
    const { start, end } = req.query;

    if (typeof start !== "string" || typeof end !== "string") {
      return res.status(400).json({
        error: "Podati moraš začetni in končni čas.",
      });
    }

    const startTime = new Date(start);
    const endTime = new Date(end);

    if (
      isNaN(startTime.getTime()) ||
      isNaN(endTime.getTime()) ||
      startTime >= endTime
    ) {
      return res.status(400).json({
        error: "Neveljaven časovni interval.",
      });
    }

    const room = await prisma.room.findFirst({
      where: { id: roomId, isActive: true },
    });

    if (!room) {
      return res.status(404).json({
        error: "Soba ne obstaja ali ni aktivna.",
      });
    }

    const reservations = await prisma.reservation.count({
      where: {
        roomId,
        status: "CONFIRMED",
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });

    const blockedSlots = await prisma.blockedSlot.count({
      where: {
        roomId,
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    });

    res.json({
      roomId,
      available: reservations === 0 && blockedSlots === 0,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Napaka pri preverjanju razpoložljivosti.",
    });
  }
});

app.listen(port, () => {
  console.log(`RoomFlow API: http://localhost:${port}`);
});
