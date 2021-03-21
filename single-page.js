const handleIntersection = (entries) => {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src
            entry.target.removeAttribute("data-src")
            observer.unobserve(entry.target)
        }
    })
}

const observer = new IntersectionObserver(handleIntersection, {
    rootMargin: '0px 0px 10% 0px'
})

document.addEventListener('scroll', () => {
    let lazyImages = document.querySelectorAll('img[data-src]')
    let lazyIframe = document.querySelectorAll('iframe[data-src]')

    lazyImages.forEach(lazy => observer.observe(lazy))
    lazyIframe.forEach(lazy => observer.observe(lazy))
})
