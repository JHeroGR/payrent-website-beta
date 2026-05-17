const form = document.getElementById("paymentForm");

function isMobileDevice() {
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    window.innerWidth <= 768
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("tenantName").value;
  const unit = document.getElementById("unitNumber").value;
  const amount = document.getElementById("rentAmount").value;
  const tag = document.getElementById("cashTag").value.replace("$", "");

  document.getElementById("rName").textContent = name;
  document.getElementById("rUnit").textContent = unit;
  document.getElementById("rAmount").textContent = amount;

  const linkEl = document.getElementById("paymentLink");
  const modeText = document.getElementById("modeText");

  const mobile = isMobileDevice();

  let url;

  url = `https://cash.app/$${tag}/${amount}`;

  linkEl.href = url;

  document.getElementById("result").classList.remove("hidden");
});
