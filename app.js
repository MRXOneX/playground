const docx = require('docx')
const AWS = require('aws-sdk');
const fs = require('fs');

const { Document, Packer, Paragraph, TextRun } = docx;
let count = 0
const uploadFile = (fileName) => {
    console.log(fileName)
    const s3 = new AWS.S3({
      accessKeyId: 'AKIA4XRSBZBHW3K3DBG5',
      secretAccessKey: '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'
    });
    
    const params = {
        Bucket: 'omb-strapi-upload-staging',
        Key: `document-${count++}.docx`,
        Body: fileName,
        contentType : 'application/docx'
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            console.log(err)
        }
        console.log(`File uploaded successfully. ${data?.Location}`);
    });
  };

const doc = new Document({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                children: [
                  new TextRun("Hello World"),
                  new TextRun({
                      text: "Foo Bar",
                      bold: true,
                  }),
                  new TextRun({
                      text: "\tGithub is the best",
                      bold: true,
                  }),
              ],
          }),
        ],
    }],
});
Packer.toBuffer(doc).then((buffer) => {
uploadFile(buffer)
})