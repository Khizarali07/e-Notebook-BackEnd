const mongoose = require("mongoose");
const url =
  "mongodb+srv://khizarali:khizar24@cluster0.hod0c.mongodb.net/Notebook?retryWrites=true&w=majority&appName=Cluster0";
const express = require("express");
const cors = require("cors");
const app = express();
const notes = require("./Modals/notesData");
const registration = require("./Modals/userRegistration");

let lemail = "";

app.use(express.json());
app.use(cors());

const connection = mongoose.connect(url);

app.post("/api/addingnote", async (req, res) => {
  console.log("link connected successed !!!");

  const email = await lemail;
  const { imageUrl, title, desc, date } = req.body;
  const data = { email, imageUrl, title, desc, date };

  console.log(email);

  const newNote = new notes(data);
  console.log("Newnote added !!!", newNote);
  const savednote = await newNote.save();

  console.log("insertion successed !!!");
  console.log(lemail);
});

app.post("/api/editingnote", async (req, res) => {
  console.log("link connected successed !!!");

  const { _id, title, desc, date } = req.body;

  const noteToUpdate = await notes.findOne({ _id });

  // Update the note's properties
  noteToUpdate.title = title;
  noteToUpdate.desc = desc;
  noteToUpdate.date = date;

  const updatedNote = await noteToUpdate.save();
  console.log("Note updated successfully!", updatedNote);

  console.log("edited successed !!!");
});

app.post("/api/deletingnote", async (req, res) => {
  console.log("link connected successed !!!");

  const { _id } = req.body;

  const noteTodelete = await notes.deleteOne({ _id });

  console.log("deletion successed !!!");
});

app.get("/api/fetchnote", async (req, res) => {
  console.log("link connected successed !!!");
  const email = lemail;
  const note = await notes.find({ email });

  console.log("fetching successed !!!", note);
  res.json(note);
});

app.post("/api/registration", async (req, res) => {
  console.log("link connected successed !!!");

  const { name, username, email, password } = req.body;
  const data = { name, username, email, password };

  const find1 = await registration.find({ username });
  const find2 = await registration.find({ email });

  if (find1.length <= 0 && find2.length <= 0) {
    const newuser = await new registration(data);
    const savednote = await newuser.save();
    res.json("User registration successed !!!");
  } else {
    res.json("User is already existed with this email Sorry !!!");
  }

  console.log("process completed");
});

app.post("/api/login", async (req, res) => {
  console.log("link connected successed !!!");

  const { email, password } = req.body;

  const find = await registration.find({ email, password });

  if (find.length <= 0) {
    res.json("User Don't exist Please Sign up first !!!");
  } else {
    lemail = email;

    res.json("Login Successfully !!!");
  }
  console.log(lemail);

  console.log("process completed");
});

app.post("/api/handlelogout", async (req, res) => {
  console.log("link connected successed !!!");

  lemail = "";

  console.log(lemail);

  console.log("process completed");
});

app.get("/api/handleauth", async (req, res) => {
  console.log("link connected successed !!!");

  res.json(lemail);

  console.log("process completed");
});

console.log(lemail);

app.listen(5000);
