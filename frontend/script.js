const apiUrl = "http://localhost:5000/api/contacts";
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

async function fetchContacts() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  contactList.innerHTML = "";
  data.forEach(contact => {
    const li = document.createElement("li");
    li.textContent = `${contact.name} - ${contact.phone}`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = async () => {
      await fetch(`${apiUrl}/${contact.id}`, { method: "DELETE" });
      fetchContacts();
    };
    li.appendChild(delBtn);
    contactList.appendChild(li);
  });
}

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const contact = { id: Date.now().toString(), name, phone };
  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  contactForm.reset();
  fetchContacts();
});

fetchContacts();
