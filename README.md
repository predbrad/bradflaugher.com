# bradflaugher.com

source code for [bradflaugher.com](https://bradflaugher.com)

# Brad's TODOs
* Improve metadata and social images for all pages, including redirects

# How to use this yourself

## Editing

Just checkout the project and open the html files in your text editor locally. I used to use a fancy templating library and gulp for this but now I just edit the raw html, my page got simpler and [LLMs make generate html and css very very well](https://themeisle.com/blog/how-to-use-chatgpt-to-build-a-website/)

## Testing locally

Open the html files in your web browser, how easy is that!

## Hosting your website with AWS S3 and Cloudfront (with https)

There are many guides online for this, try googling or asking an LLM "how to setup s3 hosting and cloudfront in aws" or use the guides below.

* [AWS Official Cloudfront Guide](https://awsnewbies.com/s3-website-route-53-cloudfront/)
* [AWS Official  S3/Cloudfront Guide](https://aws.amazon.com/cloudfront/getting-started/S3/)
* [Medium Blog Post](https://medium.com/geekculture/how-to-host-a-static-website-using-aws-route-53-s3-and-cloudfront-e425fa5de349)
* [AWSNewbies Guide](https://awsnewbies.com/s3-website-route-53-cloudfront/)

## Deploying via github actions to s3

* see the [```.github/workflows```](./github/workflows) folder for how this is done.
