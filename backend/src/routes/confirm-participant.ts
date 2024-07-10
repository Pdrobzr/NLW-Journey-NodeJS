import type { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import 'dayjs/locale/pt-br';
import { prisma } from "../lib/prisma";
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

export async function confirmParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/participants/:participantId/confirm', {
        schema: {
            params: z.object({
                participantId: z.string().uuid(),
            })
        },
    }, async (req, res) => {
        const { participantId } = req.params;

        const participant = await prisma.participant.findUnique({
            where: {
                id: participantId
            }
        });

        if(!participant) {
            throw new Error("Participant not found");
        }

        if(participant.is_confirmed) {
            return res.redirect(`http://localhost:3030/participant/${participant.trip_id}`);
        }

        await prisma.participant.update({
            where: { id: participantId },
            data: { is_confirmed: true }
        })

        return res.redirect(`http://localhost:3030/participant/${participant.trip_id}`);
    });
}