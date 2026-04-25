const rateContainer = document.querySelector('.rate-container');
const footer = document.querySelector('footer');
let rateValue;

document.addEventListener('click', function (event) {
  const isRateBtn = event.target.closest('.rate');

  if (isRateBtn) {
    const value = isRateBtn.dataset.rate;
    if (rateValue === value) {
      isRateBtn.classList.remove('active');
      rateValue = null;
      return;
    }

    document
      .querySelectorAll('.rate')
      .forEach((r) => r.classList.remove('active'));
    isRateBtn.classList.add('active');
    rateValue = value;
  }

  const isSubmitBtn = event.target.closest('.submit-btn');
  if (isSubmitBtn) {
    if (!rateValue) {
      alert('Please select the number!');
      return;
    }

    rateContainer.classList.add('hidden');

    const modal = document.createElement('div');
    modal.className = 'thank-you-card';
    modal.innerHTML = `
    <div class="illustration">
      <img
      src="./images/illustration-thank-you.svg"
      alt=""
      width="162"
      height="108"
      />
    </div>

    <p class="thank-you-badge">
        You selected ${rateValue} out of 5
    </p>

    <h1 class="text-2xl">Thank you</h1>

    <p class="thank-you-text">
      Thank you! We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!
    </p>
    `;

    if (footer) {
      document.body.insertBefore(modal, footer);
    } else {
      document.body.appendChild(modal);
    }

    requestAnimationFrame(() => {
      modal.classList.add('is-visible');
    });
  }
});
