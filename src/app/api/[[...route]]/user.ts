import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", (c) => {
    return c.json({ user: "GET"})
  })
  .get("/:name", (c) => {
    const params = c.req.param();

    return c.json({ user: params.name}, 200)
  })

export default app;