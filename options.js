// Function to initialize storage with default prompts if not already saved
function initializePrompts() {
  chrome.storage.sync.get({ prompts: [] }, (data) => {
    if (!data.prompts || data.prompts.length === 0) {
      // Get the values from the textareas (the defaults in your HTML)
      const defaultPrompts = [
        document.getElementById("prompt1").value,
        document.getElementById("prompt2").value,
        document.getElementById("prompt3").value
      ];

      // Save them automatically
      chrome.storage.sync.set({ prompts: defaultPrompts }, () => {
        console.log("Default prompts saved automatically.");
      });
    } else {
      // Populate the textareas with saved prompts
      document.getElementById("prompt1").value = data.prompts[0] || "";
      document.getElementById("prompt2").value = data.prompts[1] || "";
      document.getElementById("prompt3").value = data.prompts[2] || "";
    }
  });
}

// Run on page load
initializePrompts();

// Save button functionality
document.getElementById("save").addEventListener("click", () => {
  const prompts = [
    document.getElementById("prompt1").value,
    document.getElementById("prompt2").value,
    document.getElementById("prompt3").value
  ];

  chrome.storage.sync.set({ prompts }, () => {
    alert("Prompts saved!");
  });
});
