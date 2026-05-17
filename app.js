const form = document.getElementById("paymentForm");

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

  let tag = tagInput.replace("$", "").trim().replace(/\s/g, "");
  let amount = Number(amountInput);

  if (!tag) {
    alert("Please enter a valid Cash App tag");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  document.getElementById("rName").textContent = name;
  document.getElementById("rUnit").textContent = unit;
  document.getElementById("rAmount").textContent = amount.toFixed(2);

  const url = `https://cash.app/$${encodeURIComponent(tag)}/${amount}`;

  console.log("Cash App URL:", url);

  document.getElementById("result").classList.remove("hidden");

  document.getElementById("paymentLinkBtn").addEventListener("click", function () {
    if (!url) {
      alert("No payment generated yet");
      return;
    }

  window.location.href = url;
});
