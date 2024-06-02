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
console.log(link.getAttribute('class'), link.getAttribute('id'));
console.log(link.classList.contains('more_shopping'));

button.remove();
link.remove();



