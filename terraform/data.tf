# where the lambda function zip file lives
data "archive_file" "lf_zip" {
    type = "zip"
    source_dir = var.lf_path
    output_path = "${path.module}/lf_zip.zip"
}

# static website bucket, currently uses existing s3 bucket
data "aws_s3_bucket" "app" {
  bucket = "parse-and-play"
}
