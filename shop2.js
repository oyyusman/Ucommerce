searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

let shop =document.getElementById('shop');


let basket=JSON.parse(localStorage.getItem("data"))|| [];
let generateshop=()=>{
  return (shop.innerHTML=shopitemData.map((x)=>{
    let {id,name,price,description,img}=x
    // this function will update the number when we refresh the page
    let search=basket.find((x)=>x.id===id)|| []
      return ` <div id=product-id-${x.id} id=product class="item">
      <img width="220" src="${img}" alt="">
      <div class="details">
        <h2>${name}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
        <div class="price-quantity">
          <h2>$ ${price}</h2>
          <div class="butons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id =${id}  class="quantity">${search.item===undefined?0:search.item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
    </div>`
      
  }).join(""))
}
generateshop()
let increment=(id)=>{
  let selecteditem=id;
  console.log(basket)
  // the purpose of search function is that it will find if item is alreday pesent in the cart 
  // or not if present then it will incrment it other wise add it to the cart
  let search=basket.find((y)=>y.id===selecteditem.id)
  if(search===undefined){
    basket.push({
      id:selecteditem.id,
      item:1,
    })
  }
  else{
    search.item +=1;
  }
  
  
  // console.log(basket)
  update(selecteditem.id)
  localStorage.setItem("data",JSON.stringify(basket))
}
let decrement=(id)=>{
  let selecteditem=id;
  console.log(basket)
  // the purpose of search function is that it will find if item is alreday pesent in the cart 
  // or not if present then it will incrment it other wise add it to the cart
  let search=basket.find((y)=>y.id === selecteditem.id)
  if(search===undefined)return;
  else  if(search.item === 0) return;
  else{
    search.item -=1;
  }
  // console.log(basket)
  update(selecteditem.id)
  // when basket remains empty then to store nothin in local storage this function will help
    basket=basket.filter((x)=>x.item!==0)
  
  localStorage.setItem("data",JSON.stringify(basket))

}
// update the number in each item card
let update=(id)=>{
     let search=basket.find((x)=>x.id===id);
     console.log(search.item)
     document.getElementById(id).innerHTML=search.item
     calculation()
}
let calculation=()=>{
    let cartitem=document.getElementById("cartamount")
    // here x and y are the two numbers x is the first number and y is the 2nd number
    cartitem.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}
// this is for when we refresh the page the total remaind the smae
calculation()
