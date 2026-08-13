// 404 Not Found view
export function render(container, params, copy) {
  const errors = copy?.errors || {};
  container.innerHTML = `
    <div class="view view-not-found">
      <h1>Page Not Found</h1>
      <p>${errors.notFound || "That page doesn't exist."}</p>
      <a href="#/" class="btn btn-primary">Go Home</a>
      <p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p>
    </div>
  `;
}
