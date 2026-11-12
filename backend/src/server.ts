
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


app.post("/reservations", async (req, res) => {
  try {
    const { userId, roomId, start, end, purpose } = req.body;

    // Preverjanje obveznih podatkov
    if (
      typeof userId !== "string" ||
      typeof roomId !== "string" ||
      typeof start !== "string" ||
      typeof end !== "string" ||
      (purpose !== undefined && typeof purpose !== "string")
    ) {
      return res.status(400).json({
        error: "Manjkajo ali so neveljavni podatki.",
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

    // Preverjanje uporabnika in sobe
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const room = await prisma.room.findFirst({
      where: { id: roomId, isActive: true },
    });

    if (!user || !room) {
      return res.status(404).json({
        error: "Uporabnik ali soba ne obstaja.",
      });
    }

    // Preverjanje razpoložljivosti in shranjevanje
    const reservation = await prisma.$transaction(
      async (tx) => {
        const conflicts = await tx.reservation.count({
          where: {
            roomId,
            status: "CONFIRMED",
            startTime: { lt: endTime },
            endTime: { gt: startTime },
          },
        });

        const blocked = await tx.blockedSlot.count({
          where: {
            roomId,
            startTime: { lt: endTime },
            endTime: { gt: startTime },
          },
        });

        if (conflicts > 0 || blocked > 0) {
          throw new Error("SLOT_TAKEN");
        }

        return tx.reservation.create({
          data: {
            userId,
            roomId,
            startTime,
            endTime,
            purpose: purpose ?? null,
            status: "CONFIRMED",
          },
        });
      },
      { isolationLevel: "Serializable" }
    );

    return res.status(201).json(reservation);

  } catch (error) {
    if (error instanceof Error && error.message === "SLOT_TAKEN") {
      return res.status(409).json({
        error: "Soba je v izbranem terminu zasedena.",
      });
    }

    // Morebiten konflikt sočasnih transakcij
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2034"
    ) {
      return res.status(409).json({
        error: "Termin je treba ponovno preveriti. Poskusi znova.",
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Napaka pri ustvarjanju rezervacije.",
    });
  }
});


app.get("/users/:userId/reservations", async (req, res) => {
  try {
    const userId = String(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        error: "Uporabnik ne obstaja.",
      });
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        room: {
          select: {
            name: true,
            building: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Napaka pri pridobivanju rezervacij.",
    });
  }
});


app.patch("/reservations/:id", async (req, res) => {
  try {
    const id = String(req.params.id);
    const { userId, start, end, purpose } = req.body;

    if (
      typeof userId !== "string" ||
      typeof start !== "string" ||
      typeof end !== "string" ||
      typeof purpose !== "string"
    ) {
      return res.status(400).json({
        error: "Neveljavni podatki.",
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

    const updated = await prisma.$transaction(
      async (tx) => {
        const reservation = await tx.reservation.findFirst({
          where: { id, userId, status: "CONFIRMED" },
        });

        if (!reservation) {
          throw new Error("NOT_FOUND");
        }

        const conflicts = await tx.reservation.count({
          where: {
            id: { not: id },
            roomId: reservation.roomId,
            status: "CONFIRMED",
            startTime: { lt: endTime },
            endTime: { gt: startTime },
          },
        });

        const blocked = await tx.blockedSlot.count({
          where: {
            roomId: reservation.roomId,
            startTime: { lt: endTime },
            endTime: { gt: startTime },
          },
        });

        if (conflicts > 0 || blocked > 0) {
          throw new Error("SLOT_TAKEN");
        }

        return tx.reservation.update({
          where: { id },
          data: { startTime, endTime, purpose },
        });
      },
      { isolationLevel: "Serializable" }
    );

    return res.json(updated);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") {
        return res.status(404).json({
          error: "Aktivna rezervacija ne obstaja.",
        });
      }

      if (error.message === "SLOT_TAKEN") {
        return res.status(409).json({
          error: "Soba je v izbranem terminu zasedena.",
        });
      }
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2034"
    ) {
      return res.status(409).json({
        error: "Konflikt pri shranjevanju. Poskusi znova.",
      });
    }

    console.error(error);
    return res.status(500).json({
      error: "Napaka pri urejanju rezervacije.",
    });
  }
});


app.patch("/reservations/:id/cancel", async (req, res) => {
  try {
    const id = String(req.params.id);
    const { userId } = req.body;

    if (typeof userId !== "string") {
      return res.status(400).json({
        error: "Manjka ID uporabnika.",
      });
    }

    const result = await prisma.reservation.updateMany({
      where: {
        id,
        userId,
        status: "CONFIRMED",
      },
      data: {
        status: "CANCELLED",
      },
    });

    if (result.count === 0) {
      return res.status(404).json({
        error: "Aktivna rezervacija ne obstaja.",
      });
    }

    return res.json({
      message: "Rezervacija je preklicana.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Napaka pri preklicu rezervacije.",
    });
  }
});

app.listen(port, () => {
  console.log(`RoomFlow API: http://localhost:${port}`);
});
