# IAM roles and policy attachments
resource "aws_iam_role" "lf_iam" {
  name = "dataset-splitter-backend-role-wj5wzz8l"
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

# attach LFwriteToDB policy to lf_iam (existing policy for now)
resource "aws_iam_role_policy_attachment" "lf_iam_attach" {
  role       = aws_iam_role.lf_iam.name
  policy_arn = "arn:aws:iam::410293311095:policy/LFwriteToDB"
}

# TODO: LFwriteToDB writes to BugReports (old table) only, so make a new policy