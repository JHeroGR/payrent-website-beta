const form = document.getElementById("paymentForm");

function isMobileDevice() {
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // ===== INPUTS =====
  let name = document.getElementById("tenantName").value || "";
  let unit = document.getElementById("unitNumber").value || "";
  let amountInput = document.getElementById("rentAmount").value || "";
  let tagInput = document.getElementById("cashTag").value || "";

  // ===== CLEAN DATA =====
  let tag = tagInput
    .replace("$", "")
    .trim()
    .replace(/\s/g, "");

  let amount = Number(amountInput);

  // ===== VALIDATION =====
  if (!tag) {
    alert("Please enter a valid Cash App tag");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  // ===== UPDATE UI =====
  document.getElementById("rName").textContent = name;
  document.getElementById("rUnit").textContent = unit;
  document.getElementById("rAmount").textContent = amount.toFixed(2);

  const linkEl = document.getElementById("paymentLink");
  const modeText = document.getElementById("modeText");

  // ===== BUILD SAFE CASH APP URL =====
  const url = `https://cash.app/$${encodeURIComponent(tag)}/${amount}`;

  console.log("Cash App URL:", url);

  linkEl.href = url;

  // ===== MODE TEXT =====
  if (isMobileDevice()) {
    modeText.textContent = "Mobile Mode: Opening Cash App...";
  } else {
    modeText.textContent = "Desktop Mode: Opening Cash App page...";
  }

  // ===== SAFE REDIRECT (Safari FIX) =====
  document.getElementById("result").classList.remove("hidden");

  // IMPORTANT: single navigation only
  window.location.assign(url);
});
