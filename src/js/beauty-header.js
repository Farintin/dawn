let detailsElems = [...document.querySelectorAll("details")]
detailsElems.forEach(details => {
    details.addEventListener("toggle", (event) => {
        if (details.open) {
            /* the element was toggled open */
            detailsElems.forEach(d => {
                if (!d.contains(details)) {
                    if (d.open) d.removeAttribute('open')
                }
            })
        } else {
            /* the element was toggled closed */
            let detailsElems = [...details.querySelectorAll("details")]
            detailsElems.forEach(details => details.removeAttribute('open'))
        }
    })
    
    /* let ativeLinkElems = [...details.querySelectorAll("ul li a.link.active")]
    if */
})
    
document.addEventListener('click', e => {
    const { target } = e
    if(!detailsElems.some(details => details.contains(target))) {
        detailsElems.forEach(details => details.removeAttribute('open'))
    }
})