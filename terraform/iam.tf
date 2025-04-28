# IAM roles and policy attachments
resource "aws_iam_role" "lf_iam" {
  name = "parse-and-play-lf-role"
  path = "/service-role/"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# make new IAM policy that allows writing to db
resource "aws_iam_policy" "lf_policy" {
  name        = "parse-and-play-lf-write-policy"
  description = "Allow LF to write into dynamoDB table"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "dynamodb:PutItem"
        ],
        Resource = aws_dynamodb_table.db.arn
      }
    ]
  })
}

# attach lf_policy to role
resource "aws_iam_role_policy_attachment" "lf_iam_attach" {
  role       = aws_iam_role.lf_iam.name
  policy_arn = aws_iam_policy.lf_policy.arn
}
