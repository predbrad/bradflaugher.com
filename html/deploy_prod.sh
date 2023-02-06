#!/bin/bash
#run this inside of the 'html' folder please

#awscli must be installed
# https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html 
# aws configure

# you need two environment variables, if you don't know what those are just use this search
# something like
# export MYSITE_S3_BUCKET = 's3://example.com'
# export MYSITE_CLOUNDFRONT_DIST = 'AOEUAOEUAOUE'
# for more info, look around duckduckgo
# https://duckduckgo.com/?q=%22setup%22+environment+variables+%22stack%22+%22overflow%22&norw=1&ia=web

aws s3 cp dist $MYSITE_S3_BUCKET --recursive
aws cloudfront create-invalidation \
    --distribution-id $MYSITE_CLOUNDFRONT_DIST \
    --paths "/*"

