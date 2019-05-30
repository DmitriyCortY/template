$('.b-field__see-pass').on('click', e => {

    let contextInput = $(e.target).parent().children('.b-field__input')
    let iconPlace = $(e.target).children('span')

    toogleInputType(contextInput, 'password', 'text')
    toogleClassIcon(iconPlace, 'pe-7s-lock', 'pe-7s-unlock')
})
function toogleInputType(input, type1, type2) {
    if (input.attr('type') === type1) {
        input.attr('type', type2)
    }
    else if (input.attr('type') === type2) {
        input.attr('type', type1)
    }
}
function toogleClassIcon(place, class1, class2) {
    if (place.hasClass(class1)) {
        place.removeClass(class1)
        place.addClass(class2)
    }
    else if (place.hasClass(class2)) {
        place.removeClass(class2)
        place.addClass(class1)
    }
}