const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload subdirectories exist dynamically
const getDestinationDirectory = (fieldname) => {
  let subDir = 'uploads/';
  if (fieldname === 'resume') {
    subDir += 'resumes';
  } else if (fieldname === 'profileImage') {
    subDir += 'profiles';
  } else if (fieldname === 'logo') {
    subDir += 'companies';
  } else {
    subDir += 'others';
  }

  // Create directory if it doesn't exist
  if (!fs.existsSync(subDir)) {
    fs.mkdirSync(subDir, { recursive: true });
  }

  return subDir;
};

// Disk Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = getDestinationDirectory(file.fieldname);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Generate safe, unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File type validation filters
const fileFilter = (req, file, cb) => {
  const allowedImages = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedResumes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (file.fieldname === 'resume') {
    if (allowedResumes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for resume. Allowed: PDF, DOC, DOCX'), false);
    }
  } else if (file.fieldname === 'profileImage' || file.fieldname === 'logo') {
    if (allowedImages.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for image. Allowed: JPG, JPEG, PNG, WEBP'), false);
    }
  } else {
    cb(new Error('Unknown upload field'), false);
  }
};

// Multer upload configurations with limits (5MB for resumes, 2MB for images)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

module.exports = upload;
