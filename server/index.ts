import express, { Express, Request, Response } from 'express';
import {initTRPC} from "@trpc/server";
import {createExpressMiddleware} from "@trpc/server/adapters/express";
import cors from "cors"

const t = initTRPC.create()

const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "hi";
  }),
  logToServer: t.procedure.input(v => {
    if (typeof v === "string") return v

    throw new Error("invalid error")
  }).mutation(req => {
    console.log(`Client says ${req.input}`)
    return true
  })
})

const app: Express = express();
const port = 3000;

app.use(cors({origin: "http://localhost:5173"}))
app.use("/trpc", createExpressMiddleware({ router: appRouter}))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export type AppRouter = typeof appRouter