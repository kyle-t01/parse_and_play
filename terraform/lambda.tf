# lambda funtions
resource "aws_lambda_function" "lf" {
  function_name    = "parse_and_play_lf"
  handler          = "index.handler"
  runtime          = "nodejs22.x"
  role             = aws_iam_role.lf_iam.arn
  filename         = data.archive_file.lf_zip.output_path
  source_code_hash = data.archive_file.lf_zip.output_base64sha256

  environment {
    variable = {
      DB_NAME = aws_dynamodb_table.db.name
    }
  }
}

# url and config
resource "aws_lambda_function_url" "lf_url" {
  function_name      = aws_lambda_function.lf.function_name
  authorization_type = "NONE"
  cors {
    allow_origins     = ["http://${aws_s3_bucket_website_configuration.app.website_endpoint}"]
    allow_methods     = ["GET", "POST"]
    allow_headers     = ["content-type"]
    allow_credentials = false
  }
}