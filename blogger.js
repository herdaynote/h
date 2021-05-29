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
    rootMargin: '0px 0px 0px 0px'
})

document.getElementById('menu').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('menu-show')
    document.body.classList.toggle('unscroll')
    document.getElementById('progress-bar').classList.toggle('progress-bar-hide')
})

document.querySelector('#search-icon svg').addEventListener('click', () => {
    document.getElementById('search-form').classList.toggle('search-hide')
    document.getElementById('title').classList.toggle('search-hide')
})

document.addEventListener('scroll', () => {
    let scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100
    document.getElementById('progress-bar').style.width = scrolled + "%"

    let lazyImages = document.querySelectorAll('img[data-src]')
    let lazyIframe = document.querySelectorAll('iframe[data-src]')

    lazyImages.forEach(lazy => observer.observe(lazy))
    lazyIframe.forEach(lazy => observer.observe(lazy))
})

const showAds = () => {
    const advertisement = document.querySelectorAll('ins.adsbygoogle')
    const adsMargin = document.querySelectorAll('ins.adsbygoogle.hide')
    adsMargin.forEach(ads => ads.classList.remove('hide'))
    advertisement.forEach(ads => {
        (adsbygoogle = window.adsbygoogle || []).push({})
    })
}

const morePost = (url) => {
    const xhr = new XMLHttpRequest()
    document.querySelector('#pagination').innerHTML = '<div id="loading">Memuat artikel <span>.</span><span>.</span><span>.</span></div>'

    xhr.onreadystatechange = () => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const newHTML = (new DOMParser()).parseFromString(xhr.responseText, 'text/html')
            const articles = newHTML.querySelectorAll('article')
            const pagination = newHTML.querySelector('#pagination').innerHTML

            articles.forEach((article) => {
                document.querySelector('#multi-post').append(article)
            })
            document.querySelector('#pagination').innerHTML = pagination
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}

const categoryPost = (url) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const newHTML = (new DOMParser()).parseFromString(xhr.responseText, 'text/html')
            const newContent = newHTML.querySelector('#Blog1').innerHTML

            document.querySelector('#Blog1').innerHTML = newContent

            const newObject = {
                Title: 'herdaynote',
                Url: url
            }
            history.pushState(newObject, newObject.Title, newObject.Url)

            document.querySelector('nav').classList.toggle('menu-show')
            document.body.classList.toggle('unscroll')
            document.getElementById('progress-bar').classList.toggle('progress-bar-hide')
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}

const openPost = (url) => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const newHTML = (new DOMParser()).parseFromString(xhr.responseText, 'text/html')
            const newContent = newHTML.querySelector('#Blog1').innerHTML

            document.head.innerHTML = newHTML.head.innerHTML
            document.querySelector('#Blog1').innerHTML = newContent

            const newObject = {
                Title: 'herdaynote',
                Url: url
            }
            history.pushState(newObject, newObject.Title, newObject.Url)

            setTimeout(() => {
                showAds()
            }, 500)
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}

setTimeout(() => {
    const adsScript = document.createElement('script')
    adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    adsScript.onerror = () => {
        const adsStyle = document.createElement('style')
        const adsBlock = document.createElement('div')
        adsBlock.id = 'adsblock'
        adsBlock.innerHTML = '<div id="ads-warning"><svg viewBox="0 0 24 24"><path d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7" /></svg><div>Silakan Matikan Adsblock Anda Agar Dapat Mengakses Situs Ini!</div></div>'
        adsStyle.innerHTML = '#adsblock{position:fixed;width:100%;height:100%;z-index:2;background:#f22c40}#ads-warning{position:fixed;width:80%;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}#ads-warning svg{width:125px;fill:#fff}#ads-warning div{font-weight:700;color:#fff}}'
        document.head.appendChild(adsStyle)
        document.body.innerHTML = ''
        document.body.append(adsBlock)
        document.body.style.overflow = 'hidden'
    }
    adsScript.onload = () => {
        showAds()
    }
    document.head.appendChild(adsScript)
}, 3000)

setInterval(() => {
    parent.location.reload(true)
}, 600000)
