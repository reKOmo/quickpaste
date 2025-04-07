export function streamToString(stream) {
    var chunks = [];
    return new Promise(function (resolve, reject) {
        stream.on('data', function (chunk) { return chunks.push(Buffer.from(chunk)); });
        stream.on('error', function (err) { return reject(err); });
        stream.on('end', function () { return resolve(Buffer.concat(chunks).toString('utf8')); });
    });
}
