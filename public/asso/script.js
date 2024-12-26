const searchInput = document.getElementById('search');
const productsWrapperEl = document.getElementById('main');
const form = document.getElementById('form')
const checkEls = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
url = '/nams'

// Initialize cart item count

getfecth()

// Initialize products
const productsEls = [];



async function getfecth() {
    // Loop over the products and create the product element
    const res = await fetch(url)
    const data = await res.json()
        //productsWrapperEl.innerHTML = ''
    data.forEach((product) => {
        const productEl = createProductElement(product);
        productsEls.push(productEl);
        productsWrapperEl.appendChild(productEl);
    });

};
//}

filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Create product element
function createProductElement(product) {
    const productEl = document.createElement('div');
    productEl.innerHTML = `<a style="text-decoration:none;" onclick="movieselected('${product.id}')"href="#">
    <div class="movie">
    <img src="${product.client}">
    <div class="movie-info">
  <h3>${product.Aname.Name} ${product.Aname.Mname} ${product.Aname.Surname} </h3>
    </div></div> </a> `
    return productEl;
}

async function filterProducts() {
    const res = await fetch(url)
    const data = await res.json()
        // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get checked categories
    const checkedCategories = Array.from(checkEls)
        .filter((check) => check.checked)
        .map((check) => check.id);

    // Loop over products and check for matches
    productsEls.forEach((productEl, index) => {
        const product = nuasa[index];

        // Check to see if product matches the search or checked items
        const matchesSearchTerm = productEl.innerText.toLowerCase().includes(searchTerm);
        const isInCheckedCategory =
            checkedCategories.length === 0 ||
            checkedCategories.includes(product.YearofAdmin);

        // Show or hide product based on matches
        if (matchesSearchTerm && isInCheckedCategory) {
            productEl.classList.remove('hide');
        } else {
            productEl.classList.add('hide');
        }
    });
}
getmovieee();
async function getmovieee() {
    let objects = document.getElementById("objects");
    const res = await fetch(url)
    const data = await res.json()
    let allObject = data.filter((val) => {
        if (typeof val == 'object') {
            return true;
        } else { return false; }
    });
    let objectsLen = allObject.length;
    objects.innerHTML += "" + objectsLen
}


function movieselected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = '/asso/samplepreview.html';
    return false;

}

async function getmovie() {
    let movieId = sessionStorage.getItem('movieId');
    console.log(movieId)
    const res = await fetch(url)
    const data = await res.json()
    let id = data.filter(ids => ids.id === movieId);
    console.log(id)

    const html = id.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `
            <div class="user-profile">
                <div class="profile-top">
                    <img src="${user.client}">
                    <div class="profile-info">
                        <h2 style="color:white;text-align:center;margin-bottom:0px;line-height:2rem;">${user.Aname.Name} ${user.Aname.Mname} ${user.Aname.Surname}</h2>  
                        <h1 style="margin-top:3px;margin-bottom:0px;line-height:1rem;">>>>${user.NIN}
                    </div>
                
                </div>
                <div class="profile-bottom">
                    <div style="flex-direction:column;margin:-11px 0px;" class="profile-info"> 
                        <h1>- IMO STATE UNIVERSITY -</h1>
                            <h1 style="margin-top:-3px;color:red;font-size:12px;">-  MICROBIOLOGY STUDENTS ASSOCIATION -</h1>
                        </div>
                    </div>
                    <div class="profile-bottom">
                        <div style="display:flex;">
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">B/G</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.Bloodgroup}</h1>
                                </div>
                            </div>
                            <div style="width:45%;margin:0 1px;">
                            <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1rem;">STATUS/VALIDITY</h1>
                                <div style="flex-direction:column;"class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">${user.Status}</h1>
                                <h1 style="margin:0px;color:red;font-size:12px;margin-bottom:0px;line-height:.5rem;">- ${user.Presentclass} -</h1>
                                </div>
                            </div>
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">GENDER</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.Gender}</h1>
                                </div>
                            </div>
                        </div>
                        
                        <h1 style="font-size:12px;margin-top:-8px;text-align:center;padding:0 0rem;">LGA/STATE OF ORIGIN</h1>
                            <div style="flex-direction:column;"class="profile-info"> 
                                <h1 style="margin-top:-1px;">- ${user.State} -</h1>
                                <h1 style="margin:-5px;color:red;font-size:12px;">- ${user.HometownCommunity} -</h1>
                            </div> 
                            
                           <ul style="margin-bottom:7rem;">
                                <li>
                                    <img class="dropDown" src="./facebook.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:20rem;background-color: aqua;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:26.6rem;background-color: rgb(28, 88, 158);margin-left: -5rem;color:white">facebook:${user.Facebook}</li>
                                    </ul>
                                </li>
                                <li>
                                <img class="dropDown" src="./instagrame.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:5rem;background-color: red;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:27rem;background-color: red;margin-left:-10rem;color:white">instagrame:${user.Instagram}</li>
                                    </ul>
                                </li>
                                <li>
                                <img class="dropDown" src="./tiktok.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:5rem;background-color: orangered;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:27rem;background-color:#313131;margin-left: -14.8rem;color:white">tiktok:${user.Tiktok}</li>
                                    </ul>
                                </li>
                                <li>
                                <img class="dropDown" src="./twitter.jpg"style="width:60px;height:60px; border-radius:50px;"></span>
                                    <ul style="width:5rem;background-color: tomato;height: 2rem;justify-content: center; text-align: center;">
                                        <li style="justify-content: center;width:27rem;background-color: rgb(28, 88, 158);margin-left: -19.7rem;color:white">twitter:${user.Twitter}</li>
                                    </ul>
                                </li>
                            </ul>
                    </div>
                       
                    </div>       
                </div>
            </div>`
        facttext.appendChild(li)

    });
}
  