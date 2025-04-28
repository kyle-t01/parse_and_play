# lambda funtions
resource "aws_lambda_function" "lf" {
  function_name = "parse_and_play_lf"
  handler       = "index.handler"
  runtime       = "nodejs22.x"
  role          = aws_iam_role.lf_iam.arn
  filename         = data.archive_file.lf_zip.output_path
  source_code_hash = data.archive_file.lf_zip.output_base64sha256
}

# url and config
resource "aws_lambda_function_url" "lf_url" {
    function_name = aws_lambda_function.lf.function_name
    authorization_type = "NONE"
    cors {
        allow_origins     = ["http://parse-and-play.s3-website-ap-southeast-2.amazonaws.com"]
        allow_methods     = ["GET", "POST"]
    allow_headers     = ["content-type"]
    allow_credentials = false
    }
}