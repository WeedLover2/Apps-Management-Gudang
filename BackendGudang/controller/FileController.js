const cloudinary = require('../config/cloudinary');
const File = require('../models/File');

// Upload file menggunakan Cloudinary
exports.uploadFile = async (req, res) => {
    try {
        // Mengunggah file ke Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Menyimpan informasi file ke database MongoDB
        const file = new File({
            name: req.file.originalname,
            url: result.secure_url,
            cloudinaryId: result.public_id,
        });
        await file.save();
        
        res.status(201).json(file);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'File upload failed' });
    }
};