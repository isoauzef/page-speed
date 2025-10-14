import { createServer } from "http";

const submissions = [];
const port = Number(process.env.PORT ?? 4001);

const server = createServer((request, response) => {
  if (request.method === "POST" && request.url === "/api/contact") {
    const chunks = [];

    request
      .on("data", (chunk) => {
        chunks.push(chunk);
      })
      .on("end", () => {
        const rawBody = Buffer.concat(chunks).toString("utf8");

        try {
          const { name = "", email = "", message = "" } = JSON.parse(rawBody || "{}");
          const entry = {
            name: String(name).slice(0, 120),
            email: String(email).slice(0, 120),
            message: String(message).slice(0, 1000),
            receivedAt: new Date().toISOString()
          };

          submissions.push(entry);

          response.writeHead(200, {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"
          });
          response.end(JSON.stringify({ ok: true, stored: { name: entry.name, email: entry.email }, total: submissions.length }));
        } catch (error) {
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ ok: false, error: "Invalid JSON payload.", detail: String(error?.message ?? error) }));
        }
      });

    return;
  }

  if (request.method === "GET" && request.url === "/api/contact") {
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    });
    response.end(JSON.stringify({ ok: true, submissions }));
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ ok: false, error: "Not found" }));
});

server.listen(port, () => {
  console.log(`Mock backend listening on http://localhost:${port}`);
});
