const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const multer = require("multer");
const path = require("path");

const cors = require("cors");


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

mongoose
  .connect("mongodb://localhost:27017/Seproject")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Mongoose model (example, adjust according to your schema)
const User = mongoose.model("User", {
  name: String,
  age: Number,
  height: String,
  gender: String,
  fatherName: String,
  imageUrl: String,
  barcode: String,
});

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads"), // Specify the destination directory
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle form submission endpoint
app.post("/api/submitForm", upload.single("image"), async (req, res) => {
  try {
    const { originalname, filename } = req.file;
    const { name, age, height,fatherName,gender,barcode } = req.body;


    // Save the form data to MongoDB (example, adjust according to your schema)
    const user = new User({
      name,
      age,
      height,
      fatherName,
      gender,
      imageUrl: filename,
      barcode
    });

    await user.save();

    // You can optionally send the saved user data or other details back to the client
    res.status(200).json({ message: "Form submitted successfully", user });
  } catch (error) {
    console.error("Error during form submission:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error while retrieving user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve individual image files
app.get("/api/getImage/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "public", "uploads", filename);

  res.sendFile(imagePath);
});

// Handle GET request to retrieve user details by ID
app.get("/api/getUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Use Mongoose to find the user by ID in the MongoDB collection
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error while retrieving user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/api/downloadPdf/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const logoSrc = "path/to/your/logo.png"; // Replace with your logo path

  const pdfContent = `
    <div class="text-center mb-8">
      <img src="${logoSrc}" alt="Logo" class="w-20 h-20 mr-2"/> 
      <h1 class="text-green-500 font-bold text-4xl">UET Lahore Narowal Campus</h1>
    </div>
    <table class="w-full border-collapse mb-8">
      <tr>
        <td>
          <img src=${`http://localhost:5000/api/getImage/${user.imageUrl}`} alt="Logo" class="w-20 h-20 mr-2"/> 
        </td>
      </tr>
      <tr>
        <td class="font-bold pr-4">Name:</td>
        <td>${user.name}</td>
      </tr>
      <tr>
        <td scope="col" class="font-bold pr-4">Father's Name:</td>
        <td scope="col">${user.fatherName}</td>
      </tr>
      <tr>
        <td class="font-bold pr-4">Gender:</td>
        <td>${user.gender}</td>
      </tr>
      <tr>
        <td class="font-bold pr-4">Height:</td>
        <td>${user.height}</td>
      </tr>
      <tr>
        <td class="font-bold pr-4">Age:</td>
        <td>${user.age}</td>
      </tr>
    </table>
  `;

  const pdfElement = document.createElement("div");
  pdfElement.innerHTML = pdfContent;

  const pdfBuffer = await html2pdf(pdfElement, {
    margin: 10,
    filename: `user_${userId}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  });

  res.setHeader("Content-Disposition", `attachment; filename=user_${userId}.pdf`);
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdfBuffer);
});

const port = 5000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
