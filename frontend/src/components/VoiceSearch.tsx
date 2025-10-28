// import { useState, useRef } from "react";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// export default function VoiceSearch({ onSearch }: { onSearch: (text: string) => void }) {
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef<any>(null);

//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Your browser does not support speech recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.continuous = true; // ✅ continuous listening
//     recognition.interimResults = true; // ✅ allow partial results

//     recognition.onstart = () => {
//       console.log("🎤 Recognition started");
//       setIsListening(true);
//     };

//     recognition.onaudiostart = () => console.log("🎧 Audio capturing started");
//     recognition.onspeechstart = () => console.log("🗣 Speech detected");
//     recognition.onspeechend = () => console.log("🛑 Speech ended");

//     recognition.onresult = (event: any) => {
//       const transcript = Array.from(event.results)
//         .map((r: any) => r[0].transcript)
//         .join("")
//         .trim();
//       if (transcript) {
//         console.log("✅ Recognized:", transcript);
//         onSearch(transcript);
//       }
//     };

//     recognition.onerror = (event: any) => {
//       console.warn("⚠️ Speech error:", event.error);
//       if (event.error === "no-speech") {
//         alert("No speech detected. Please try again.");
//       } else if (event.error === "not-allowed") {
//         alert("Microphone permission denied. Please enable mic access.");
//       }
//       setIsListening(false);
//     };

//     recognition.onend = () => {
//       console.log("🎤 Recognition ended");
//       setIsListening(false);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   return (
//     <button
//       onClick={isListening ? stopListening : startListening}
//       className={`p-2 rounded text-white transition-all ${
//         isListening ? "bg-red-500 animate-pulse" : "bg-slate-700 hover:bg-slate-800"
//       }`}
//     >
//       {isListening ? "🛑 Stop" : "🎤 Voice"}
//     </button>
//   );
// }
