import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkServerlessStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // Lambdaを作成する
    const lambdaFunc = new lambda.Function(this, 'CdkServerlessLambda', {
      runtime: lambda.Runtime.NODEJS_16_X, // ランタイムにはNode.js 16.xを指定
      code: lambda.Code.fromAsset('lambda'), // lambdaディレクトリにあるコードを指定
      handler: 'index.handler', // ハンドラを指定する。index.jsのhandlerを指定。
    });

    // API Gatewayを作成する
    const apigw = new apigateway.RestApi(this, 'CdkServerlessApi', {
      restApiName: 'CdkServerlessApi', // API名を指定
      defaultIntegration: new apigateway.LambdaIntegration(lambdaFunc) // Lambda統合を指定する
    });

    // リソースを追加する
    const helloResource = apigw.root.addResource('hello'); // /hello リソースが作成される
    helloResource.addMethod('GET'); // this maps to the GET method of the Lambda function by default
  }
}
