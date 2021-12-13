import { AppSyncResolverHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Book, MutationCreateBookArgs } from '../types/books';

const docClient = new DynamoDB.DocumentClient();

export const handler: AppSyncResolverHandler<MutationCreateBookArgs, Book | null> = async (event) => {
    try {
        if (!process.env.BOOKS_TABLE) {
            console.error("Books table was not defined");
            return null;
        }

        const book = event.arguments.book;

        await docClient.put({
            TableName: process.env.BOOKS_TABLE,
            Item: book
        }).promise();

        console.log(book);

        return book;
    } catch (err) {
        console.error("Database error occured", err);
        return null;
     }
}