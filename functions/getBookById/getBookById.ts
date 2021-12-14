import { AppSyncResolverHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Book, QueryGetBookByIdArgs } from '../../types/books';

const docClient = new DynamoDB.DocumentClient();
export const handler: AppSyncResolverHandler<QueryGetBookByIdArgs, Book | null> = async (event) => { 

    try {
        if (!process.env.BOOKS_TABLE) {
            console.error("Books table was not defined");
            return null;
        }

        const id = event.arguments.bookId;
        
        const book = await docClient.get({
            TableName: process.env.BOOKS_TABLE,
            Key: {
                id
            }
        }).promise();
        
        return book.Item as Book;
    } catch (error) {
        console.error("An error has occurred", error);
        return null;
     }
};