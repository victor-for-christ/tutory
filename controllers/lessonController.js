const multer = require("multer");
const sharp = require("sharp");
const Lesson = require("../models/lessonModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("images")) {
    cb(null, true)
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadLessonImages = upload.fields([{
  name: "images",
  // maxCount: 3
}]);

exports.resizeLessonImages = catchAsync(async (req, res, next) => {

  if (!req.body.images || !req.files.images) return next();

  // Images
  req.body.images = [];

  const g = await Promise.all(req.files.images.map(async (file, i) => {
    const filename = `lesson-${req.params.id}-${Date.now()}-${i+1}.jpeg`;

    await sharp(file.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({
        quality: 90
      })
      .toFile(`public/img/lessons/${filename}`);

    req.body.images.push(filename);
  }));

  console.log(g);

  console.log(req.body);

  next();
});

exports.getAllLesson = catchAsync(async (req, res, next) => {
  const lessons = await Lesson.find();
  if (!lessons.length || !lessons) return next(new AppError("No lessons found", 404));
  res.status(200).json({
    status: "success",
    result: lessons.length,
    data: {
      lessons
    }
  });
});

exports.getLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return next(new AppError("No lesson found with that ID", 404)); //If no lesson found
  res.status(200).json({
    status: "success",
    data: {
      lesson
    }
  });
});

exports.setSubjectId = (req, res, next) => {
  if (!req.body.subject) req.body.subject = req.params.subjectId;
  next();
}

exports.bookLesson = catchAsync(async (req, res, next) => {
  req.body.bookedBy = req.user.id;
  const newLesson = await Lesson.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      lesson: newLesson
    }
  });
});

exports.updateLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });
  if (!lesson) return next(new AppError("No lesson found with that ID", 404));
  res.status(200).json({
    status: "success",
    data: {
      lesson
    }
  })
});

exports.deleteLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);
  if (!lesson) return next(new AppError("No lesson found with that ID", 404));
  res.status(204).json({
    status: "success"
  })
});