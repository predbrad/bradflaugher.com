# bradflaugher.com

source code for [bradflaugher.com](https://bradflaugher.com)

## Setup s3 and cloudfront in AWS with https

There are many guides online for this, try googling "setup s3 hosting and cloudfront in aws" or use the guides below. If you find one that is amazing and clear, please submit a PR.

* [AWS Official Cloudfront Guide](https://awsnewbies.com/s3-website-route-53-cloudfront/)
* [AWS Official  S3/Cloudfront Guide](https://aws.amazon.com/cloudfront/getting-started/S3/)
* [Medium Blog Post](https://medium.com/geekculture/how-to-host-a-static-website-using-aws-route-53-s3-and-cloudfront-e425fa5de349)
* [AWSNewbies Guide](https://awsnewbies.com/s3-website-route-53-cloudfront/)

## Prerequisites

* ```docker``` must be installed [Get Docker](https://docs.docker.com/get-docker/)


## Building the main site

* ```cd html```
* ```sh rundocker.sh```
* ```gulp``` to test locally  
* or ```gulp build_prod``` to build prod to ```dist folder```

## Deploying the main site site

* from the ```html``` folder
* ```sh deploy_prod.sh```

## Extras

* same as the main site but everything lives in the extras folder. These files were made by hand so are kept separate from the rest of the site.
