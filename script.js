let links = [];

async function shortenLink() {
  const input = document.getElementById("urlInput");
  const url = input.value.trim();

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

  links.push({ original: url, shortened });
  input.value = "";
  addCard(url, shortened, links.length - 1);
}

function addCard(original, shortened, index) {
  const list = document.getElementById("resultsList");

  const card = document.createElement("div");
  card.className =
    "bg-white mt-3 rounded-lg overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between";

  card.innerHTML = `
    <span class="px-4 py-4 md:py-4 text-gray-800 border-b border-gray-200 md:border-b-0 truncate">
      ${original}
    </span>
    <div class="flex flex-col md:flex-row items-start md:items-center gap-3 px-4 py-4 md:py-0">
      <span class="text-cyan-400 font-medium">${shortened}</span>
      <button
        id="copyBtn-${index}"
        onclick="copyLink('${shortened}', ${index})"
        class="bg-cyan-400 hover:bg-cyan-200 text-white px-6 py-2 rounded-md cursor-pointer transition w-full md:w-auto text-center"
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
