var mobView = window.matchMedia("(max-width: 768px)");


/* intersection observer code start*/
function observeIntersection(element, callback) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const intersecting = entry.isIntersecting;
      callback(intersecting);
    });
  });

  observer.observe(element);
}
/* intersection observer code end*/


/* Header Footer Start */
let headerShow = function(url) {
    run(url).then( function(response){
        var getHeader = document.querySelector('.header > div > div');
        var html = document.createElement("html");
        html.innerHTML = response;
        var aemGrid = html.querySelector(".aem-Grid");
        getHeader.innerHTML = aemGrid.innerHTML; 
    })

}

let footerShow = function(url) {
    run(url).then( function(response){
        var getFooter = document.querySelector('.footer-wrapper > div');
        var html = document.createElement("html");
        html.innerHTML = response;
        var aemGrid = html.querySelector(".aem-Grid");
        getFooter.innerHTML = aemGrid.innerHTML; 
    })

}

let run =  function(urlValue) {
    return new Promise( (resolve, reject) => {
        // Creating Our XMLHttpRequest object 
        let xhr = new XMLHttpRequest();
        // Making our connection  
        let url = urlValue;
        xhr.open("GET", url, true);
        // function execute after request is successful 
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            }
        }
        // Sending our request 
        xhr.send();
    })
}

let  runPost =  function(urlValue) {
  return new Promise( (resolve, reject) => {
      // Creating Our XMLHttpRequest object 
      let xhr = new XMLHttpRequest();
      // Making our connection  
      let url = urlValue;
      xhr.open("POST", url, true);
      // function execute after request is successful 
      xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              resolve(this.responseText);
          }
      }
      // Sending our request 
      xhr.send();
  })
}

// headerShow('https://qa.tataaia.com/content/experience-fragments/tataaia_life_insuran/en/aem_demo/xfheader/master.html');

window.addEventListener('scroll', function () { 
    footerShow('https://qa.tataaia.com/content/experience-fragments/tataaia_life_insuran/en/aem_demo/xffooter/master.html');
}, {once : true});

/* Header Footer End */

/* Latest Article Start */

 document.querySelector('.blog-right-sec') && document.querySelector('.blog-right-sec > div > div').classList.add('main-table');

var formdata = new FormData();
formdata.append("data", "{\"requestJson\":{\"pagePath\":\"/knowledge-centre\",\"resultType\":\"latestBlogs\",\"tag\":\"term\",\"limit\":\"5\",\"contributor\":\"\"}}");

var requestOptions = {
  method: 'POST',
  body: formdata,
};


const convertStringToHTML = htmlString => {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlString, 'text/html');

    return html.body;
}

let template;

function populateData (data) {
    var newData = JSON.parse(data);
    var renderLI = '';
    newData.forEach( function (eachData) {

        const pagePath = "http://qa.tataaia.com" + eachData.pagePath;
        const title= eachData.title;
        
        renderLI += '<li><a href='+pagePath +' title='+title+'>'+title+'</a></li>';

    });

    // add list-li-0 class when every is needed

    template += `
            <div class="list-li-0 blog-right-card">
            <div>
                <h4 id="related-articles">Latest Articles</h4>
                <ul class="render-list">
                    ${renderLI}
                </ul>
            </div>
            </div>
            `;
        
    var tabletoHTML = convertStringToHTML(template);
    var mainTable = document.querySelector('.main-table');
    var updatedDiv = tabletoHTML.querySelector('.blog-right-card');
    mainTable.append(updatedDiv);
    formShow();
}

fetch("https://stage.tataaia.com/content/tataaialifeinsurancecompanylimited/api/articleblog.json", requestOptions)
  .then((response) =>  response.text())
  .then((result) => populateData(result))
  .catch(error => console.log('error', error));


/* Latest Article End */

/* Form Article Start */

