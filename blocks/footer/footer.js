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

document.querySelector('main').classList.add('main-blog-wrapper');

let faq_ul_wrapper = document.querySelector(".blog-faq .default-content-wrapper");

let faq_ul = faq_ul_wrapper.querySelector('ul');

let faq_ul_li = faq_ul.children;

for (let i = 0; i < faq_ul_li.length; i++) {
  faq_ul_li[i].classList.add("blog-faq-list");
}

let faq_accordion = document.querySelectorAll(".blog-faq-list");


[...faq_accordion].forEach((i) => {
  i.addEventListener("click", function () {
    faq_accordion.forEach((i) => { i.querySelector('ul').style.display = 'none' });
    if (this.querySelector('ul').style.display == "block") {
      this.querySelector('ul').style.display = 'none';
      this.querySelector('ul').style.transition = "all 1s ease-out 2s";
    } else {
      this.querySelector('ul').style.display = "block";
      this.querySelector('ul').style.transition = "all 1s ease-in 2s";
    }
  });
});