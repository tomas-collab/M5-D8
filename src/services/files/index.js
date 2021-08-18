import express from 'express'
import multer from 'multer'
import { PostPicture } from '../../lib/fs-tool.js'
// import {cloudStorage} from 'multer-storage-cloudinary'
import { pipeline } from 'stream'


// const cloudStorage = new CloudStorage({
//   Cloudinary,
//   params: {
//     folder: "strive",
//   },
// })


const fileRouter = express.Router()


fileRouter.post("/upload", multer({}).single("blogPic"), async (req, res, next) => {
    try {
      console.log(req.file)
      await PostPicture(req.file.originalname, req.file.buffer)
      res.send("Uploaded!")
    } catch (error) {
      next(error)
    }
  })

  fileRouter.get("/Download", async (req, res, next) => {
    try {
      const filename = "file.pdf"
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`) 
      const source = getPDFReadableStream({ firstName: "tomas", lastName: "berhane" })
      const destination = res
  
      pipeline(source, destination, err => {
        if (err) next(err)
      })
    } catch (error) {
      next(error)
    }
  })

  export default fileRouter