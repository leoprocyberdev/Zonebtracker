window.addEventListener("load", () => {
  const db = window.db;
  const addDoc = window.firestoreAddDoc;
  const collection = window.firestoreCollection;

  document.getElementById("registrationForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const member = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      location: formData.get("location"),
      class: formData.get("class"),
      joined: formData.get("joined")
    };

    try {
      await addDoc(collection(db, "members"), member);
      alert(`Member ${member.name} registered successfully!`);
      this.reset();
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to register member.");
    }
  });
});