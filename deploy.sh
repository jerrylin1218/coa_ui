#!/bin/bash

AWS_S3_REGION="us-east-1"
PRODUCTION_BRANCH="production"


# Determine the environment to deploy to based on the branch
# From that, we'll know:
#   - the S3 bucket to sync assets with
#   - the CloudFront distribution for which to create an invalidation
NODE_ENV=''
CLOUDFRONT_DIST_ID=''

if [[ $TRAVIS_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
  npm install
  npm run build
else
  # Don't want to deploy if it's not one of the above branches
  echo "Not deploying"
  exit
fi

# Build the name of the S3 bucket we want to deploy to
S3_BUCKET="coa-ui-$NODE_ENV"
echo "Deploying to the $S3_BUCKET bucket"

# Install the AWS CLI so we can publish to S3
pip install awscli --upgrade --user

# Sync our build folder with our S3 bucket
# --acl public-read says deploy the files with public read access
# --delete says to delete files in the bucket that aren't present in the build folder
#   this ensures that old assets built with webpack with hashed names get deleted
#   when a new build of the app is made and the assets get new hash names
aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete