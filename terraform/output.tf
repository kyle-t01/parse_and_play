# lf url
output "lambda_function_url" {
  description = "URL to invoke the Lambda function directly"
  value       = aws_lambda_function_url.lf_url.function_url
}

# name of db
output "dynamodb_table_name" {
  description = "The DynamoDB table name"
  value       = aws_dynamodb_table.db.name
}

# url of frontend
output "s3_website_url" {
  description = "URL of the S3 static website hosting"
  value       = aws_s3_bucket_website_configuration.app.website_endpoint
}
