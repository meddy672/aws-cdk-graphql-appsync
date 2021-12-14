# Welcome to your CDK TypeScript project!

This is a Graphql API built with AWS AppSync, DynamoDB and Lambda. The application was generated using the AWS CDK CLI and uses Typescript as the development langauge. For more information on using the AWS CDK with Typescript [visit AWS Docs](https://docs.aws.amazon.com/cdk/latest/guide/work-with-cdk-typescript.html).

# Required Software
 * [Node.js](https://nodejs.org/en/)
 * [AWS CLI](https://aws.amazon.com/cli/)
 * [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/cli.html)


## Getting Started
Download or clone the repository and run npm init. This will install the needed depencies on your machine. The **lib** directory constains the stack and its constructs.
```javascript
export class BookStoreGraphqlApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Constructs
  })
}

```


The lambda function are stored within the **functions** directory. The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
