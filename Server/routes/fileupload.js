const router = require("express").Router()
// const mongoose_url=require("../mongo")
const fs = require('fs');
const pool = require("../db")
const path=require("path")
var cors = require('cors');
router.use(cors());
const multer  = require('multer')
//   const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, './files')
//       },
//       filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now()
//         cb(null, uniqueSuffix+file.originalname)
//       }
//     })
//     const upload = multer({ storage: storage })
//----------------------------------------------------------


// Define storage for files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify where to store the files
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    // Generate unique file names
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with the storage options
const upload = multer({ storage: storage });



//--------------------------------------------------
    // const storage1 = multer.diskStorage({
    //   destination: function (req, file, cb) {
    //     cb(null, './image')
    //   },
    //   imagename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now()
    //     cb(null, uniqueSuffix+file.originalname)
    //   }
    // })
    // const upload1 = multer({ storage: storage1 })

  router.post("/upload-files",upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]),async(req,res)=>{
    const unit=req.body.unit;
    const subject=req.body.subject;
    const sem=req.body.sem;
    const category=req.body.category;
    const filename = req.files['file'][0];
    const imagename = req.files['image'][0];
    console.log("filename:",filename.filename);
    console.log("imagename:",imagename.filename);
    try {
        // await pdfSchema.create({unit:unit ,subject:subject,sem:sem,pdf:filename})
        await pool.query("insert into Fileupload (image,pdf,unit,sem,subject,category) values($1,$2,$3,$4,$5,$6) returning *",[imagename.filename,filename.filename,unit,sem,subject,category])
        res.json({ success: true, message: "Data added " })
      } catch (error) {
          console.log(error);
          res.json({ success: false, message: "Error" })
      }
  console.log(req.file);
    })

router.delete("/delete-file/:pdf",async(req,res)=>{
try {
  // const pdf = await pdfSchema.findById(req.params.id);
  console.log(req.params.pdf);
  const pdf=await pool.query("select * from Fileupload where pdf=$1",[req.params.pdf])
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }
//     console.log(pdf);
// console.log("rows",pdf.pdf);
    console.log(__dirname)
//   // Delete the file from file system
    await fs.unlinkSync('../server/files/'+req.params.pdf);


  //   // Delete the record from MongoDB
    // await pdfSchema.deleteOne({ _id: req.params.id});
    // console.log(req.params.id);
    await pool.query("delete from Fileupload where pdf=$1",[req.params.pdf]);
    res.send({ status:"ok"});
  } catch (err) {
  console.error(err.message);
  }
})

router.get("/get-files",async(req,res)=>{
    try {
      // await  pdfSchema.find({}).then((data)=>{
      //   res.send({status:"ok",data:data})
      // })
      // const fileDetails = pdfSchema.findOne(id)
      // delete mngo.delete(id)
     await pool.query("select * from Fileupload ")

      .then((data)=>{
        res.send({status:"ok",data:data})
        console.log("file:",data);
      })  
     
    } catch (err) {
        console.error(err.message);
      
    }
    
})

module.exports=router