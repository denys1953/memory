let field = document.getElementById('field-type')
let start = document.getElementById('start')
let level = document.getElementById('level')

let difficult = 1
let array = []

start.addEventListener('click', main)

function main() {
   drawField()
   setTimeout(() => {
      for (let i = 0; i < difficult; i++) {
         setTimeout(function timer() {
            random()
         }, i*700)
      }
      setTimeout(() => {
         let elems = document.getElementsByClassName('elem')
         for (let i = 0; i < elems.length; i++) {
            elems[i].addEventListener('mousedown', startClick)
         }
      }, difficult*700)
   }, 500)
}


function drawField() {
   array = []
   field.innerHTML = ''
   start.hidden = true
   level.innerHTML = 'level: 1'
   for (let i = 0; i < 9; i++) {
      let elem = document.createElement('div')
      field.append(elem);
      elem.setAttribute('id', i)
      elem.className = 'elem'
      elem.innerHTML = " ";
   }
}
function random() {
   let elems = document.getElementsByClassName('elem')
   let rand = randomInteger(0, 8)
   array.push(rand)
   setTimeout(() => {
      elems[rand].classList.add('active')
      setTimeout(() => {
         elems[rand].style.transition = 'all ease 0.3s'
         elems[rand].classList.remove('active')
      }, 300)
      elems[rand].style.transition = 'none'
      elems[rand].removeAttribute('style')
   }, 300)
}

function startClick() {
   if (array.length !== 1) {
      if (this.id == array[0]) {
         array.shift()
         this.classList.add('active')
         setTimeout(() => {
            this.style.transition = 'all ease 0.2s'
            this.classList.remove('active')
         }, 200)
         console.log(this)
      } else {
         alert('you lose, your score is ' + difficult)
         difficult = 1
         field.innerHTML = ''
         start.hidden = false
      }
   } else {
      console.log(this.id)
      if (this.id == array[0]) {
         this.classList.add('active')
         setTimeout(() => {
            this.style.transition = 'all ease 0.2s'
            this.classList.remove('active')
         }, 200)
         setTimeout(() => {
            this.removeEventListener('click', startClick)
            difficult++
            main()
            level.innerHTML = 'level: ' + difficult
         }, 400)
      } else {
         alert('you lose, your score is ' + difficult)
         difficult = 1
         field.innerHTML = ''
         start.hidden = false
      }
   }
}

function randomInteger(min, max) {
   let rand = min - 0.5 + Math.random() * (max - min + 1);
   return Math.round(rand);
}