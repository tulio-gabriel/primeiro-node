/*import { createServer } from 'node:http';

const server = createServer((request,response) => {
	response.write("oi")
	return response.end()
});

server.listen(3333)*/

import { fastify } from "fastify";

//import { DatabaseMemory } from "./database-memory.js"
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();

server.post("/videos", async (request, response) => {
  const { title, description, duration } = request.body;

  await database.create({
    title: title,
    description: description,
    duration: duration,
  });

  console.log(database.list());

  return response.status(201).send();
});

server.get("/videos", async (request) => {
  const search = request.query.search;

  console.log(search);

  const videos = await database.list(search);

  return videos;
});

server.put("/videos/:id", async (request, response) => {
  const videoid = request.params.id;
  const { title, description, duration } = request.body;
  await database.update(videoid, {
    title,
    description,
    duration,
  });

  return response.status(204).send();
});

server.delete("/videos/:id",async (request, response) => {
  const videoid = request.params.id;
  await database.delete(videoid);

  return response.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
