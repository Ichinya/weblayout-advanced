window.onscroll = function() { window.scrollTo(0, 0); };
document.addEventListener('DOMContentLoaded', () => {
    const openBurger = document.querySelector('.burger')
    const closeBurger = document.querySelector('.close')
    var tl_1 = gsap.timeline()
    tl_1.from('.hero__title', { opcity: 0, y: 70, duration: .7 })
        .from('.hero__descr', { opacity: 0, y: 50, duration: .4 })
        .from('.hero__btn', { opacity: 0, y: 70, duration: .7 }, "-=1")
        .from('.photos-wrap1', { opacity: 0, duration: .4 })
        .from('.photos-wrap2', { opacity: 0, duration: .4 })
        .from('.photos-wrap3', { opacity: 0, duration: .4 })
        .from('.photos__author', { opacity: 0, duration: .4 }, "-=0.5")

    var tl_2 = gsap.timeline({ paused: true })
    tl_2.fromTo('.menu', { display: 'none' }, { display: 'block', duration: .1 })
        .from('.menu__top', { opacity: 0, y: -100, duration: .4 })
        .from('.menu', { backgroundColor: 'transparent', y: -100, duration: .4 })
        .to('.container menu__container', { opacity: 1, y: -100, duration: .3 })
        .from('.menu__nav', { opacity: 0, y: 50, duration: .3 })
        .from('.menu__right', { opacity: 0, y: 50, duration: .3 })
        .from('.social', { opacity: 0, y: -100, duration: .2 });

    openBurger.addEventListener('click', (event) => {
        event.preventDefault();
        tl_2.play()
    })
    closeBurger.addEventListener('click', (event) => {
        event.preventDefault();
        tl_2.reverse()
    })
})
