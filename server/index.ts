import "dotenv/config";
import { createServer } from "http";
import app from "./app";

// Local development server
const port = parseInt(process.env.PORT || "5000", 10);
const server = createServer(app);

server.listen({
  port,
  host: "0.0.0.0",
}, () => {
  console.log(`serving on port ${port}`);
});
