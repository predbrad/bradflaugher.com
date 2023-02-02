#!/bin/bash
#run this inside of the 'html' folder please

#awscli must be installed
# https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html 
# aws configure

aws s3 cp dist s3://bradflaugher.com --recursive
aws cloudfront create-invalidation \
    --distribution-id E2EGK5A9TUYOW1 \
    --paths "/*"
