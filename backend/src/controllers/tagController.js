const Tag = require("../models/Tag");

exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({
      success: true,
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tags.",
    });
  }
};

exports.addTag = async (req, res) => {
  try {
    const { name } = req.body;
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: "A tag with this name already exists",
      });
    }
    const newTag = new Tag(req.body);
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating a tag.",
    });
  }
};
exports.updateTag = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTag = await Tag.findByIdAndUpdate(id, req.body);
    if (updatedTag) {
      res.status(200).json({
        success: true,
        message: "Tag updated successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tag not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating the tag.",
    });
  }
};

exports.deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTag = await Tag.findByIdAndDelete(id);
    if (deletedTag) {
      res.status(200).json({
        success: true,
        message: "Tag deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tag not found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting the tag.",
    });
  }
};
