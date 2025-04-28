echo "## Running .sh, infra as code setup ##"

cd terraform

# init Terraform
terraform init

echo "Finished init"

# apply changes
terraform apply

echo "Deploying infrastructure as code..."

# refresh
terraform refresh

# update .env variables
echo "REACT_APP_LF_REPORT=$(terraform output -raw lambda_function_url)" > ../frontend/.env

# get URL
URL=$(terraform output -raw s3_website_url)

# check web url
echo "$URL"

# automaticaly updated README.md
sed -i "s|<placeholder-url>|$URL|g" ./README.md

echo "UPDATED URL IN README..."

# now update the cicd environment variables
sed -i "s|<placeholder-url>|$URL|g" .github/workflows/cicd.yml

echo "UPDATED URL IN CICD.yml


echo "###END###"

