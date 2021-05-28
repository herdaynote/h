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
    rootMargin: '0px 0px -80% 0px'
})

document.addEventListener('scroll', () => {
    let lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach(lazy => observer.observe(lazy))
})

const morePost = (url) => {
    const xhr = new XMLHttpRequest()
    document.querySelector('#blog-pager').innerHTML = "<div class='loading'>Memuat artikel <span>.</span><span>.</span><span>.</span></div>"
                      
    xhr.onreadystatechange = () => {
    if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const newHTML = (new DOMParser()).parseFromString(xhr.responseText, 'text/html')
            const articles = newHTML.querySelectorAll('article')
            const morePost = newHTML.querySelector('#blog-pager').innerHTML
            
            articles.forEach((article) => {
                document.querySelector('#content').append(article)
            })
            
            document.querySelector('#blog-pager').innerHTML = morePost
        }
    }

    xhr.open('GET', url, true)
    xhr.send()
}

const categoryPost = (url) => {
    const newObject = {
        Title: 'herdaynote',
        Url: url
    }
    history.pushState(newObject, newObject.Title, newObject.Url)

    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const newHTML = (new DOMParser()).parseFromString(xhr.responseText, 'text/html')
            const articles = newHTML.querySelector('#content').innerHTML
            const morePost = newHTML.querySelector('#blog-pager').innerHTML
            
            document.querySelector('#content').innerHTML = articles
            document.querySelector('#blog-pager').innerHTML = morePost
        }
    }
    xhr.open('GET', url, true)
    xhr.send()
}

document.querySelectorAll('nav ul li a').forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('menu-show')
        document.body.classList.toggle('unscroll')
        document.getElementById('progress-bar').classList.toggle('progress-bar-hide')
    })
})
