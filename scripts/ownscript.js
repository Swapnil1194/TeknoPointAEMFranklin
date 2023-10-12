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

let  run =  function(urlValue) {
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
}

fetch("https://stage.tataaia.com/content/tataaialifeinsurancecompanylimited/api/articleblog.json", requestOptions)
  .then((response) =>  response.text())
  .then((result) => populateData(result))
  .catch(error => console.log('error', error));


/* Latest Article End */


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

/* Header XF Logic End */










