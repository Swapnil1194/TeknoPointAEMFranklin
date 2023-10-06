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

document.querySelector('.main-blog-wrapper').querySelectorAll('.default-content-wrapper')[0].querySelector('p').classList.add('blogs-main-heading');

document.querySelector('.main-blog-wrapper').querySelectorAll('.default-content-wrapper')[1].querySelector('p').classList.add('blogs-sub-heading');

var blogOrderList = document.querySelector('.main-blog-wrapper').querySelectorAll('.default-content-wrapper')[1].querySelectorAll('ol');
for (var i=0; i<blogOrderList.length; i++){
    blogOrderList[i].classList.add('blogs-order-list');
}

var blogUnrderList = document.querySelector('.main-blog-wrapper').querySelectorAll('.default-content-wrapper')[1].querySelectorAll('ul');
for (i=0; i<blogUnrderList.length; i++){
    blogUnrderList[i].classList.add('blogs-unorder-list');
}
