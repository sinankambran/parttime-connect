// import axios from 'axios';


// const dataset = [
//     "company_name: Parttime Connect",
//     "founded_date: 2024-12-11",
//     "founders: Abdul Basith, Muhammed Sinan",
//     "ceo: Abdul Basith",
//     "location.state: Kerala",
//     "location.city: Perinthalmanna",
//     "employees: 200",
//     "mission: Providing an AI-powered job-seeking and recruiting platform inspired by LinkedIn.",
//     "key_features: AI-powered job matching, Scalable architecture, Top-notch UI/UX, Real-time notifications, Secure authentication (OAuth, JWT)",
//     "revenue_model.subscription_plans: Basic (Free), Premium ($9.99/month), Enterprise (Custom)",
//     "revenue_model.ad_revenue: true",
//     "revenue_model.recruiter_premium_access: true",
//     "financials.profit_turnover: $2M estimated in first year",
//     "financials.total_shares: 1000000",
//     "financials.share_value: $5 per share",
//     "financials.investors: Angel Investors, Venture Capital Firms",
//     "technical_architecture.frontend.framework: React.js",
//     "technical_architecture.frontend.state_management: Redux",
//     "technical_architecture.frontend.UI_library: Tailwind CSS",
//     "technical_architecture.frontend.SSR: false",
//     "technical_architecture.backend.framework: Node.js",
//     "technical_architecture.backend.API_layer: Express.js",
//     "technical_architecture.backend.database: MongoDB (Atlas)",
//     "technical_architecture.backend.authentication: OAuth 2.0, JWT",
//     "technical_architecture.backend.caching: Redis",
//     "technical_architecture.backend.microservices.user_management: Handles authentication and user profiles",
//     "technical_architecture.backend.microservices.job_matching: AI-powered recommendation engine",
//     "technical_architecture.backend.microservices.notifications: Real-time push notifications using WebSockets",
//     "technical_architecture.backend.microservices.analytics: Tracks user engagement and trends",
//     "technical_architecture.scalability.load_balancer: NGINX + AWS ALB",
//     "technical_architecture.scalability.autoscaling: Horizontal Scaling with Kubernetes",
//     "technical_architecture.scalability.CDN: Cloudflare",
//     "technical_architecture.scalability.server_hosting: AWS EC2 & Lambda (Serverless Functions)",
//     "traffic_statistics.daily_active_users: 50000",
//     "traffic_statistics.monthly_visits: 1500000",
//     "traffic_statistics.server_requests_per_second: 1000"
// ]



// async function searchDocument(query) {

//     const relevantText = await findMostRelevantEntry(query);

//     // Step 2: Generate a response based on the retrieved text and the query
//     const response = await generateText(`${relevantText} ${query}`);
//     return response;


//     //first main function
//     // to find the most relevent data entry from the dataset array
    
//     async function findMostRelevantEntry(query) {
//         // Get the embedding for the query
//         const queryEmbedding = await getEmbeddings(query);

//         // Get embeddings for all dataset entries
//         const datasetEmbeddings = await Promise.all(dataset.map(getEmbeddings));

//         // Calculate cosine similarity between the query and each dataset entry
//         let mostRelevantIndex = 0;
//         let highestSimilarity = -1;

//         for (let i = 0; i < datasetEmbeddings.length; i++) {
//             const similarity = cosineSimilarity(queryEmbedding, datasetEmbeddings[i]);
//             if (similarity > highestSimilarity) {
//                 highestSimilarity = similarity;
//                 mostRelevantIndex = i;
//             }
//         }

//         return dataset[mostRelevantIndex];
//     }




//     //to convert to embedding function 
//     async function getEmbeddings(text) {
//         const data = await queryHuggingFace("sentence-transformers/all-MiniLM-L6-v2", text);
//         return data[0];
//     }


//     function cosineSimilarity(vecA, vecB) {
//         let dotProduct = 0;
//         let normA = 0;
//         let normB = 0;

//         for (let i = 0; i < vecA.length; i++) {
//             dotProduct += vecA[i] * vecB[i];
//             normA += vecA[i] * vecA[i];
//             normB += vecB[i] * vecB[i];
//         }

//         return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
//     }

//     //second main function
//     //it is used to generate a morebeautifullly text with info from the dataset
//     async function generateText(prompt) {
//         const data = await queryHuggingFace("distilbert/distilgpt2", prompt);
//         return data[0].generated_text;
//     }


//     //api call function
//     async function queryHuggingFace(model, inputs) {
//         const response = await axios.post(
//             `https://api-inference.huggingface.co/models/${model}`,
//             { inputs },
//             { headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` } }
//         );
//         return response.data;
//     }

// }


// async function queryLLM(prompt) {
//     console.log(`prompt is ${prompt}`)
//     try {
//         const response = await axios.post(
//             `https://api-inference.huggingface.co/models/${process.env.LLM_MODEL}`,
//             { inputs: prompt },
//             { headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` } }
//         );
//         console.log(`The response is: ${JSON.stringify(response.data, null, 2)}`);

//         return response.data;
//     } catch (error) {
//         console.error("Error querying LLM:");
//         return { generated_text: "AI model is currently unavailable. Please try again later." };
//     }
// }



// export const getChatbotResponse = async (req, res) => {
//     try {
//         const userQuery = req.body.message;
//         console.log(`user message is ${userQuery}`)
//         let responseText = '';

