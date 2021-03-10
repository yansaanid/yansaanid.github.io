let error;
let StatusWeb = document.querySelector('.status')
StatusWeb.innerHtml = `status()`

const status = async function(){
  return await fetch('').then(s => {
    if (s.ok) {
      return `<div class=''>I'm just wake up</div>`
    } else {
      return `I'm on break`
    }
  }).catch(e => {
    error = e
    return `I'm have a poblem`
  })
}

