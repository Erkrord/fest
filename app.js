//MATERIALIZE JS
document.addEventListener('DOMContentLoaded', function () {
    const options = {
        format: 'mmm dd'
    }
    const elems = document.querySelectorAll('.datepicker');
    const instances = M
        .Datepicker
        .init(elems, options);

});
document.addEventListener('DOMContentLoaded', function () {
    const options = {
        twelveHour: false
    }
    const elems = document.querySelectorAll('.timepicker');
    const instances = M
        .Timepicker
        .init(elems, options);
});
document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('select');
    const instances = M
        .FormSelect
        .init(elems);
});

//MATERIALIZE JS END

// MAIN FILTERS AND COLORS
let category = document.querySelectorAll('.filmGenre')
let img = document.querySelectorAll('.card-image')
let catArr = []
let imgArr = []

for (let i = 0; i < category.length; i++) {
    catArr.push(category[i].innerHTML)
}
for (let i = 0; i < img.length; i++) {
    imgArr.push(img[i])
}

for (let i = 0; i < catArr.length; i++) {
    switch (catArr[i]) {
        case 'Wildlife Conservation Films':
            imgArr[i]
                .classList
                .add('card-image-red')
            break;
        case 'Environmental Films':
            imgArr[i]
                .classList
                .add('card-image-purple')
            break;
        case 'Youth and Children Films':
            imgArr[i]
                .classList
                .add('card-image-orange')
            break;
        case 'Wildfire Prevention Films':
            imgArr[i]
                .classList
                .add('card-image-yellow')
            break;
        case 'Non-Competition Films':
            imgArr[i]
                .classList
                .add('card-image-black')
            break;
        case 'Events':
            imgArr[i]
                .classList
                .add('card-image-blue')
            break;
        case 'Journalistic Competition':
            imgArr[i]
                .classList
                .add('card-image-brown')
            break;
        default:
            imgArr[i]
                .classList
                .add('card-image-green')
            break;

    }
}
// MAIN FILTERS AND COLORS END
