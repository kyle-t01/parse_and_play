# lf url
output "lambda_function_url" {
  description = "Lambda function URL"
  value       = aws_lambda_function_url.lf_url.function_url
}

# url of frontend
output "s3_website_url" {
  description = "URL of the S3 static website hosting"
  value       = "http://${aws_s3_bucket_website_configuration.app_website.website_endpoint}"
}

# S3 bucket name
output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.app.bucket
}