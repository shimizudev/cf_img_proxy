import { Hono } from "hono";
import { hexDecode } from "./utils";

const app = new Hono();

app.get("/", (c) => c.text("Ayoko Image Proxy"));

app.get("/images/:type/:hex", async (c) => {
  try {
    const type = c.req.param("type");
    const hex = c.req.param("hex");
    const imageUrl = hexDecode(hex);

    if(type !== "banner" && type !== "cover") {
        return c.text("Invalid type", 400);
    }
    
    const response = await fetch(imageUrl);
    const imageData = await response.arrayBuffer();

    return new Response(imageData, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=31536000"
      }
    });
  } catch (error) {
    return c.text("Error fetching image", 500);
  }
});

export default app;
