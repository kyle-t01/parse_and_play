
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({ region: "ap-southeast-2" });

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const {invalidChords, userReport} = body;
        if (!userReport || userReport.trim() === "") {
            return respond(400, { error: "You submitted an empty report! (which shouldn't have happened!)" }); 
        }

        // auto delete in one week
        const ttlSeconds = Math.floor(Date.now() / 1000) + 7*24*60*60 
    
        const item ={
            id: { S: Date.now().toString() },
            userReport: { S: userReport },
            invalidChords: { S: JSON.stringify(invalidChords || []) },
            ttl: { N: ttlSeconds.toString() }
        }
    
        const command = new PutItemCommand({
            TableName: "BugReports",
            Item: item,
        });

        await ddb.send(command);

        return respond(200, { message: `Your report was received and saved to the database! Cheers!` });
    } catch {
        return respond(500, { error: "Failed to save report!" });
    }  
    return respond(500, { error: "Unexpected Error!" });
}




const respond = (code, data) => {
    return {
        statusCode: code,
        body: JSON.stringify(data),
    };
};

// runtime is already defined as Node.js 22.x