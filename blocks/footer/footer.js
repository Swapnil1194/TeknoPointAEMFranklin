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


/* Main Class Added to write CSS Start */

document.querySelector('main').classList.add('main-blog-wrapper');

/* Main Class Added to write CSS End */

/* FAQ Section Logic Start */

let faq_ul_wrapper = document.querySelector(".blog-faq .default-content-wrapper");

let faq_ul = faq_ul_wrapper.querySelector('ul');

let faq_ul_li = faq_ul.children;


for (let i = 0; i < faq_ul_li.length; i++) {
  faq_ul_li[i].classList.add("blog-faq-list");
}

let faq_accordion = document.querySelectorAll(".blog-faq-list");


[...faq_accordion].forEach((i) => {
  i.addEventListener("click", function () {
    if (this.querySelector('ul').style.display == "block") {
      this.querySelector('ul').style.display = 'none';
      this.classList.remove("active");
      this.querySelector('ul').style.transition = "all 1s ease-out 2s";
    } else {
      faq_accordion.forEach((i) => { 
        debugger;
        i.querySelector('ul').style.display = 'none'; 
        i.querySelector('ul > li').classList.remove("active"); 
      });
      this.querySelector('ul').style.display = "block";
      this.classList.add("active");
      this.querySelector('ul').style.transition = "all 1s ease-in 2s";
    }
  });
});

function addingClass(a){
  for(var i = 0; i <= a.length -1; i++){
    a[i].classList.add("list-li-" + i);
  }
}

var rightSideDiv = document.querySelector(".blog-right-sec .table-wrapper .table").children
addingClass(rightSideDiv);

var blog_disc = document.querySelector(".blog-disclaimer .default-content-wrapper");

blog_disc.addEventListener("click", function(){
  this.classList.toggle("active");
});

/* Discalimer Logic End */
