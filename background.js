// Default prompts
const defaultPrompts = [
  `{
  "role": "You are a highly skilled and knowledgeable AI-Assistant in a scientifc field...",
  "context": "...",
  "output_format": "...",
  "what_to_avoid": "...",
  "instruction": "...",
  "question":""
}`,
  `{
  "role": "You are an expert AI-Assistant with deep knowledge in scientific and technical fields...",
  "context": "...",
  "output_format": "...",
  "what_to_avoid": "...",
  "instruction": "..."
}`,
  `{
  "role": "You are an expert AI-Assistant with deep knowledge in scientific and technical fields...",
  "context": "...",
  "output_format": "...",
  "what_to_avoid": "...",
  "instruction": "..."
}`
];

// Initialize storage if empty
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({ prompts: [] }, (data) => {
    if (!data.prompts || data.prompts.length === 0) {
      chrome.storage.sync.set({ prompts: defaultPrompts }, () => {
        console.log("Default prompts automatically saved in storage.");
      });
    }
  });
});