const express = require('express');
const router = express.Router();
const companyController = require('../../controllers/company/company.controller');
const authMiddleware = require('../../middleware/authMiddleware');
const { authorize } = require('../../middleware/role.middleware');
const { validateObjectId } = require('../../validators/application/application.validator');
const upload = require('../../middleware/upload.middleware');
const ROLES = require('../../constants/roles');

router.get('/', companyController.getCompanies);
router.get('/:id', validateObjectId('id'), companyController.getCompany);

// Protected routes (Employers & Admins)
router.post(
  '/',
  authMiddleware,
  authorize(ROLES.EMPLOYER),
  upload.single('logo'),
  companyController.createCompany
);

router.put(
  '/:id',
  authMiddleware,
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateObjectId('id'),
  upload.single('logo'),
  companyController.updateCompany
);

router.delete(
  '/:id',
  authMiddleware,
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateObjectId('id'),
  companyController.deleteCompany
);

module.exports = router;
