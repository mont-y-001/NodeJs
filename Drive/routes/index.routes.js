const express = require("express");
const router = express.Router();
const { supabase } = require("../supabaseClient");
const File = require("../Models/file.model");
const authMiddleware = require("../Middleware/auth");

// ✅ HOME route — Fetch files from MongoDB (not Supabase)
router.get("/home", authMiddleware, async (req, res) => {
  try {
    const files = await File.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.setHeader("Cache-Control", "no-store");
    res.render("home", { files, user: req.user });
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).send("Internal Server Error");
  }
});


// ✅ View Route
router.get("/view/:id", authMiddleware, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file || file.user.toString() !== req.user.userId) {
      return res.status(403).send("Unauthorized access");
    }

    // Get relative path inside Supabase bucket
    const filePath = file.fileUrl.split("/storage/v1/object/public/Mohit-Drive/")[1];

    // Generate signed URL (valid for 1 min)
    const { data, error } = await supabase
      .storage
      .from("Mohit-Drive")
      .createSignedUrl(filePath, 60);

    if (error) {
      console.error("Supabase signed URL error:", error.message);
      return res.status(500).send("Error generating file link");
    }

    // Redirect to signed URL to view
    return res.redirect(data.signedUrl);
  } catch (err) {
    console.error("View error:", err);
    res.status(500).send("Error loading file");
  }
});


// ✅ Download Route
router.get("/download/:id", authMiddleware, async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file || file.user.toString() !== req.user.userId) {
      return res.status(403).send("Unauthorized access");
    }

    const filePath = file.fileUrl.split("/storage/v1/object/public/Mohit-Drive/")[1];

    const { data, error } = await supabase
      .storage
      .from("Mohit-Drive")
      .createSignedUrl(filePath, 60);

    if (error) {
      console.error("Supabase download signed URL error:", error.message);
      return res.status(500).send("Error generating download link");
    }

    // Redirect browser to start download
    return res.redirect(data.signedUrl);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).send("Error downloading file");
  }
});

module.exports = router;
