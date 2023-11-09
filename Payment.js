const subBtn = document.querySelector('.submit-btn');
const popup = document.querySelector('.popup-wrapper')
const close = document.querySelector('.close');
const amount = localStorage.getItem('total');



subBtn.innerText = 'Pay ' + amount + ' Rs';

subBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    popup.style.display = 'block';
}) 

close.addEventListener('click',() =>{
    popup.style.display = 'none';
    const url = `./index.html`;
  window.location = url;
}) 


