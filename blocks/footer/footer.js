import { readBlockConfig, decorateIcons } from '../../scripts/aem.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);
    block.append(footer);
  }
}

setTimeout(() => {
    var blogHeaderSection = document.querySelector('.table-of-contents-what-is-nps-types-of-nps-investment-plans-why-invest-in-nps-top-16-reasons-final-thoughts-frequently-asked-questions-container .default-content-wrapper p');
    blogHeaderSection.classList.add('blogs-main-heading');
}, 3000);

