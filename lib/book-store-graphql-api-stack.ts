import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';

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
      xrayEnabled: true
    })
  }
}