function formShow(){
  var mainTable = document.querySelector('.main-table');

  let newForm = `<div class="list-li-2">
                <h3>Looking for a financial solution to save tax? Speak to our expert</h3>
                <form class="blog-lead-form">
                    <div class="input-field">
                        <label>Name</label>
                        <input type="text" id="leadName" placeholder="Enter Full Name">
                        <p class="err-msg dsp-none">Please Enter Full Name</p>
                    </div>
                    <div class="input-field">
                        <label>Mobile Number</label>
                        <input type="text" id="leadNumber" maxlength="10" placeholder="Enter Mobile Number">
                        <p class="err-msg dsp-none">Please enter valid mobile number</p>
                    </div>
                    <div class="input-field">
                        <label>Email ID</label>
                        <input type="text" id="leadEmail" placeholder="Enter Email id">
                        <p class="err-msg dsp-none">Please enter valid email ID</p>
                    </div>
                    <div class="input-field">
                        <label>Plan</label>
                        <select id="leadPlan">
                            <option selected disabled hidden>Select Plan</option>
                            <option value="Term Plans">Term Plans</option>
                            <option value="Saving Plans">Saving Plans</option>
                            <option value="Retirement Plans">Retirement Plans</option>
                            <option value="Wealth Plans">Wealth Plans</option>
                            <option value="I don't know / I need help">I don't know / I need help</option>
                        </select>
                        <p class="err-msg dsp-none">Please select the plan</p>
                    </div>
                    <button class="blog-form-submit">Get a call back</button>
                    <p class="form-succes">Your details have been successfully submitted</p>
                </form>
              </div>`
  
    let div = document.createElement('div')
    div.classList.add('form');
    mainTable.append(div);
    document.querySelector('.main-table .form').innerHTML = newForm;
}

/* From Article End */





/* Main Class Added to write CSS Start */

document.querySelector('main').classList.add('main-blog-wrapper');

/* Main Class Added to write CSS End */

/* FAQ Section Logic Start */

function FAQWrapper () {
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
          i.querySelector('ul').style.display = 'none'; 
          i.classList.remove("active"); 
        });
        this.querySelector('ul').style.display = "block";
        this.classList.add("active");
        this.querySelector('ul').style.transition = "all 1s ease-in 2s";
      }
    });
  });
}

document.querySelector(".blog-faq") && FAQWrapper();


/* FAQ Section Logic End */

/* Discalimer Logic =Start */

function addingClass(a){
  for(var i = 0; i <= a.length -1; i++){
    a[i].classList.add("list-li-" + i);
    a[i].classList.add('blog-right-card');
  }
}

function Disclaimer() {
  
  var rightSideDiv = document.querySelector(".blog-right-sec .table-wrapper .table").children
  addingClass(rightSideDiv);
  
  var blog_disc = document.querySelector(".blog-disclaimer .default-content-wrapper");
  
  blog_disc.addEventListener("click", function(){
    this.classList.toggle("active");
  });
  
}

document.querySelector(".blog-right-sec") && Disclaimer();

/* Discalimer Logic End */


/* Header XF Logic Start */

  /* Desktop XF Logic Start */

      let xfHeaderLinks = document.querySelectorAll('.xf-rewamp-frag');

      for (let ii = 0; ii < xfHeaderLinks.length; ii++) {
        
          var xfLink = xfHeaderLinks[ii].getAttribute('data-fragment');
          await xfLinkCallBack(xfLink , xfHeaderLinks[ii]);
          
      }

      async function xfLinkCallBack (xfLink, dumpHTML) {
          var response = await run(xfLink);
          var html = document.createElement("html");
          html.innerHTML = response;
          var aemGrid = html.querySelector(".aem-Grid");
          dumpHTML.innerHTML = aemGrid.innerHTML;
      }

      let headerInnerNav = document.querySelectorAll('.ta-l0-nav-item');

      [...headerInnerNav].forEach( function (eachLiItem) {
        eachLiItem.addEventListener('mouseover', function () {
            var childrenLI = this.parentElement.children;
            for (let ii = 0; ii < childrenLI.length; ii++) {
              childrenLI[ii].classList.remove('active');
            }
            this.classList.add('active');
        });
      });

  /* Desktop XF Logic end */

  /* Mobile XF Logic Start */
      
  /* Mobile XF Logic end */


/* Header XF Logic End */




/* blog form create lead call start */
let blogSbuBtn = document.querySelector(".blog-form-submit") && StickyFrom();

/* blog form create lead call end */


