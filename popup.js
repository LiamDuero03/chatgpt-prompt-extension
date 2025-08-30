const container = document.getElementById("buttons");

// Load prompts from storage
chrome.storage.sync.get({ prompts: [] }, (data) => {
  const prompts = data.prompts || [];

  container.innerHTML = ""; // clear old buttons

  if (prompts.length === 0) {
    // Optional: show a placeholder if no prompts
    const placeholder = document.createElement("p");
    placeholder.textContent = "No prompts available. Add some in Options.";
    container.appendChild(placeholder);
    return;
  }

  prompts.forEach((prompt) => {
    const btn = document.createElement("button");
    btn.className = "prompt-btn";
    btn.textContent = prompt.name || "Untitled Prompt";

    btn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (promptContent) => {
            const input = document.querySelector('div[contenteditable="true"]');
            if (!input) return;

            input.focus();
            input.innerText = promptContent;

            // Dispatch events to simulate typing and trigger UI updates
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
            input.dispatchEvent(new Event("keyup", { bubbles: true }));
          },
          args: [prompt.content]
        });
      });
    });

    container.appendChild(btn);
  });
});
