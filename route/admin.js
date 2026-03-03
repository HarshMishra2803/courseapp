const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");


const { JWT_ADMIN_PASSWORD } = require("../config");

const adminRouter = Router();
const { adminmiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  // hash the password

  await adminModel.create({
    email: email,
    password: password,
    firstName,
    lastName,
  });

  res.json({
    message: "signup succeeded",
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

adminRouter.post("/course", adminmiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });

  res.json({
    message: "course created",
    courseId: course._id,
  });
});

// adminRouter.put("/course", adminmiddleware, async (req, res) => {
//   const adminId = req.userId;

//   const { title, description, imageUrl, price } = req.body;

//   const course = await courseModel.updateOne(
//     {
//       _id: courseId,
//       creatorId: adminId,
//     },
//     {
//       title: title,
//       description,
//       imageUrl,
//       price,
//     }
//   );

//   res.json({
//     message: "course updated",
//     courseId: course._id,
//   });
// });
adminRouter.put("/course", adminmiddleware, async (req, res) => {
  const adminId = req.userId;

  
  const { courseId, title, description, imageUrl, price } = req.body;

  try {
  const course = await courseModel.updateOne(
      { _id: courseId, creatorId: adminId },
      { title, description, imageUrl, price }
    );

    if (course.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found or unauthorized" });
    }

    return res.status(200).json({ message: "Course updated", courseId });
  } catch (e) {
    console.error("Update course error:", e);
    return res.status(500).json({ message: "Failed to update course" });
  }
});

adminRouter.get("/course/bulk", adminmiddleware, async (req, res) => {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "course updated",
    courses
  });
});

module.exports = {
  adminRouter: adminRouter,
};
