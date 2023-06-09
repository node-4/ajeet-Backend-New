var cloudinary = require('cloudinary');
cloudinary.config({
        cloud_name: "dbrvq9uxa",
        api_key: "567113285751718",
        api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
module.exports = {
        videoUpload(base64) {
                console.log("==========base64", base64)
                return new Promise((resolve, reject) => {
                        cloudinary.uploader.upload(base64, {
                                resource_type: "video",
                        },
                                function (error, result) {
                                        console.log("error", error, "Resulr", result)
                                        if (error) {
                                                console.log("==========error")
                                                reject(error);
                                        }
                                        else {
                                                resolve(result.secure_url)
                                        }
                                });
                })
        },
        uploadImage: (img, callback) => {
                cloudinary.v2.uploader.upload(img, (error, result) => {
                        if (error) {
                                callback(error, null)
                        }
                        else {
                                callback(null, result.secure_url)
                        }
                })
        },
        uploadMultipleImage: (imageB64, callback) => {
                let imageArr = []
                async.eachSeries(imageB64, (items, callbackNextiteration) => {
                        module.exports.uploadFunction(items, (err, url) => {
                                if (err)
                                        console.log("error is in line 140", err)
                                else {
                                        imageArr.push(url);
                                        callbackNextiteration();
                                }
                        })
                }, (err) => {
                        console.log("imageArr", imageArr)

                        callback(null, imageArr);

                }

                )
        },
        sendSMS: (mobileNumber, body, callback) => {
                client.messages.create({
                        'body': body,
                        'to': mobileNumber,
                        "from": "+18555728559"
                }, (twilioErr, twilioResult) => {
                        if (twilioErr) {
                                callback(twilioErr, null);
                        }
                        else {
                                callback(null, twilioResult);
                        }
                })
        },
        uploadFunction(base64, callback) {
                cloudinary.v2.uploader.upload(base64,
                        {
                                resource_type: "auto",
                        },
                        function (error, result) {
                                if (error) {
                                        callback(error, null)
                                }
                                else {
                                        callback(null, result.secure_url)
                                }
                        });
        },
        findUser: (userId) => {
                return new Promise((resolve, reject) => {
                        var temp;
                        userModel.findOne({ _id: userId }).populate('_assignRole').exec((err, result) => {
                                if (err) {
                                        temp = { responseCode: 500, responseMessage: "Internal server error.", err: err }
                                        resolve(temp)
                                }
                                else if (!result) {
                                        temp = { responseCode: 404, responseMessage: "This user does not exist." }
                                        resolve(temp)

                                }
                                else {
                                        temp = { responseCode: 200, responseMessage: "Details has been fetched successfully.", result: result }
                                        resolve(temp)

                                }

                        })
                })

        },
        saveActivity: (obj) => {
                return new Promise((resolve, reject) => {
                        var temp;
                        new activityModel(obj).save((err, activityResult) => {
                                if (err) {
                                        temp = { responseCode: 500, responseMessage: "Internal server error.", err: err }
                                        resolve(temp)
                                }
                                else {
                                        temp = { responseCode: 200, responseMessage: "Activity saved.", result: activityResult }
                                        resolve(temp)
                                }
                        })
                })
        },
        multipleImageUploadCloudinaryWithPromise: (imageB64) => {
                return new Promise((resolve, reject) => {
                        let imageArr = []
                        async.eachSeries(imageB64, (items, callbackNextiteration) => {
                                module.exports.uploadImage(items, (err, url) => {
                                        if (err) {
                                                console.log("error is in line 119", err)
                                                reject("something went wrong")
                                        }
                                        else {
                                                imageArr.push(url);
                                                callbackNextiteration();
                                        }
                                })
                        }, (err) => {
                                console.log("hhhhhhhhhhhhhhhhhhhhhhhhh", imageArr)
                                resolve(imageArr);
                        }

                        )
                })
        },
        getImageUrlPhase2: async (files) => {
                var result = await cloudinary.v2.uploader.upload(files, { resource_type: "auto", transformation: { duration: 30 } })
                console.log("82", result)
                return result;
        },
        getImageUrl: async (files) => {
                var result = await cloudinary.v2.uploader.upload(files[0].path, { resource_type: "auto" })
                console.log("82", result)
                return result.secure_url;
        },
        uploadProfileImage(profilePic) {
                return new Promise((resolve, reject) => {
                        cloudinary.uploader.upload(profilePic, function (result, error) {
                                console.log("result", result, "error", error);
                                if (error) {
                                        reject(error);
                                }
                                else {
                                        resolve(result.secure_url)
                                }
                        });
                })
        },
        getSecureUrl: async (base64) => {
                var result = await cloudinary.uploader.upload(base64, { resource_type: "auto" });
                return result.secure_url;
        },
        uploadFile: (file, a) => {
                const fileStream = fs.createReadStream(file);
                const uploadParams = {
                        Bucket: "list-your-pic-bucket",
                        Body: fileStream,
                        Key: a,
                };
                return s3.upload(uploadParams).promise(); // this will upload file to S3
        },
        imageUpload: async (base64, imageName) => {
                const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                const type = base64.split(';')[0].split('/')[1];
                let convertLowerCase = type.toLowerCase()
                const params = {
                        Bucket: "list-your-pic-bucket",
                        Key: `${imageName}.${convertLowerCase}`,
                        Body: base64Data,
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`
                }
                return s3.upload(params).promise();
        },
        imageUpload1: (file) => {
                let fileName = file.originalname.split("/").pop().split(".")[0]
                let type = file.filename.substring(file.filename.lastIndexOf('.') + 1, file.filename.length);
                let convertLowerCase = type.toLowerCase()
                const fileStream = fs.createReadStream(file.path);
                const uploadParams = {
                        Bucket: "list-your-pic-bucket",
                        Body: fileStream,
                        Key: `${fileName}.${convertLowerCase}`,
                };
                return s3.upload(uploadParams).promise();
        },
        imageUpload2: async (file) => {
                let fileName = file.originalname.split("/").pop().split(".")[0]
                let type = file.filename.substring(file.filename.lastIndexOf('.') + 1, file.filename.length);
                let convertLowerCase = type.toLowerCase()
                const fileStream = fs.createReadStream(file.path);
                const firstS3Upload = {
                        Bucket: "list-your-pic-bucket",
                        Body: fileStream,
                        Key: `${fileName}.${convertLowerCase}`,
                };
                let a = await s3.upload(firstS3Upload).promise();
                const response = await axios.get(a.Location, {
                        responseType: "arraybuffer",
                });
                const buffer = new Buffer.from(response.data, "utf-8").toString("base64");
                let t1 = "data:image/jpeg;base64,";
                let base64 = t1.concat(buffer);
                const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                var matches = base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
                        response1 = {};
                if (matches.length !== 3) {
                        return new Error('Invalid input string');
                }
                response1.type = matches[1];
                response1.data = new Buffer(matches[2], 'base64');
                // let decodedImg = response1;
                // let imageBuffer = decodedImg.data;
                // let fileName1 = `${fileName}.${convertLowerCase}`;
                // fs.writeFileSync("./uploads/" + fileName1, base64Data, 'utf8');
                const compressedImage200Promise1 = sharp(base64Data)
                        .toFormat('jpeg')
                        .jpeg({
                                force: true,
                        })
                        .resize({
                                width: 500,
                                withoutEnlargement: true,
                        })
                        .flatten({ background: '#fff' })
                        .toBuffer();
                const [compressedImage200,] = await Promise.all([
                        compressedImage200Promise1
                ]);
                const Thirds3upload = s3.upload({
                        Bucket: "list-your-pic-bucket",
                        Key: "200/" + `${fileName}.${convertLowerCase}`,
                        Body: compressedImage200,
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`
                }).promise();
                let b = await Promise.all([Thirds3upload]);
                let obj = {
                        a: a,
                        b: b[0]
                }
                return obj;
        },
        imageUpload3: async (base64, imageName) => {
                const type = base64.split(';')[0].split('/')[1];
                let convertLowerCase = type.toLowerCase()
                let parts = base64.split(';');
                let mimType = parts[0].split(':')[1];
                let imageData = parts[1].split(',')[1];
                const base64Data = new Buffer.from(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                const compressedImage200Promise = sharp(base64Data)
                        .resize({
                                width: 500,
                                height: 500,
                                withoutEnlargement: true,
                        })
                        .toBuffer()
                // let resizedImageData = await compressedImage20.toString('base64');
                // let compressedImage200Promise = `data:${mimType};base64,${resizedImageData}`;
                const compressedImage800Promise = base64Data;
                const [compressedImage200, compressedImage800] = await Promise.all([
                        compressedImage200Promise, compressedImage800Promise,
                ]);
                const firstS3Upload = s3.upload({
                        Bucket: "list-your-pic-bucket",
                        Key: "200/" + `${imageName}.${convertLowerCase}`,
                        Body: compressedImage200,
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`
                }).promise();
                const secondS3Upload = s3.upload({
                        Bucket: "list-your-pic-bucket",
                        Key: "800/" + `${imageName}.${convertLowerCase}`,
                        Body: compressedImage800,
                        ContentEncoding: 'base64',
                        ContentType: `image/${type}`
                }).promise();
                return await Promise.all([firstS3Upload, secondS3Upload]);
        },

}