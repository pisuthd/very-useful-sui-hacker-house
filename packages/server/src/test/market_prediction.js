import { expect } from "chai"
import RagChain from "../core/ragChain.js"

let chain

describe('#market_prediction()', function () {

    before(function () {
        chain = new RagChain()
    })

    it('should submit jobs success', async function () {

        expect(1).to.equal(1)

        await chain.addJob({
            task: "query",
            account: "test@gmail.com",
            resources: [
                "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"
            ],
            system_prompt: "You are an AI agent tasked with delivering insights for outcome segmentation in DeFi market predictions. Use the provided context to generate your response. \n\nContext: {context}",
            tasks: [
                {
                    id: "task-btc-prediction",
                    value: "Based on the current BTC price fetched from Pyth Oracle, suggest outcome ranges. For example: A: <$60,000, B: $60,000-$70,000, C: $70,000-$80,000, D: >$80,000."
                }
            ]
        })

        const savedJobs = await chain.listJobs()
        expect( savedJobs.length ).to.equal(1)
    })

    it('should execute jobs success', async function () {
        
        await chain.executeJobs()

        const reports = await chain.getReport("test@gmail.com")
        expect(reports.length).to.equal(1)
    })

    after(async function () {
        await chain.destroy()
    })

})