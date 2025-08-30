// Generate a unique ID
function generateId() {
  return Date.now().toString();
}

// Load prompts from storage
function loadPrompts() {
  chrome.storage.sync.get({ prompts: [] }, (data) => {
    const list = document.getElementById("prompt-list");
    list.innerHTML = "";
    data.prompts.forEach(p => addPromptElement(p));
  });
}

// Add a prompt element to the DOM
function addPromptElement(prompt = {id: generateId(), name: "", content: ""}) {
  const list = document.getElementById("prompt-list");
  const div = document.createElement("div");
  div.className = "prompt";
  div.dataset.id = prompt.id;

  div.innerHTML = `
    <input name="name" placeholder="Prompt Name" value="${prompt.name}">
    <textarea rows="4">${prompt.content}</textarea>
    <button class="delete-btn">Delete</button>
  `;

  // Delete functionality
  div.querySelector(".delete-btn").addEventListener("click", () => {
    div.remove();
  });

  list.appendChild(div);
}

// Add new prompt button
document.getElementById("add-prompt").addEventListener("click", () => addPromptElement());

// Save all prompts
document.getElementById("save").addEventListener("click", () => {
  const prompts = Array.from(document.querySelectorAll(".prompt")).map(div => ({
    id: div.dataset.id,
    name: div.querySelector('input[name="name"]').value || "Untitled",
    content: div.querySelector("textarea").value
  }));
  chrome.storage.sync.set({ prompts }, () => {
    alert("Prompts saved!");
  });
});

// Initialize
loadPrompts();
