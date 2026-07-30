/* Operation Antifragile — Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  initHeaderNav();
  initKeyboardNav();
  initSkipLink();
  initFocusVisible();
});

function initHeaderNav() {
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('nav-panel');
  const submenuToggles = document.querySelectorAll('[data-nav-submenu-toggle]');
  const menuLinks = document.querySelectorAll('.site-nav__list a, .site-header__actions a');
  const desktopQuery = window.matchMedia('(min-width: 1025px)');

  function closeSubmenus(except) {
    submenuToggles.forEach(submenuToggle => {
      const shouldStayOpen = except && submenuToggle === except;
      submenuToggle.setAttribute('aria-expanded', shouldStayOpen ? 'true' : 'false');
      submenuToggle.parentElement.classList.toggle('is-open', Boolean(shouldStayOpen));
    });
  }

  function closePanel() {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', 'false');
    panel.classList.remove('is-open');
    document.body.classList.remove('nav-is-open');
    closeSubmenus();
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function() {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      panel.classList.toggle('is-open', !isExpanded);
      document.body.classList.toggle('nav-is-open', !isExpanded);

      if (isExpanded) {
        closeSubmenus();
      }
    });
  }

  submenuToggles.forEach(submenuToggle => {
    const item = submenuToggle.parentElement;

    submenuToggle.addEventListener('click', function() {
      const isExpanded = submenuToggle.getAttribute('aria-expanded') === 'true';
      closeSubmenus(isExpanded ? null : submenuToggle);
      submenuToggle.setAttribute('aria-expanded', String(!isExpanded));
      item.classList.toggle('is-open', !isExpanded);
    });

    item.addEventListener('mouseenter', function() {
      if (!desktopQuery.matches) return;
      closeSubmenus(submenuToggle);
      submenuToggle.setAttribute('aria-expanded', 'true');
      item.classList.add('is-open');
    });

    item.addEventListener('mouseleave', function() {
      if (!desktopQuery.matches) return;
      submenuToggle.setAttribute('aria-expanded', 'false');
      item.classList.remove('is-open');
    });

    item.addEventListener('focusout', function(event) {
      if (!item.contains(event.relatedTarget)) {
        submenuToggle.setAttribute('aria-expanded', 'false');
        item.classList.remove('is-open');
      }
    });
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (!desktopQuery.matches) {
        closePanel();
      }
    });
  });

  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', function() {
      closePanel();
    });
  }

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.site-header')) {
      closePanel();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePanel();
      if (toggle) {
        toggle.focus();
      }
    }
  });
}

function initKeyboardNav() {
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const main = document.getElementById('main');
      if (main) {
        main.focus({ preventScroll: true });
        scrollToElement(main);
      }
    });
  }
}

function initSkipLink() {
  if (document.querySelector('.skip-link')) return;
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

function initFocusVisible() {
  let isUsingKeyboard = false;
  document.addEventListener('keydown', function() {
    isUsingKeyboard = true;
  });
  document.addEventListener('mousedown', function() {
    isUsingKeyboard = false;
  });
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]'
  );
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      if (isUsingKeyboard) {
        this.dataset.focusVisible = 'true';
      }
    });
    
    element.addEventListener('blur', function() {
      delete this.dataset.focusVisible;
    });
  });
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollToElement(element) {
  if (prefersReducedMotion()) {
    element.scrollIntoView();
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
