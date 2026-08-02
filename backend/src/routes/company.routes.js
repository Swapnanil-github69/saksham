const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validateObjectId } = require('../validators/application.validator');
const upload = require('../middleware/upload.middleware');
const ROLES = require('../constants/roles');

router.get('/', companyController.getCompanies);
router.get('/:id', validateObjectId('id'), companyController.getCompany);

// Protected routes (Employers & Admins)
router.post(
  '/',
  protect,
  authorize(ROLES.EMPLOYER),
  upload.single('logo'),
  companyController.createCompany
);

router.put(
  '/:id',
  protect,
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateObjectId('id'),
  upload.single('logo'),
  companyController.updateCompany
);

router.delete(
  '/:id',
  protect,
  authorize(ROLES.EMPLOYER, ROLES.ADMIN),
  validateObjectId('id'),
  companyController.deleteCompany
);

module.exports = router;
