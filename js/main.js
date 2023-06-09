
gsap.registerPlugin(TextPlugin, ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".all-content"),
    smooth: true,
    initPosition: { x: 0, y: 0 },
    mobile: {
        smooth: true,
    },
    tablet: {
        smooth: true,
        breakpoint: 0,
    }
});



locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".all-content", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector(".all-content").style.transform ? "transform" : "fixed"
});




// animations

ScrollTrigger.defaults({
    scroller: ".all-content"
})



ScrollTrigger.create({
    trigger: '.about',
    start: 'top top',
    end: '100% top',
    pin: true,
    scrub: 2,
})


ScrollTrigger.create({
    trigger: '.offers',
    scroller: '.all-content',
    pin: true,
    start: 'top top',
    end: '+=240%',

})


document.querySelector('.header__item--about').addEventListener('click', () => {
    locoScroll.scrollTo('.about')
})

document.querySelector('.header__item--skills').addEventListener('click', () => {
    locoScroll.scrollTo('.skills')
})

document.querySelector('.header__item--works').addEventListener('click', () => {
    locoScroll.scrollTo('.works')
})

document.querySelector('.header__item--contacts').addEventListener('click', () => {
    locoScroll.scrollTo('.legendary')
})



// ABOUT

const aboutBackgroundTimeline = gsap.timeline({ delay: 4 })

aboutBackgroundTimeline.to('.about__bg', {
    rotation: 22,
    transformOrigin: "left top",
    duration: 3,
    ease: 'back'
}, 0)
    .to('.about__bg', {
        rotation: 24,
        yoyo: true,
        repeat: -1,
        duration: 4,
    })

const aboutTextTimeline = gsap.timeline({
    delay: 3.5
})

gsap.fromTo('.about__frame', {
    opacity: 0
}, {
    opacity: 0.7,
    scrollTrigger: {
        trigger: '.offers',
        start: 'top top'
    }
})


aboutTextTimeline.to('.intro__hi', {
    duration: 0.7,
    text: 'Hello!',

})
    .to('.intro__text', {
        duration: 3,
        text: "My name is Tim, and I'm a frontend developer passionate about creating beautiful and user-friendly websites.",
    }, 1)



gsap.to('.about__bg', {
    scrollTrigger: {
        trigger: '.about__bg',

        start: 'bottom top',
    },
    y: '150vh',
    duration: 2,
})


// OFFERS

const offersTimeline = gsap.timeline()

offersTimeline.fromTo('.offers__left', {
    opacity: 0,
    scale: 0.8,
}, {
    opacity: 1,
    scale: 1,
    scrollTrigger: {
        trigger: '.offers__container',
        scrub: 2,

        start: '20% top',
        end: '+=50%',
    },
    duration: 12,
})


const offersMedia = gsap.matchMedia();

offersMedia.add("(min-width: 768px)", () => {

    offersTimeline.fromTo(".offers__right", {
        yPercent: 100
    }, {
        yPercent: -85,
        scrollTrigger: {
            trigger: '.offers__right',
            scrub: 1,

            start: () => {
                return `${ document.querySelector('.offers__right').offsetHeight } bottom`
            },
            end: () => `${ document.querySelector('.offers__right').offsetHeight * 2.5 } top`,

        },
    })

    document.querySelectorAll('.offers__item').forEach((item, i) => {
        offersTimeline.fromTo(item, {
            opacity: 0,
            scaleY: 0.7,
            scaleX: 0.4,
        }, {
            keyframes: {
                '20%': {
                    opacity: 1,
                    scaleY: 1,
                    scaleX: 1,
                },
                '75%': {
                    opacity: 1,
                    scaleY: 1,
                    scaleX: 1,
                },
                '100%': {
                    opacity: 0,
                    scaleY: 0.7,
                    scaleX: 0.4,
                },
            },

            scrollTrigger: {
                trigger: '.offers__right',
                scrub: 1,
                start: () => {
                    return `${ document.querySelector('.offers__right').offsetHeight + (item.offsetHeight + 60) * i } 95%`
                },
                end: () => {
                    return `${ document.querySelector('.offers__right').offsetHeight + (item.offsetHeight + 60) * i } 15%}`
                }

            },

        })
    })
})

