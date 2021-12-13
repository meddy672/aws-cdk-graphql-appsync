import { AppSyncResolverHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

type Book = {
    id: string;
    title: string;
    completed?: string;
    rating?: string;
    reviews?: string[];
};

const docClient = new DynamoDB.DocumentClient()
export const handler: AppSyncResolverHandler<null, Book[] | null> = async () => {
    try {
        if (!process.env.BOOKS_TABLE) {
            console.error("Books table was not defined");
            return null;
        }

        const data = await docClient.scan({
            TableName: process.env.BOOKS_TABLE
        }).promise();

        return data.Items as Book[];
    } catch (err: any) {
        console.error("Database error occured", err.message);
        return null;
     }
}