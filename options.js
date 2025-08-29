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

chrome.storage.sync.get("prompts", (data) => {
  if (data.prompts) {
    document.getElementById("prompt1").value = data.prompts[0] || "";
    document.getElementById("prompt2").value = data.prompts[1] || "";
    document.getElementById("prompt3").value = data.prompts[2] || "";
  }
});
