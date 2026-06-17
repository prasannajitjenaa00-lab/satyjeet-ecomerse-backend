const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/image', protect, authorize('admin','superadmin'), upload.single('image'), async (req, res) => {
  try {
    const folder = req.query.folder || 'overrated/products';
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'auto' }, (err, r) => err ? reject(err) : resolve(r));
      stream.end(req.file.buffer);
    });
    res.json({ success: true, url: result.secure_url, public_id: result.public_id });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/multiple', protect, authorize('admin','superadmin'), upload.array('images', 10), async (req, res) => {
  try {
    const folder = req.query.folder || 'overrated/products';
    const uploads = await Promise.all(req.files.map(file => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: 'auto' }, (err, r) => err ? reject(err) : resolve(r));
      stream.end(file.buffer);
    })));
    res.json({ success: true, images: uploads.map(r => ({ url: r.secure_url, public_id: r.public_id })) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/image', protect, authorize('admin','superadmin'), async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.body.public_id);
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
