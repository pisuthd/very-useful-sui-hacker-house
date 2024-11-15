import express from "express";
import cors from "cors"
import * as fastq from "fastq";
import cron from "node-cron"
import RagChain from "./core/ragChain.js"

export const app = express()

const chain = new RagChain()

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(cors())

// Queue

// Setup a worker
const onWorker = async (args) => {

    const { task } = args

    console.log("Worker started...")

    try {
        switch (task) {
            case "query":
                await chain.executeJobs()
                break
        }
    } catch (e) {
        console.log(e)
    }

    console.log("Worker done.")
}

// Queue
const queue = fastq.promise(onWorker, 1)

// Routes

// Health check route to verify if the server is running
app.get('/', async (req, res) => {
    return res.status(200).json({ status: "ok" });
})

app.post("/submit", async (req, res) => {

    const { body } = req
    const { account, resources, system_prompt, tasks  } = body

    try {

        await chain.addJob({
            task: "query",
            account,
            resources,
            system_prompt,
            tasks
        })

        return res.status(200).json({ status: "ok" });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: "error", message: e.message })
    }

})

// get all jobs

app.get("/jobs", async (req, res) => {

    try {

        const savedJobs = await chain.listJobs()

        return res.status(200).json({
            status: "ok", jobs: savedJobs.map((item) => {
                return {
                    account: item.account,
                    resources: item.resources,
                    system_prompt: item.system_prompt,
                    total_tasks: item.tasks.length,
                    timestamp: item.timestamp
                }
            })
        })
    } catch (e) {
        return res.status(500).json({ status: "error", message: e.message })
    }

})

// get reports

app.get("/report/:account", async (req, res) => {

    const { params } = req
    const { account } = params

    try {
        return res.status(200).json({ status: "ok", reports: await chain.getReport(account) })
    } catch (e) {
        return res.status(500).json({ status: "error", message: e.message })
    }
})

// Execute jobs 

const executeJobs = async () => {

    queue.push({
        task: "query"
    })

}

cron.schedule('*/1 * * * *', executeJobs)