const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const {
  emailSchema,
  tokenSchema,
  configSchema,
  fileuploadSchema,
  fileremoveSchema,
} = require("../middlewares/schemas/misc");


const getS3Instance = (req, next) => {
  try {
    // iniciando cliente S3
    return new S3Client({ region: process.env.AWS_REGION });
  } catch (err) {
    req.error = {
      status: 500,
      message: "Server error: internal server error",
      details: err.message,
    };
    return next(new Error(req.error.message, { cause: err }));
  }
};

const FileController = () => {
  // metodo que carga archivos
  const uploadFile = async (req, res, next) => {
    let extension;
    let regex;

    switch (req.payload.values.type) {
      case 'application/pdf':
        extension = 'pdf';
        regex = /^data:application\/pdf;base64,/;
        break;
      case 'image/png':
        extension = 'png';
        regex = /^data:image\/png;base64,/;
        break;
      case 'image/jpeg':
        extension = 'jpg';
        regex = /^data:image\/jpeg;base64,/;
        break;
      default:
        req.error = {
          status: 400,
          message: "Client error: bad request",
          details: "Incorrect file type",
        };
        return next(new Error(req.error.message));
    }

    // decodificando base64
    const body = Buffer.from(req.payload.values.content.replace(regex, ''), 'base64');
    const date = new Date().getTime();
    const ext = `.${extension}`;
    const key = `${req.payload.values.filename.replace(ext, '')}${date}${ext}`;

    // getting s3 instance
    const s3 = getS3Instance(req, next);
    
    // carga de archivo en S3
    const command = new PutObjectCommand({
      Bucket: req.payload.values.bucketname,
      Key: key,
      Body: body,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: req.payload.values.type,
    });
    const { Location, Key } = await s3.send(command);

    req.result = { url: Location, filename: Key };    
    return next();
  };

  // metodo para eliminar archivos previamente cargados
  const removeFile = async (req, res, next) => {
    // getting s3 instance
    const s3 = getS3Instance(req, next);

    // removiendo elemento de bucket    
    await s3.deleteObject({
      Bucket: req.payload.values.bucketname,
      Key: req.payload.values.filename,
    }).promise();

    req.result = { message: "Archivo eliminado satisfactoriamente" };
    return next();
  }

  return {
    uploadFile,
    removeFile
  };
};

FileController.routes = {
  // Files
  'POST /files': {
    path: 'FileController.uploadFile',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: fileuploadSchema,
    }
  },
  'DELETE /files': {
    path: 'FileController.removeFile',
    schema: {
      email: emailSchema,
      token: tokenSchema,
      config: configSchema,
      values: fileremoveSchema,
    }
  },
};


module.exports = FileController;
