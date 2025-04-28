echo "## Running .sh, infra as code setup ##"

cd terraform

# echo "Terraform init..."
# init Terraform
# terraform init



echo "Deploying/Updating Infrastructure as Code..."
# apply changes
terraform apply -auto-approve



# refresh
# terraform refresh

# update .env variables
echo "REACT_APP_LF_REPORT=$(terraform output -raw lambda_function_url)" > ../frontend/.env

# get URL
URL=$(terraform output -raw s3_website_url)

# bucket name
BUCKET=${terraform output -raw s3_bucket_name}

# now go to root directory
cd ..

echo "Updating/Replacing README.md and cicd.yml App URL"

# automaticaly updating README.md
sed -i "s|(http[^)]*)|\($URL\)|g" ./README.md

# now update the cicd environment variables 
# update the URL
sed -i "s|URL: .*|URL: $URL|g" .github/workflows/cicd.yml

# update the aws s3 bucket name
sed -i "s|BUCKET_NAME: .*|BUCKET_NAME: s3://$BUCKET|g" .github/workflows/cicd.yml

echo "###END###"