//         const docSearch = await searchDocument(userQuery)
//         if (Array.isArray(docSearch) && docSearch.length > 0) {
//             responseText = `From our company data: ${docSearch[0].generated_text}`;
//         } else {
//             const aiResponse = await queryLLM(userQuery);
//             responseText = aiResponse[0].generated_text || "Sorry, I couldn't find an answer.";

//             return res.status(200).json({
//                 message: "Response generated successfully",
//                 response: responseText,
//                 success: true,
//             });


//         }
//     } catch (error) {
//         console.error("Error in getChatbotResponse:", error);
//         return res.status(500).json({
//             message: "Internal server error",
//             success: false,
//         });
//     }
// };



import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dataset = [
    "company_name: Parttime Connect",
    "founded_date: 2024-12-11",
    "founders: Abdul Basith, Muhammed Sinan",
    "ceo: Abdul Basith",
    "location.state: Kerala",
    "location.city: Perinthalmanna",
    "employees: 200",
    "mission: Providing an AI-powered job-seeking and recruiting platform inspired by LinkedIn.",
    "key_features: AI-powered job matching, Scalable architecture, Top-notch UI/UX, Real-time notifications, Secure authentication (OAuth, JWT)",
    "revenue_model.subscription_plans: Basic (Free), Premium ($9.99/month), Enterprise (Custom)",
    "revenue_model.ad_revenue: true",
    "revenue_model.recruiter_premium_access: true",
    "financials.profit_turnover: $2M estimated in first year",
    "financials.total_shares: 1000000",
    "financials.share_value: $5 per share",
    "financials.investors: Angel Investors, Venture Capital Firms",
    "technical_architecture.frontend.framework: React.js",
    "technical_architecture.frontend.state_management: Redux",
    "technical_architecture.frontend.UI_library: Tailwind CSS",
    "technical_architecture.frontend.SSR: false",
    "technical_architecture.backend.framework: Node.js",
    "technical_architecture.backend.API_layer: Express.js",
    "technical_architecture.backend.database: MongoDB (Atlas)",
    "technical_architecture.backend.authentication: OAuth 2.0, JWT",
    "technical_architecture.backend.caching: Redis",
    "technical_architecture.backend.microservices.user_management: Handles authentication and user profiles",
    "technical_architecture.backend.microservices.job_matching: AI-powered recommendation engine",
    "technical_architecture.backend.microservices.notifications: Real-time push notifications using WebSockets",
    "technical_architecture.backend.microservices.analytics: Tracks user engagement and trends",
    "technical_architecture.scalability.load_balancer: NGINX + AWS ALB",
    "technical_architecture.scalability.autoscaling: Horizontal Scaling with Kubernetes",
    "technical_architecture.scalability.CDN: Cloudflare",
    "technical_architecture.scalability.server_hosting: AWS EC2 & Lambda (Serverless Functions)",
    "traffic_statistics.daily_active_users: 50000",
    "traffic_statistics.monthly_visits: 1500000",
    "traffic_statistics.server_requests_per_second: 1000"
];

async function searchDocument(query) {
    try {
        const relevantText = await findMostRelevantEntry(query);
        const response = await generateText(`${relevantText} ${query}`);
        return response;
    } catch (error) {
        console.error("Error in searchDocument:", error);
        throw error;
    }

    async function findMostRelevantEntry(query) {
        const queryEmbedding = await getEmbeddings(query);
        const datasetEmbeddings = await Promise.all(dataset.map(getEmbeddings));

        let mostRelevantIndex = 0;
        let highestSimilarity = -1;

        for (let i = 0; i < datasetEmbeddings.length; i++) {
            const similarity = cosineSimilarity(queryEmbedding, datasetEmbeddings[i]);
            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                mostRelevantIndex = i;
            }
        }

        return dataset[mostRelevantIndex];
    }

    async function getEmbeddings(text) {
        try{
            const data = await queryHuggingFace("sentence-transformers/all-MiniLM-L6-v2", text);
            console.log("The response is from get embedding:", response.data);
    
            return data[0];
        }catch(err){
            console.log('the errror at getembeding ',err)

        }
       
    }

    function cosineSimilarity(vecA, vecB) {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;

        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    async function generateText(prompt) {
        const data = await queryHuggingFace("distilgpt2", prompt); // Use distilgpt2 for text generation
        return data[0].generated_text;
    }

    async function queryHuggingFace(model, inputs) {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            { inputs },
            { headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` } }
        );
        return response.data;
    }
}

async function queryLLM(prompt) {
    console.log(`prompt is ${prompt}`);
    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${process.env.LLM_MODEL}`,
            { inputs: prompt },
            { headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` } }
        );
        console.log(`The response is: ${JSON.stringify(response.data, null, 2)}`);
        return response.data;
    } catch (error) {
        console.error("Error querying LLM:", error);
        return { generated_text: "AI model is currently unavailable. Please try again later." };
    }
}

export const getChatbotResponse = async (req, res) => {
    try {
        const userQuery = req.body.message;
        console.log(`user message is ${userQuery}`);

        let responseText = '';
        const docSearch = await searchDocument(userQuery);

        if (docSearch) {
            responseText = `From our company data: ${docSearch}`;
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
        console.error("Error in getChatbotResponse:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};