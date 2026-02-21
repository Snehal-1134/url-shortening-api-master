let links = [];

async function shortenLink() {
  const input = document.getElementById("urlInput");
  const url = input.value;

  if (url === "") {
    document.getElementById("errorMsg").style.display = "block";
    input.style.border = "2px solid red";
    return;
  }
  document.getElementById("errorMsg").style.display = "none";
  input.style.border = "";

  const response = await fetch(
    "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url),
  );

  const shortened = await response.text();

  links.push({ original: url, shortened: shortened });

  input.value = "";

  addCard(url, shortened, links.length - 1);
}

function addCard(original, shortened, index) {
  const list = document.getElementById("resultsList");

  const card = document.createElement("div");
  card.style.cssText =
    "background:white; padding:16px; margin-top:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;";

  card.innerHTML = `
    <span>${original}</span>
    <div style="display:flex; align-items:center; gap:16px;">
      <span style="color:#2dd4bf;">${shortened}</span>
      <button
        id="copyBtn-${index}"
        onclick="copyLink('${shortened}', ${index})"
        class="bg-cyan-400 hover:bg-cyan-200 text-white px-4 py-2 rounded-md cursor-pointer transition"
      >
        Copy
      </button>
    </div>
  `;

  list.appendChild(card);
}

function copyLink(url, index) {
  navigator.clipboard.writeText(url);

  const btn = document.getElementById("copyBtn-" + index);
  btn.textContent = "Copied!";
  btn.classList.remove("bg-cyan-400", "hover:bg-cyan-200");
  btn.classList.add("bg-purple-950");
}
