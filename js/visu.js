function visu (event) {
    console.log(event.target.parentElement.dataset.id)
    id = event.target.parentElement.dataset.id
    return id
}

module.export = visu()

