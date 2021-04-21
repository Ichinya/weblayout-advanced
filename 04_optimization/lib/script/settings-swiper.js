let mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: false,

    scrollbar: {
        el: 'swiper-scrollbar',
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    cubeEffect: {
        slideShadows: true,
    },

});