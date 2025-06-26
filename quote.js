import fetch from 'node-fetch';
import { readFileSync, writeFileSync } from 'fs';

const res = await fetch("https://zenquotes.io/api/today");
const data = await res.json();
const quote = data[0].q;
const author = data[0].a;

const readme = readFileSync("README.md", "utf8");
const newQuote = `> "${quote}" — **${author}**`;

const updated = readme.replace(
  /<!-- QUOTE-START -->([\s\S]*?)<!-- QUOTE-END -->/,
  `<!-- QUOTE-START -->\n${newQuote}\n<!-- QUOTE-END -->`
);

const match = readme.match(/<!-- QUOTE-START -->([\s\S]*?)<!-- QUOTE-END -->/);
if (!match) {
  console.log("❌ Placeholder not found! Please check README.md format.");
} else {
  console.log("✅ Placeholder found, updating...");
}


writeFileSync("README.md", updated);
