const btnStart = document.querySelector('.btnStart')
const container = document.querySelector('.container')
const containerGame = document.querySelector('.containerGame')

// ANIMATIONS 

btnStart.classList.add('visible')   
  window.setTimeout(() => {
    btnStart.classList.add('animated') // animation of the button 
  }) // time in milliseconde before the animation start 

  btnStart.onclick = () => {
    
     btnStart.classList.remove('visible') // when we click on the button it's disappears
    container.style.display = "block" // the camera become an element block 
    window.setTimeout(() => {
    container.classList.add('visible') // the camera appears
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
containerGame.classList.add('animated') // animation of the button 
}, 3500)

setTimeout(function()
{
rootConteneur.classList.add('appearance') // animation of the button 
}, 3500)
 




  }