
const form = document.querySelector("#shorten-form");
const urlInput = document.querySelector("#url-input");
const shortenButton = document.querySelector("#shorten-button");
const statusMessage = document.querySelector("#status-message");
const result = document.querySelector("#result");
const shortUrl = document.querySelector("#short-url");
const copyButton = document.querySelector("#copy-button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const url = urlInput.value.trim();

  statusMessage.textContent = "";
  result.hidden = true;
  shortenButton.disabled = true;
  shortenButton.textContent = "Shortening...";

  try {
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not shorten this URL.");
    }

    const generatedShortUrl = `${window.location.origin}/${data.code}`;

    shortUrl.href = generatedShortUrl;
    shortUrl.textContent = generatedShortUrl;
    result.hidden = false;
  } catch (error) {
    statusMessage.textContent =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";
  } finally {
    shortenButton.disabled = false;
    shortenButton.textContent = "Shorten URL";
  }
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shortUrl.href);
    copyButton.textContent = "Copied!";

    setTimeout(() => {
      copyButton.textContent = "Copy link";
    }, 2000);
  } catch {
    statusMessage.textContent =
      "Could not copy automatically. Select and copy the link instead.";
  }
});
