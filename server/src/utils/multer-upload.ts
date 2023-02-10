import { existsSync, mkdirSync, readdirSync, rmSync } from "fs";
import multer from "multer";
import path from "path";

type Callback = (error: Error | null, destination: string) => void;

const deleteAllFilesFromDirectory = (dirPath: string) => {
  readdirSync(dirPath).forEach((f) => rmSync(`${dirPath}/${f}`));
};

const handleSaveAndDeleteFiles = (dirPath: string, cb: Callback) => {
  if (existsSync(dirPath)) {
    deleteAllFilesFromDirectory(dirPath);
    cb(null, dirPath);
  } else {
    mkdirSync(dirPath, { recursive: true });
    cb(null, dirPath);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (req.body.event === "userAvatar") {
      const user_id = req.params.userId;
      const path = `images/users/${user_id}`;

      handleSaveAndDeleteFiles(path, cb);
    }
    if (req.body.event === "productImages") {
      cb(null, "images/products");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });
