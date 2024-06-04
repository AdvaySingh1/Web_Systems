/*const para = document.getElementById('p1');
const nav = document.getElementsByClassName('navigation');
const divs = document.getElementsByTagName('div');
const paras = document.getElementsByTagName('p');
const ids = document.querySelectorAll('div#shirish_img');


for(let i = 0; i < paras.length; i++){
    console.log(paras[i].style);
    paras[i].style.backgroundColor = 'pink';
}
console.log(para);
console.log(nav);
console.log(divs);
console.log(ids);*/
const nav = document.querySelector('div.navigation');
const button = document.createElement('button');
button.id = 'other';
button.innerText = 'something';
const link = document.createElement('a');
link.href = 'https://www.homedepot.com/';
link.append(button);
nav.append(link);
link.setAttribute('class','homedepot');
classes = ['shopping', 'more_shopping', 'wow_you_shop'];
for (i = 0; i < classes.length; i++){
    link.classList.add(classes[i]);
}
//link.setAttribute('class', 'otherclass');
link.setAttribute('id', 'thisID');
//console.log(link.getAttribute('class'), link.getAttribute('id'));
//console.log(link.classList.contains('more_shopping'));

button.remove();
link.remove();


// DOM treversal
/*const tab = document.documentElement.parentNode;
const body = document.querySelector('body');
//console.log(body.parentElement);
//console.log(body.childElementCount);
//console.log(body.childNodes);
console.log(body.firstChild, body.firstElementChild);
console.log(body.lastChild, body.lastElementChild);
const firstBodyElement = body.firstElementChild;
console.log(firstBodyElement.previousSibling, firstBodyElement.nextElementSibling);*/
//console.log(document.querySelector('button').namespaceURI);

// const table = document.getElementsByTagNameNS('https://www.worldometers.info/geography/how-many-countries-are-there-in-the-world/#google_vignette', 'body')
// console.log(nav.namespaceURI);

const bar = () => 5;

function foo (){
    alert(bar());
}
function changeColor(color){
    buttons_div.style.background =  color;
}

rand_b_2 = document.getElementById('rand_button_2');
rand_b_2.addEventListener("click", foo);
buttons_div = document.getElementById('rand_button');
//console.log(buttons_div);
buttons_div.addEventListener("mouseover", () => buttons_div.style.backgroundColor = 'white');
buttons_div.addEventListener("mouseout", () => changeColor('black'));


function changeCDisplay(content){
    if (content.classList.contains('hidden-content')){
        console.log('true');
        content.classList.remove('hidden-content');
    }
    else{
        content.classList.add('hidden-content');
    }
}

hiddenC = document.querySelector('.hidden-content');
revealB = document.querySelector('.reveal-btn');

revealB.addEventListener("click", () => changeCDisplay(hiddenC));


// event propogation

 div1 = document.querySelector('.div1');
 div2 = document.querySelector('.div2');
 capBtn = document.querySelector('.btn-event-capture');
 bubBtn = document.querySelector('.btn-event-bubble');


 window.addEventListener('click', function(e){if(e.target == capBtn){
    console.log(window)}}, true);
 div1.addEventListener('click', function(e){if(e.target == capBtn){
    console.log('div1')}}, true);
 div2.addEventListener('click',  function(e){if(e.target == capBtn){
    console.log('div2')}}, {once: true});
 capBtn.addEventListener('click', function(e) { console.log('capBtn')}, true);

 div1.addEventListener('click', function(e){if(e.target == bubBtn){
    console.log('div1')}}, false);
 div2.addEventListener('click',  function(e){if(e.target == bubBtn){
    console.log('div2');
    e.stopPropagation()}}, false);
 bubBtn.addEventListener('click', function(e) { console.log('BubBtn', e)}, false);

 // event deledation
 


 delUl = document.querySelector('.ed > ul');
 delUl.addEventListener('mouseover', function(e){
    //console.log(e.target);
    if (e.target.tagName == 'BUTTON'){
        e.target.style.backgroundColor = 'pink'
    }},
    true);

delUl.addEventListener('mouseout', function(e){
    e.target.style.backgroundColor = ''},
    true);










