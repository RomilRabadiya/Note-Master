const Note = require("../models/Notes");

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = new Note({
      title,
      content,
      tags,
      user: req.user.id, // assuming user is set by auth middleware
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id }, // ensure user owns note
      { title, content, tags },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error: error.message });
    }

};

// Get all notes for user
const getNotes = async (req, res) => {
try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
} catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
}
};

module.exports = { createNote, updateNote, deleteNote, getNotes };