offersMedia.add("(max-width: 768px)", () => {

    offersTimeline.fromTo(".offers__right", {
        yPercent: 80
    }, {
        yPercent: -75,
        scrollTrigger: {
            trigger: '.offers__right',
            scrub: 1,

            start: () => {
                return `${ document.querySelector('.offers__right').offsetHeight } bottom`
            },
            end: () => `${ document.querySelector('.offers__right').offsetHeight * 2.5 } top`,

        },
    })

    document.querySelectorAll('.offers__item').forEach((item, i) => {
        offersTimeline.fromTo(item, {
            opacity: 0,
            scaleY: 0.7,
            scaleX: 0.4,
        }, {
            keyframes: {
                '20%': {
                    opacity: 1,
                    scaleY: 1,
                    scaleX: 1,
                },
                '85%': {
                    opacity: 1,
                    scaleY: 1,
                    scaleX: 1,
                },
                '100%': {
                    opacity: 0,
                    scaleY: 0.7,
                    scaleX: 0.4,
                },
            },

            scrollTrigger: {
                trigger: '.offers__right',
                scrub: 1,

                start: () => {
                    return `${ document.querySelector('.offers__right').offsetHeight + (item.offsetHeight + 60) * i } 95%`
                },
                end: () => {
                    return `${ document.querySelector('.offers__right').offsetHeight + (item.offsetHeight + 60) * i } ${ window.innerHeight * 0.1 + document.querySelector('.offers__left').offsetHeight }}`
                }

            },

        })
    })
})


//skills

ScrollTrigger.create({
    trigger: '.skills',
    scroller: '.all-content',
    pin: true,
    start: '100% bottom',
    end: '+=700%',

})

const skillsMedia = gsap.matchMedia();


const skillsBgTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.skills',
        start: '100% bottom',
        end: '+=650%',
        scrub: 1,
    },
    ease: 'none'
})

skillsMedia.add({
    xl: "(min-width: 1601px)",
    lg: "(max-width: 1600px)",
    md: "(max-width: 540px)",
    xs: "(max-width: 400px)"
}, (context) => {
    let { xl, lg, md, xs } = context.conditions;

    skillsBgTimeline.to('.skills__computers', {
        scale: () => {
            if (xs) return 1.2
            if (md) return 1.4

            if (xl) {
                return 3.2
            }
            if (lg) return 2
        },
        duration: 30,
        transformOrigin: 'left center',
        yPercent: -30,
    })

        .to('.skills__bg', {
            scale: 1.75,
            duration: 30,
            transformOrigin: 'center center'
        }, 0)
        .to('.skills__display-shadow', {
            opacity: 0.1,
            duration: 20
        }, 0)
        .from('.skills__text', {
            duration: 10,
            opacity: 0,
            yPercent: 30

        }, '<+=10')
        .fromTo('.skills__list-up', {
            yPercent: 70,
        }, {
            yPercent: -100,
            duration: 100,
        })
        .fromTo('.skills__list--2', {
            yPercent: -70,
        }, {
            yPercent: 100,
            duration: 100,
        }, "<")
        .to('.skills__text', {
            duration: 10,
            opacity: 0,
            yPercent: -30

        })
        .to('.skills__computers', {
            scale: 1,
            duration: 30,
            yPercent: 0
        }, '<')
        .to('.skills__bg', {
            scale: 1,
            duration: 30,
            transformOrigin: 'center center'
        }, "<")
        .to('.skills__display-shadow', {
            opacity: 1,
            duration: 20
        }, '<+=15')
})




// WORKS

const worksItemWidth = document.querySelector('.works__item').offsetWidth;
const worksItems = document.querySelectorAll('.works__item')

const worksTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.works',
        start: 'top top',
        end: () => `+=250%`,
        scrub: 1,
        pin: true,
    },
})

worksTimeline.fromTo('.works__list', {
    x: () => `${ worksItemWidth / 2 }px`,

}, {
    x: () => `-${ worksItemWidth * (worksItems.length - 0.1) - window.innerWidth }px`
})




// CONTACTS

ScrollTrigger.create({
    trigger: '.legendary',
    scroller: '.all-content',
    pin: true,
    start: 'top top',
    end: '+=250%',


})



const legendaryTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.legendary',
        start: 'top top',
        end: '+=250%',
        scrub: 1,
    },
})

legendaryTimeline.from('.legendary__text--1', {
    xPercent: -50,
    scale: 0.5,
    opacity: 0,
    duration: 20,
    ease: 'back',
})
    .from('.legendary__text--2', {
        xPercent: 50,
        scale: 0.5,
        opacity: 0,
        duration: 20,
        ease: 'back',
    }, '+=3')
    .from('.legendary__text--wait', {
        scale: 0.3,
        yPercent: 20,
        opacity: 0,
        duration: 20,
        ease: 'back',
    }, '+=3')
    .to('.legendary__text--dary', {
        duration: 8,
        text: 'dary',

    }, '+=8')
    .to('.legendary__gif-shadow', {
        opacity: 0,
        duration: 5,
    }, '<+=3')



gsap.from('.legendary__frame-floor', {
    duration: 1,
    ease: 'back',
    rotation: -37,
    y: '-150vh',
    delay: 4,
    scrollTrigger: {
        trigger: '.legendary',
        start: 'top top',
    }
})



ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