/* sticky blog form logic start*/
  function isElementGettingVisibleFromBottom(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight;
  }

  function StickyFrom(){

    blogSbuBtn.addEventListener("click", function(e){
      e.preventDefault();
    
      var form = this.closest("form");
    
      var leadName = form.querySelector("#leadName").value;
      var leadNumber = form.querySelector("#leadNumber").value;
      var leadEmail = form.querySelector("#leadEmail").value;
      var leadPlan = form.querySelector("#leadPlan").value;
      
      var data = new FormData();
      var newdata = {"requestJson":
        {
        "name": leadName,
        "mobileNumber": leadNumber,
        "emailAddress": leadEmail
        }
      }
    
      newdata = JSON.stringify(newdata);
      data.append("data", newdata);
    
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
    
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
          document.querySelector(".form-succes").style.display = "block";
        }
      });
    
      xhr.open("POST", "https://qa.tataaia.com/content/tataaialifeinsurancecompanylimited/api/callcreateLead.json");
      xhr.send(data);
    
    });

    var faqSection = document.querySelector(".blog-faq");
    var blogFormPos = document.querySelector('.form').offsetTop;
    var faqPos = document.querySelector('.blog-faq').offsetTop;
  
    if(! mobView.matches){
      window.addEventListener("scroll", function(){
        var scrollPos = this.scrollY;
    
        if (scrollPos >  blogFormPos && (! isElementGettingVisibleFromBottom(faqSection))){
          document.querySelector('.form').classList.add('stickyForm');
        }else {
          console.log("Element is getting visible from the bottom.");
          document.querySelector('.form').classList.remove('stickyForm');
        }
      });  
    }
  }
/* sticky blog form logic end*/


/* table of content js start */

// var table_content_list = document.querySelectorAll(".blog-table-content ul li a") && TableOFContent();

// function TableOFContent(){
//   for(var i=0; i<table_content_list.length; i++){
//     table_content_list[i].addEventListener("click", function(e){
//       e.preventDefault();
//       var href = this.getAttribute("href");
//       var targetElement = document.querySelector(href);
  
//       var target = targetElement.getBoundingClientRect().top + window.scrollY - 100;
  
//       window.scrollTo({
//         top: target,
//         behavior: 'smooth'
//       });
  
//     });
//   }
// }
/* table of content js end */


/* Lozad  */

setTimeout(() => {
  lozad().observe();
}, 1000);

/* Product Page Js Start*/
var benefits_cards = document.querySelectorAll(".benefits-cards-section .benefits-wrapper .benefits > div");

for(var i=0; i<benefits_cards.length; i++){
  benefits_cards[i].classList.add("benefits-card");
}


var additional_benefits_cards = document.querySelectorAll(".additional-benefits-section .additional-benefits-wrapper .additional-benefits > div");

for(var i=0; i<additional_benefits_cards.length; i++){
  additional_benefits_cards[i].classList.add("additional_benefits-card");
}


var buy_section_cards = document.querySelectorAll(".buy-criteria-section .buy-section-wrapper .buy-section > div");

for(var i=0; i<buy_section_cards.length; i++){
  buy_section_cards[i].classList.add("buy_section-card");
}

var buying_steps_cards = document.querySelectorAll(".buying-steps-section .buying-steps-wrapper .buying-steps > div");

for(var i=0; i<buying_steps_cards.length; i++){
  buying_steps_cards[i].classList.add("buying-steps-card");
}

var product_importance_cards = document.querySelectorAll(".product-importance-section .product-importance-wrapper .product-importance > div");

for(var i=0; i<product_importance_cards.length; i++){
  product_importance_cards[i].classList.add("product-importance-cards");
}

var testimonials_cards = document.querySelectorAll(".testimonial-carousel .testimonial-wrapper .testimonial > div");

for(var i=0; i<testimonials_cards.length; i++){
  testimonials_cards[i].classList.add("testimonials-cards");
}

var testimonial_slider = document.querySelector('.testimonial-carousel .testimonial-wrapper');

var testimonial_prev_btn = document.createElement('button');
testimonial_prev_btn.classList.add('glider-prev');
testimonial_prev_btn.setAttribute('aria-label', 'Previous');
testimonial_slider.appendChild(testimonial_prev_btn);

var testimonial_next_btn = document.createElement('button');
testimonial_next_btn.classList.add('glider-next');
testimonial_next_btn.setAttribute('aria-label', 'Next');
testimonial_slider.appendChild(testimonial_next_btn);


var testimonial_dots = document.createElement('div');
testimonial_dots.setAttribute('role', 'tablist');
testimonial_dots.classList.add('dots');
testimonial_slider.appendChild(testimonial_dots);

document.addEventListener('scroll', function(){
  const targetElement = document.querySelector('.testimonial-carousel .testimonial-wrapper .testimonial');
  observeIntersection(targetElement, intersecting => {
    if (intersecting) {
      new Glider(document.querySelector('.testimonial-carousel .testimonial-wrapper .testimonial'),{
        slidesToShow: 1.13,
        slidesToScroll: 1,
        draggable: true,
        dots: '.dots',
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        },
        responsive:[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          }
        ]
      });
    }
  });
});

/* Product Page Js End*/