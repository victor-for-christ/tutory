const Subject = require("../models/subjectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getAllSubjects = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) filter = {
    category: req.params.categoryId
  };
  const subjects = await Subject.find(filter);
  if (!subjects.length || !subjects) return next(new AppError("No subjects found", 404));
  res.status(200).json({
    status: "success",
    result: subjects.length,
    data: {
      subjects
    }
  })
});

exports.getSubject = catchAsync(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return next(new AppError("No subject found with that ID", 404)); //If no subject found
  res.status(200).json({
    status: "success",
    data: {
      subject
    }
  });
});

exports.createSubject = catchAsync(async (req, res, next) => {

});
exports.updateSubject = catchAsync(async (req, res, next) => {

});
exports.deleteSubject = catchAsync(async (req, res, next) => {

});