// Events inputs and outputs
document.addEventListener("DOMContentLoaded", () => {
  initializeRecognition();
  document.getElementById("encrypt").addEventListener("click", encryptText);
  document.getElementById("decrypt").addEventListener("click", decryptText);
  document.getElementById("logoImg").addEventListener("click", toggleModifiers);
  document.getElementById("copy").addEventListener("click", copyToClipboard);
  document.getElementById("voiceInput").addEventListener("click", startRecognition);
  document.getElementById("textInput").addEventListener("click", stopRecognition);
});

// Encript dictionary
const diccionarioEncriptar = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

// Decrypt dictionary
const diccionarioDesencriptar = Object.fromEntries(
  Object.entries(diccionarioEncriptar).map(([clave, valor]) => [valor, clave])
);

// Encrypting
function encryptText() {
  let text = document.getElementById("input-text").value.toLowerCase();
  let textOutput = encrypt(text);
  updateOutput(textOutput);
}

function decryptText() {
  let text = document.getElementById("input-text").value.toLowerCase();
  let textOutput = decrypt(text);
  updateOutput(textOutput);
}

// Update output text
function updateOutput(textOutput) {
  let output = document.getElementById("output-text");
  output.textContent = textOutput;
}

// Encrypt function
function encrypt(text) {
  return text
    .split("")
    .map((char) => diccionarioEncriptar[char] || char)
    .join("");
}

// Decrypt function
function decrypt(text) {
  let decryptedText = text;
  for (const [key, value] of Object.entries(diccionarioDesencriptar)) {
    decryptedText = decryptedText.replace(new RegExp(key, "g"), value);
  }
  return decryptedText;
}

// show options inputs output
function toggleModifiers() {
  document.getElementsByClassName("options")[0].classList.toggle("modifiers");
}

// copy to clipboard
function copyToClipboard() {
  let text = document.getElementById("output-text").textContent;
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Text copied to clipboard");
    },
    (err) => {
      alert("Could not copy text: ", err);
    }
  );
}

// Inicializa el reconocimiento de voz
function initializeRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
      alert("Lo siento, tu navegador no soporta la API de reconocimiento de voz.");
  } else {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "es-ES";
      
      recognition.onresult = handleResult;
      recognition.onerror = handleError;
  }
}

// Maneja el evento de resultado del reconocimiento de voz
function handleResult(event) {
  const transcript = event.results[0][0].transcript;
  document.getElementById("input-text").textContent += transcript + "\n";
}

// Maneja el evento de error del reconocimiento de voz
function handleError(event) {
  console.error("Error en el reconocimiento de voz:", event.error);
}

// Inicia el reconocimiento de voz
function startRecognition() {
  if (recognition) {
      recognition.start();
  }
}

// Detiene el reconocimiento de voz
function stopRecognition() {
  if (recognition) {
      recognition.stop();
  }
}
