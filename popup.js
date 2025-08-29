chrome.storage.sync.get({ prompts: [] }, (data) => {
  let prompts = data.prompts;

  // If nothing is saved yet, initialize with empty strings
  if (!prompts || prompts.length === 0) {
    prompts = ["", "", ""];
  }

  const container = document.getElementById("buttons");
  container.innerHTML = ""; // clear old buttons

  prompts.forEach((prompt, index) => {
    const btn = document.createElement("button");
    btn.textContent = `Insert Prompt ${index + 1}`;
    btn.style.display = "block";
    btn.style.margin = "5px 0";

    btn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (promptText) => {
            const input = document.querySelector('div[contenteditable="true"]');
            if (!input) return;
            input.focus();
            input.innerText = promptText;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          },
          args: [prompt] // use the actual saved text
        });
      });
    });

    container.appendChild(btn);
  });
});
