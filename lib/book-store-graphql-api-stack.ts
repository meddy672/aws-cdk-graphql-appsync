import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class BookStoreGraphqlApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new appsync.GraphqlApi(this, 'BookStoreGraphqlApi', {
      name: 'BookStoreGraphqlApi',
      schema: appsync.Schema.fromAsset('./graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: "my api key",
            expires: cdk.Expiration.after(cdk.Duration.days(365)),
            
          }
        }
      },
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL
      },
      xrayEnabled: true
    });

    const booksTable = new dynamodb.Table(this, 'BooksTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const listBooksHandler = new lambda.Function(this, 'listBooksHandler', {
      code: lambda.Code.fromAsset('functions/listBooks'),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'listBooks.handler',
      memorySize: 1024,
      environment: {
        BOOKS_TABLE: booksTable.tableName,
      }
    });

    booksTable.grantReadData(listBooksHandler);

    const listBooksDataSource = api.addLambdaDataSource("listBooksDataSource", listBooksHandler);

    listBooksDataSource.createResolver({
      typeName: "Query",
      fieldName: "listBooks"
    });

    const createBookHandler = new lambda.Function(this, 'createBookHandler', {
      code: lambda.Code.fromAsset('functions/createBook'),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'createBook.handler',
      environment: {
        BOOKS_TABLE: booksTable.tableName,
      }
    });

    booksTable.grantReadWriteData(createBookHandler);

    const createBookDataSource = api.addLambdaDataSource("createBookDataSource", createBookHandler);

    createBookDataSource.createResolver({
      typeName: "Mutation",
      fieldName: "createBook"
    });

    const getBookByIdLambda = new lambda.Function(this, 'getBookByIdLambda', {
      code: lambda.Code.fromAsset('functions/GetBookById'),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'getBookById.handler',
      memorySize: 1024,
      environment: {
        BOOKS_TABLE: booksTable.tableName,
      }
    });

    booksTable.grantReadData(getBookByIdLambda);

    const getBookByIdDataSource = api.addLambdaDataSource("getBookByIdDataSource", getBookByIdLambda);

    getBookByIdDataSource.createResolver({
      typeName: "Query",
      fieldName: "getBookById"
    });
  }
}
