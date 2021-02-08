document.getElementById('menu').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('menu-show')
    document.body.classList.toggle('unscroll')
    document.getElementById('progress-bar').classList.toggle('progress-bar-hide')
})

const handleIntersection = (entries) => {
    entries.map((entry) => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src
            entry.target.removeAttribute("data-src")
            observer.unobserve(entry.target)
        }
    })
}

const observer = new IntersectionObserver(handleIntersection, {rootMargin: '0px 0px -80% 0px'})

document.addEventListener('scroll', () => {
    let scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100
    document.getElementById('progress-bar').style.width = scrolled + "%"

    let lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach(lazy => observer.observe(lazy))
})

setTimeout(() => {
    const adsScript = document.createElement('script')

    adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    adsScript.onerror = () => {
        console.log('Error Load adsbygoogle.js')
    }
    adsScript.onload = () => {
        const advertisement = document.querySelectorAll('ins.adsbygoogle')
        const adsMargin = document.querySelectorAll('ins.adsbygoogle.ads')

        advertisement.forEach(ads => {
            (adsbygoogle = window.adsbygoogle || []).push({})
        })
        adsMargin.forEach(ads => ads.classList.remove('ads'))
    }
    document.head.appendChild(adsScript)
}, 3000)

setInterval(() => {
    parent.location.reload(true)
}, 600000)
