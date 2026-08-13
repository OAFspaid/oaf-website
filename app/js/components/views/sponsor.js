// Sponsor view
export function render(container, params, copy) {
  const s = copy?.screens?.sponsor || {};
  container.innerHTML = `
    <div class="view view-sponsor">
      <h1>${s.heading || 'Sponsor the Mission'}</h1>
      <p class="view-subtitle">${s.subheading || ''}</p>
      <p class="view-intro">${s.intro || ''}</p>
      <div class="card card--gold-rule">
        <p>${s.secureNotice || 'Payments are processed securely by Stripe.'}</p>
        <a href="https://operationantifragile.com/sponsor/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">${s.proceedLabel || 'Proceed to payment'}</a>
      </div>
    </div>
  `;
}
