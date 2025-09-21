const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Path for persistence file
const dataFile = path.join(__dirname, "contacts.json");

// Helper: Load contacts from file
function loadContacts() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

// Helper: Save contacts to file
function saveContacts(contacts) {
  fs.writeFileSync(dataFile, JSON.stringify(contacts, null, 2));
}

// Routes
app.get("/contacts", (req, res) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  const contacts = loadContacts();
  const start = (page - 1) * limit;
  const paginated = contacts.slice(start, start + limit);

  res.json({
    data: paginated,
    total: contacts.length,
    page,
    totalPages: Math.ceil(contacts.length / limit),
  });
});

app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^\d{10}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Phone must be 10 digits" });
  }

  const contacts = loadContacts();
  const newContact = { id: Date.now().toString(), name, email, phone };
  contacts.push(newContact);
  saveContacts(contacts);

  res.status(201).json(newContact);
});

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  let contacts = loadContacts();
  const initialLength = contacts.length;
  contacts = contacts.filter((c) => c.id !== id);

  if (contacts.length === initialLength) {
    return res.status(404).json({ error: "Contact not found" });
  }

  saveContacts(contacts);
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
