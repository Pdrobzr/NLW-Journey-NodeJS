import fastify from "fastify";
import cors from '@fastify/cors';
import { createTrip } from "./routes/create-trip";
import * as dotenv from 'dotenv';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";
import { confirmParticipant } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";

dotenv.config();

const app = fastify();

const port = Number(process.env.PORT);

app.register(cors, {
    origin: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);

app.listen({port}).then(() => {
    console.log(`Server rodando na porta ${port}`)
});