const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/file/";

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({message: "Por favor suba un archivo!"});
        }

        res.status(200).send({message: "Subido exitosamente " + req.file.originalname});

    } catch (error) {

        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "No se permiten archivos de màs de 3MB!",
            });
        }

        res.status(500).send({
            message: "No se pudo subir el archivo " + req.originalname + ". Error: " + error
        })
    }
};

const getFiles = (req, res) => {
    const directorioImagenes = __basedir + "/upload";
    fs.readdir(directorioImagenes, (error, files) => {
        if (error) {
            res.status(500).send({
                message: "Error al buscar archivos: " + error
            })
        }

        const filesInfos = [];

        files.forEach(file => {
            filesInfos.push({
                name: file,
                url: baseUrl + file
            })
        });

        res.status(200).send(filesInfos);
    });
}

const download = (req, res) => {
    const filename = req.params.name;
    const directorioImagenes = __basedir + "/upload/";

    res.download(directorioImagenes + filename, error => {
        if (error) {
            res.status(500).send({
                message: "Error al descargar archivo: " + error
            })
        }
    });
};

module.exports = {upload, getFiles, download};