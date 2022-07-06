// Must follow Cloudfront Function syntax restrictions
// https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html
/* eslint-disable no-var, no-unused-vars, prefer-destructuring */
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check whether the URI is missing a file name.
    if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }

    return request;
}
