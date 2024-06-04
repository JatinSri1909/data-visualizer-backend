const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Data = require('../models/dataModel');
const { PythonShell } = require('python-shell');
const fs = require('fs');
const path = require('path');

exports.uploadData = [upload.single('file'), async (req, res) => {
    const newData = new Data({
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype
    });

    try {
        const savedData = await newData.save();
        res.status(201).send(savedData);
    } catch (err) {
        res.status(500).send(err);
    }
}];

exports.getData = (req, res) => {
    Data.find()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  };

  exports.processData = async (req, res) => {
    PythonShell.run('scripts/data_processing.py', null, (err) => {
        if(err) {
            res.status(500).send(err);
        } else {
            PythonShell.run('scripts/data_visualization.py', null, (err) => {
                if(err) {
                    res.status(500).send(err);
                } else {
                    // Read the processed data from the file
                    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'processed_data.json'), 'utf8'));
                    // Send the processed data back to the client
                    res.status(200).json(data);
                }
            });
        }
    });
};