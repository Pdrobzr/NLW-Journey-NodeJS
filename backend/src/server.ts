import fastify from "fastify";
import cors from '@fastify/cors';
import { createTrip } from "./routes/create-trip";
import * as dotenv from 'dotenv';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/confirm-trip";

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


app.listen({port}).then(() => {
    console.log(`Server rodando na porta ${port}`)
});