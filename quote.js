const fetch = require("node-fetch");
const fs = require("fs");

(async () => {
  const res = await fetch("https://zenquotes.io/api/today");
  const data = await res.json();
  const quote = data[0].q;
  const author = data[0].a;

  const readme = fs.readFileSync("README.md", "utf8");
  const newQuote = `> "${quote}" — **${author}**`;

  const updated = readme.replace(
    /<!-- QUOTE-START -->([\s\S]*?)<!-- QUOTE-END -->/,
    `<!-- QUOTE-START -->\n${newQuote}\n<!-- QUOTE-END -->`
  );

  fs.writeFileSync("README.md", updated);
})();
