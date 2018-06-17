const btnStart = document.querySelector('.btnStart')
const container = document.querySelector('.container')
const containerGame = document.querySelector('.containerGame')


// ANIMATIONS 

btnStart.classList.add('visible')   
  window.setTimeout(() => {
    btnStart.classList.add('animated') 
  }) 

  btnStart.onclick = () => {
    
     btnStart.classList.remove('visible') 
    container.style.display = "block" 
    window.setTimeout(() => {
    container.classList.add('visible') 
    },)
   

setTimeout(function()
 {
document.getElementById("screen").style.display = "none";
 }, 3500)

 setTimeout(function()
 {
document.getElementById("border").style.display = "none";
 }, 3500)

 setTimeout(function()
 {
containerGame.classList.add('animated') 
}, 3500)

setTimeout(function()
{
rootConteneur.classList.add('appearance') 
}, 3500)
 

  }

