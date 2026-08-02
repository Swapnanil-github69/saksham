const Company = require('../models/Company');
const AppError = require('../utils/AppError');
const ROLES = require('../constants/roles');

const createCompany = async (companyData, employerId) => {
  const company = await Company.create({
    ...companyData,
    employerId,
  });
  return company;
};

const getAllCompanies = async () => {
  return await Company.find({}).sort({ companyName: 1 });
};

const getCompanyById = async (id) => {
  const company = await Company.findById(id).populate('employerId', 'name email');
  if (!company) {
    throw new AppError('Company not found', 'NOT_FOUND', 404);
  }
  return company;
};

const updateCompany = async (id, updateData, userId, userRole) => {
  const company = await Company.findById(id);
  if (!company) {
    throw new AppError('Company not found', 'NOT_FOUND', 404);
  }

  // Authorization: Only owner or admin can update
  if (userRole !== ROLES.ADMIN && company.employerId.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to update this company profile', 'FORBIDDEN', 403);
  }

  const updatedCompany = await Company.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedCompany;
};

const deleteCompany = async (id, userId, userRole) => {
  const company = await Company.findById(id);
  if (!company) {
    throw new AppError('Company not found', 'NOT_FOUND', 404);
  }

  // Authorization: Only owner or admin can delete
  if (userRole !== ROLES.ADMIN && company.employerId.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to delete this company profile', 'FORBIDDEN', 403);
  }

  await Company.findByIdAndDelete(id);
  return company;
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
