// Safety banner / non-clinical disclaimer
export function renderSafetyBanner(container, copy) {
  container.innerHTML = `
    <footer class="app-footer" role="contentinfo">
      <p class="safety-disclaimer">OAF OS is an operational tool. It does not provide medical, clinical, or emergency services.</p>
      <p class="footer-links">
        <a href="#/crisis-resources">Crisis Resources</a>
      </p>
    </footer>
  `;
}
