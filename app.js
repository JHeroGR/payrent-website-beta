const form = document.getElementById("paymentForm");
const paymentBtn = document.getElementById("paymentLinkBtn");

let paymentUrl = "";

function isMobileDevice() {
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("tenantName").value || "";
  let unit = document.getElementById("unitNumber").value || "";
  let amountInput = document.getElementById("rentAmount").value || "";
  let tagInput = document.getElementById("cashTag").value || "";

  // Clean tag
  let tag = tagInput.replace("$", "").trim().replace(/\s/g, "");
  let amount = Number(amountInput);

  // Validation
  if (!tag) {
    alert("Please enter a valid Cash App tag");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  // Fill receipt details
  document.getElementById("rName").textContent = name;
  document.getElementById("rUnit").textContent = unit;
  document.getElementById("rAmount").textContent = amount.toFixed(2);

  // Generate Cash App URL
  paymentUrl = `https://cash.app/$${encodeURIComponent(tag)}/${amount.toFixed(2)}`;

  console.log("Cash App URL:", paymentUrl);

  // Show result section
  document.getElementById("result").classList.remove("hidden");
});

// Button click handler
paymentBtn.addEventListener("click", function () {
  if (!paymentUrl) {
    alert("No payment generated yet");
    return;
  }

  // Open Cash App
  if (isMobileDevice()) {
    window.location.href = paymentUrl;
  } else {
    window.open(paymentUrl, "_blank");
  }
});