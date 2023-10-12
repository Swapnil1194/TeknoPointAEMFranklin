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

document.querySelector('.blog-right-sec > div > div').classList.add('main-table');

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

/* FAQ Section Logic End */

/* Discalimer Logic =Start */

function addingClass(a){
  for(var i = 0; i <= a.length -1; i++){
    a[i].classList.add("list-li-" + i);
    a[i].classList.add('blog-right-card');
  }
}

var rightSideDiv = document.querySelector(".blog-right-sec .table-wrapper .table").children
addingClass(rightSideDiv);

var blog_disc = document.querySelector(".blog-disclaimer .default-content-wrapper");

blog_disc.addEventListener("click", function(){
  this.classList.toggle("active");
});

/* Discalimer Logic End */


/* Header XF Logic Start */

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


/* Header XF Logic End */




/* blog form create lead call start */

let blogSbuBtn = document.querySelector(".blog-form-submit");

blogSbuBtn.addEventListener("click", function(e){
  e.preventDefault();
  console.log("clicked");

  var form = this.closest("form");

  var leadName = form.querySelector("#leadName").value;
  var leadNumber = form.querySelector("#leadNumber").value;
  var leadEmail = form.querySelector("#leadEmail").value;
  var leadPlan = form.querySelector("#leadPlan").value;

  var reqObj = {
    "requestJson": {
        "name": leadName,
        "mobileNumber": leadNumber,
        "emailAddress": leadEmail,
        "comments": leadPlan,
    },
    "token": {}
};

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {

  if(this.readyState === 1) {
      var response = {
        "statusCode": 200,
        "successMsg": "success",
        "responseJson": {
            "status": 200,
            "message": "Success",
            "data": {
                "message": "Success",
                "leadId": "536365"
            }
        }
    }

    return response;

  }
  /* if(this.readyState === 4) {
    console.log(this.responseText);
  } */
});

xhr.open("POST", "http://localhost:4504/content/tataaialifeinsurancecompanylimited/api/callcreateLead");
xhr.setRequestHeader("ClientID", "kJbc1W1YupprLcB8YZE0gla1T8APG3Mf");
xhr.setRequestHeader("UID", "b10cbb75fd877a84a5c719e52bb921358014aee1");
xhr.setRequestHeader("RequestTime", "1697097006323");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(reqObj);
});

/* blog form create lead call end */



/* table of content js start */

var table_content_list = document.querySelectorAll(".blog-table-content ul li a");
for(var i=0; i<table_content_list.length; i++){
  table_content_list[i].addEventListener("click", function(e){
    e.preventDefault();
    var href = this.getAttribute("href");
    var targetElement = document.querySelector(href);

    var target = targetElement.getBoundingClientRect().top + window.scrollY - 100;

    window.scrollTo({
      top: target,
      behavior: 'smooth'
    });

  });
}
/* table of content js end */