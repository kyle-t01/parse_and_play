# static website bucket, currently uses existing s3 bucket
resource "aws_s3_bucket" "app" {
  bucket        = "parse-and-play-2"
  force_destroy = true
}

# configure it as a website
resource "aws_s3_bucket_website_configuration" "app_website" {
  bucket = aws_s3_bucket.app.id
  index_document {
    suffix = "index.html"
  }
}


# allow public access
resource "aws_s3_bucket_public_access_block" "app" {
  bucket                  = aws_s3_bucket.app.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# public read policy
resource "aws_s3_bucket_policy" "app_public_read" {
  bucket = aws_s3_bucket.app.id

  depends_on = [
    aws_s3_bucket_public_access_block.app
  ]

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "PublicReadGetObject",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.app.arn}/*"
      }
    ]
  })
}