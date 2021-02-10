const imgModalStyle = document.createElement('style')
imgModalStyle.innerHTML = '#img-modal{position:fixed;width:100%;height:100%;z-index:3;background:rgba(0,0,0,.75)}#img-modal img{width:75%;top:50%;left:50%;transform:translate(-50%,-50%);position:absolute}@media(max-width:1280px){#img-modal img{width:90%}}'
document.head.appendChild(imgModalStyle)

const articleImg = document.querySelectorAll('article img')
let modal

articleImg.forEach(imgShow => {
    imgShow.addEventListener('click', () => {
        const imgModal = document.createElement('div')
        imgModal.id = 'img-modal'
        imgModal.innerHTML = '<img/>'
        document.body.appendChild(imgModal)
    
        let img = document.querySelector('#img-modal img')
        img.src = imgShow.src
        img.alt = imgShow.alt
    
        modal = document.getElementById('img-modal')
        document.body.style.overflow = 'hidden'
    }) 
})

window.addEventListener('click', event => {
    if (event.target == modal) {
        modal.remove()
        document.body.removeAttribute('style')
    }
})
