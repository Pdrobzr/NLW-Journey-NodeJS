import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import * as dotenv from 'dotenv';
import { dayjs } from "../lib/dayjs";

dotenv.config();

const port = process.env.PORT;

export async function getLinks(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/links', {
        schema: {
            params: z.object({
                tripId: z.string().uuid(),
            }),
        },
    }, async (req) => {
        
        const { tripId } = req.params;

        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            include: { 
                links: true   
            },
        });

        if(!trip) {
            throw new Error("Trip not found");
        }

        return { links: trip.links }
    });
}