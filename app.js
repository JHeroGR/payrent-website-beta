const form = document.getElementById("paymentForm");

function isMobileDevice() {
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Inputs
  let name = document.getElementById("tenantName").value.trim();
  let unit = document.getElementById("unitNumber").value.trim();
  let amount = document.getElementById("rentAmount").value.trim();
  let tag = document.getElementById("cashTag").value.trim();

  // Normalize Cash App tag
  tag = tag.replace("$", "").replace(/\s/g, "");

  // Validate amount
  amount = parseFloat(amount);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  // Update UI
  document.getElementById("rName").textContent = name;
  document.getElementById("rUnit").textContent = unit;
  document.getElementById("rAmount").textContent = amount.toFixed(2);

  const linkEl = document.getElementById("paymentLink");
  const modeText = document.getElementById("modeText");

  const mobile = isMobileDevice();

  // ✅ Correct Cash App format (THIS is the key fix)
  const url = `https://cash.app/$${tag}`;

  linkEl.href = url;

  // Optional behavior text
  if (mobile) {
    modeText.textContent = "Mobile Mode: Opening Cash App app...";
  } else {
    modeText.textContent = "Desktop Mode: Opening Cash App page...";
  }

  // Optional: auto-open link
  window.location.href = url;

  document.getElementById("result").classList.remove("hidden");
});
