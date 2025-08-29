chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "insertPrompt") {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.value = message.prompt;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
});
