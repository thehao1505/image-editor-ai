import { replicate } from "@/lib/replicate";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .post(
    "/remove-bg",
    zValidator("json", z.object({ image: z.string() })),
    async (c) => {
      const { image } = c.req.valid("json");

      const input = {
        image: image,
      };

      const output: unknown = await replicate.run(
        "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        { input }
      );

      const res = output as string;

      return c.json({ data: res });
    }
  )
  .post(
    "/generate-image",
    zValidator(
      "json",
      z.object({
        prompt: z.string(),
      })
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");

      const input = {
        cfg: 3.5,
        steps: 28,
        prompt: prompt,
        aspect_ratio: "3:2",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85,
      };

      const output = await replicate.run("stability-ai/stable-diffusion-3", {
        input,
      });

      const res = output as Array<string>;

      return c.json({ data: res[0] });
    }
  );

export default app;