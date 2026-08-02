const companyService = require('../services/company.service');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('../utils/response');

const createCompany = catchAsync(async (req, res) => {
  const companyData = { ...req.body };

  if (req.file) {
    companyData.logo = req.file.path.replace(/\\/g, '/');
  }

  const company = await companyService.createCompany(companyData, req.user._id);
  return sendSuccess(res, 'Company created successfully', { company }, 201);
});

const getCompanies = catchAsync(async (req, res) => {
  const companies = await companyService.getAllCompanies();
  return sendSuccess(res, 'Companies retrieved successfully', { companies }, 200);
});

const getCompany = catchAsync(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.id);
  return sendSuccess(res, 'Company retrieved successfully', { company }, 200);
});

const updateCompany = catchAsync(async (req, res) => {
  const companyData = { ...req.body };

  if (req.file) {
    companyData.logo = req.file.path.replace(/\\/g, '/');
  }

  const company = await companyService.updateCompany(req.params.id, companyData, req.user._id, req.user.role);
  return sendSuccess(res, 'Company updated successfully', { company }, 200);
});

const deleteCompany = catchAsync(async (req, res) => {
  const company = await companyService.deleteCompany(req.params.id, req.user._id, req.user.role);
  return sendSuccess(res, 'Company deleted successfully', { company }, 200);
});

module.exports = {
  createCompany,
  getCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
};
