import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBn0vVoElmZtvOuicF0AeMrzDLEmM9h1-s";

const ai = new GoogleGenerativeAI(API_KEY);

// const prompt = `
// write an interesting science fact in 3 lines or less.
// choose randomly between once of the following topics:
// - Music
// - Astrophysics
// - Biology
// - AI

// Add come emojis if it makes sense
// `;
const h1Text = document.querySelector("main h1");
const loader = document.querySelector("body");

function showLoader() {
  loader.classList.add("loading");
}
function hideLoader() {
  loader.classList.remove("loading");
}

function addError() {
  loader.classList.add("error");
}

function removeError() {
  loader.classList.remove("error");
}

function parseMarkdownToHTML(markdown) {
  return markdown
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // bold
    .replace(/^\s*[-*]\s+(.*)/gm, "<li>$1</li>") // bullets
    .replace(/\n{2,}/g, "<br><br>"); // double line breaks
}

async function main(promptValue) {
  showLoader();
  removeError();
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(promptValue);
    const text = await result.response.text();
    h1Text.innerHTML = parseMarkdownToHTML(text);
  } catch (error) {
    addError();
    console.log(error);

    h1Text.innerHTML = "An error happened please check the console...";
  }
  hideLoader();
}

// await main();

function handlePromptInput(event) {
  event.preventDefault();
  const inputValue = document.getElementById("input-text").value;
  main(inputValue);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", handlePromptInput);
});
