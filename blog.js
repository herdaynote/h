document.getElementById('menu').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('menu-show')
    document.body.classList.toggle('unscroll')
    document.getElementById('progress-bar').classList.toggle('progress-bar-hide')
})

const blurImage = (entries) => {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('blurry')
        } else {
            entry.target.classList.add('blurry')
        }
    })
}

const handleIntersection = (entries) => {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src
            entry.target.removeAttribute("data-src")
            observer.unobserve(entry.target)
        }
    })
}
document.addEventListener('scroll', () => {
    let scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100
    document.getElementById('progress-bar').style.width = scrolled + "%"
    
    let lazyImages = document.querySelectorAll('img[data-src]')

    for (let i=0; i<lazyImages.length; i++) {
        if (window.pageYOffset > 20) {
            observer.observe(lazyImages[i])
        }
    }
})

const images = document.querySelectorAll('article img')
const blur = new IntersectionObserver(blurImage, {
    root: null,
    rootMargin: '0px',
    threshold: .5,
})

images.forEach(image => blur.observe(image))
const observer = new IntersectionObserver(handleIntersection, {rootMargin: '0px 0px -80% 0px'})
