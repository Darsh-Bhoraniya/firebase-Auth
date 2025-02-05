import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudanry.js';
import { db } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        format: async () => 'png',
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

const upload = multer({ storage: storage }).single('image');

const uploadImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload Error:', err.message);
            return res.status(500).json({ message: 'Error uploading image', error: err.message });
        }

        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const uniqueId = uuidv4();

        const imageData = {
            id: uniqueId,
            url: req.file.path,
            name: req.file.originalname,
            uploadedAt: Date.now(),
        };

        try {
            await db.collection('images_data').doc(uniqueId).set(imageData);
            console.log('Image data saved to Firestore:', imageData);

            // Respond with success and image URL
            res.status(200).json({
                message: 'File uploaded and data saved successfully',
                url: req.file.path,
                uniqueId: uniqueId,
                imageData: imageData, // Return the image data
            });
        } catch (firebaseError) {
            console.error('Error saving image data to Firestore:', firebaseError.message);
            return res.status(500).json({ message: 'Error saving image data to Firestore', error: firebaseError.message });
        }
    });
};

export default { uploadImage };
