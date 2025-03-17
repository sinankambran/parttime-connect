
import axios from 'axios';
import dotenv from 'dotenv';
import { Job } from "../models/job.model.js";
import { Dataset } from "../models/dataset.model.js";
import mongoose from 'mongoose';


// Load environment variables
dotenv.config();

let dataset = null;
let isDatasetLoaded = false;

// Database connection with caching mechanism
async function initializeDatabase() {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000
            });

            // Load dataset once after connection
            await refreshDataset();
        }
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit if initial connection fails
    }
}

// Call initialization on server start
initializeDatabase().catch(console.error);

// Function to refresh dataset (call when needed)
async function refreshDataset() {
    try {
        const result = await Dataset.findOne({}).maxTimeMS(10000);
        dataset = result?.data || [];
        isDatasetLoaded = true;
        console.log('Dataset refreshed successfully');
    } catch (error) {
        console.error('Error refreshing dataset:', error);
        throw error;
    }
}




async function searchDocument(query) {

    try {
        if (!isDatasetLoaded) {
            await refreshDataset();
        }
        const [relevantText, similarityScore] = await findMostRelevantEntry(query);
        const response = await generateText(relevantText, query, similarityScore);
        return response;
    } catch (error) {
        console.error("Error in searchDocument:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        throw error;
    }

    // 1. Find most relevant entry using Hugging Face similarity API
    async function findMostRelevantEntry(query) {
        try {
            // Get similarity scores from Hugging Face API
            const similarityScores = await queryHuggingFace(
                "sentence-transformers/all-mpnet-base-v2",
                query,
                dataset // Pass your entire dataset array here
            );

            // Find index of highest similarity score
            let highestScore = -1;
            let mostRelevantIndex = 0;

            similarityScores.forEach((score, index) => {
                if (score > highestScore) {
                    highestScore = score;
                    mostRelevantIndex = index;
                }
            });

            console.log("Most relevant index:", mostRelevantIndex);
            console.log("Dataset entry:", dataset[mostRelevantIndex]);
            return [dataset[mostRelevantIndex], similarityScores[mostRelevantIndex]];

        } catch (error) {
            console.error("Error in findMostRelevantEntry:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
            throw error;
        }
    }

    // 2. Modified Hugging Face query function
    async function queryHuggingFace(model, sourceSentence, sentences) {
        try {
            console.log("Using API Token:", process.env.HF_API_TOKEN ? "Token is set" : "Token is missing!");

            const response = await axios.post(
                `https://api-inference.huggingface.co/models/${model}`,
                {
                    source_sentence: sourceSentence,
                    sentences: sentences
                },
                { headers: { Authorization: 'Bearer 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' } }
            );

            console.log("Similarity Scores:", response.data);
            return response.data;

        } catch (error) {
            console.error("Full error response from querying hugginface function:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
            throw error;
        }
    }

    // 3. Keep your existing generateText function
    async function generateText(datasetInfo, prompt, similarityScore) {
        try {
            const data = await hugginfaceCustomTextgeneration("mistralai/Mistral-7B-Instruct-v0.3", datasetInfo, prompt, similarityScore);
            function extractResponse(text) {
                let match = text.match(/use the dataset information.*?create a response\s+(.*)/s);
                return match ? match[1] : null;
            }
            const match = extractResponse(data[0].generated_text)
            return match
        } catch (error) {
            console.log("Error in generateText:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
            throw error;
        }
    }

    async function hugginfaceCustomTextgeneration(model, datasetInfo, prompt, similarityScore) {
        try {
            console.log("Using API Token:", process.env.HF_API_TOKEN ? "Token is set" : "Token is missing!");
            const newPrompt = `Create a response based on this query ..${prompt} .., ${datasetInfo} ..  this is the similar dataset info recived the similarityScore is ${similarityScore},analysie the similarity score also very well, if the query is a general purpose question then create response of your own (short response needed), else if the query conatins something linked with this company,this website, this startup , that measn they are reffering to the parttime connect company so use the dataset information which i provided you to create a response (short response)  `

            const response = await axios.post(
                `https://api-inference.huggingface.co/models/${model}`,

                { inputs: newPrompt },

                { headers: { Authorization: 'Bearer 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' } }
            );

            console.log("custom generated text:", response.data);
            return response.data;

        } catch (error) {
            console.error("Full error response from hugginfaceCustomTextgeneration function:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
            throw error;
        }

    }
}

async function queryLLM(prompt) {
    console.log(`prompt is ${prompt}`);
    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${process.env.LLM_MODEL}`,
            { inputs: prompt },
            { headers: { Authorization: 'Bearer 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' } }
        );
        console.log(`The response is: ${JSON.stringify(response.data, null, 2)}`);
        return response.data;
    } catch (error) {
        console.error("Error querying LLM:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        return { generated_text: "AI model is currently unavailable. Please try again later." };
    }
}

export const getChatbotResponse = async (req, res) => {
    // let datasetDB = await Dataset.findOne({});
    // const jobs = await Job.find().populate("company");
    // const jobEntries = jobs.map(
    //     (job) => `Job Title: ${job.title} | Description: ${job.description} | Company : ${job.company.name}`
    //   );
    //   datasetDB.data.push(...jobEntries);
    //   await datasetDB.save(); 
    //   console.log("database dataset",datasetDB)
    await initializeDatabase();

    try {
        const userQuery = req.body.params;
        console.log("req.body", req.body)
        console.log(`user message is from getChatbot response main function ${userQuery}`);

        let responseText = '';
        const docSearch = await searchDocument(userQuery);

        if (docSearch) {
            responseText = docSearch;
        } else {
            const aiResponse = await queryLLM(userQuery);
            responseText = aiResponse[0]?.generated_text || "Sorry, I couldn't find an answer.";
        }

        return res.status(200).json({
            message: "Response generated successfully",
            response: responseText,
            success: true,
        });
    } catch (error) {
        console.error("Error in getChatbotResponse:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};