import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRouter.js";
import contactsRouter from "./routes/contactsRouter.js";
import multer from "multer";
import path from "path";
import jimp from "jimp";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tmpFolder = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: tmpFolder,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

app.use("/api/users", userRouter);
app.use("/api/contacts", contactsRouter);

app.patch(
  "/api/users/avatars",
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { file } = req;
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const image = await jimp.read(file.path);
      await image.resize(250, 250).writeAsync(file.path);

      const avatarFilename = `${Date.now()}${path.extname(file.originalname)}`;
      const avatarPath = path.join(
        process.cwd(),
        "public",
        "avatars",
        avatarFilename
      );
      await image.writeAsync(avatarPath);

      const avatarURL = `/avatars/${avatarFilename}`;

      res.status(200).json({ avatarURL });
    } catch (error) {
      next(error);
    }
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
