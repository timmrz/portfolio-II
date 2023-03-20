
gsap.registerPlugin(TextPlugin, ScrollTrigger);

// document.addEventListener('DOMContentLoaded', () => {





const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".all-content"),
    smooth: true,
    initPosition: { x: 0, y: 0 },
    mobile: {
        smooth: true,
        breakpoint: 0,
    },
    tablet: {
        smooth: true,
        breakpoint: 0,
    }
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".all-content", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".all-content").style.transform ? "transform" : "fixed"
});


// animations

ScrollTrigger.defaults({
    scroller: ".all-content"
})



ScrollTrigger.create({
    trigger: '.about',
    start: 'top top',
    end: '150% top',
    pin: true,
    // markers: true,
    scrub: 2,
    // animation: animationOffers,
})



ScrollTrigger.create({
    trigger: '.offers',
    scroller: '.all-content',
    pin: true,
    // pinSpacing: false,
    start: '100% bottom',
    end: '+=320%',
    // markers: true

})

// sections parallax

// let getRatio = el => window.innerHeight / (window.innerHeight + document.querySelector(el).offsetHeight);

// gsap.fromTo('.about', {
//     backgroundPosition: () => "50% 0px"
// }, {
//     backgroundPosition: () => `50% ${ window.innerHeight * (1 - getRatio('.about')) }px`,
//     ease: "none",
//     scrollTrigger: {
//         trigger: '.about',
//         start: () => "top top",
//         end: "bottom top",
//         scrub: true,
//         // markers: true,
//         invalidateOnRefresh: true // to make it responsive
//     }
// });

// gsap.from('.offers', {
//     backgroundPosition: () => `50% ${ -window.innerHeight * getRatio('.offers') }px`,
//     ease: "none",
//     scrollTrigger: {
//         trigger: '.offers',
//         start: () => "top bottom",
//         end: '99% bottom',
//         scrub: true,
//         // markers: true,
//         invalidateOnRefresh: true // to make it responsive
//     }
// });

// gsap.to('.offers', {
//     backgroundPosition: () => `50% ${ window.innerHeight * (1 - getRatio('.offers')) }px`,
//     ease: "none",
//     scrollTrigger: {
//         trigger: '.offers',
//         start: "1% top",
//         end: 'bottom top',
//         scrub: true,
//         // markers: true,
//         invalidateOnRefresh: true // to make it responsive
//     }
// });

// gsap.from('.skills__bg', {
//     backgroundPosition: () => `50% ${ -window.innerHeight * getRatio('.skills__bg') }px`,
//     ease: "none",
//     scrollTrigger: {
//         trigger: '.skills__bg',
//         start: () => "top bottom",
//         end: '99% bottom',
//         scrub: true,
//         invalidateOnRefresh: true // to make it responsive
//     }
// });

// gsap.from('.skills__computers', {
//     backgroundPosition: () => `0 ${ window.innerHeight * (1 - getRatio('.skills__computers')) }px`,
//     ease: "none",
//     scrollTrigger: {
//         trigger: '.skills__bg',
//         start: () => "top bottom",
//         end: '99% bottom',
//         scrub: true,
//         invalidateOnRefresh: true // to make it responsive
//     }
// });



// gsap.utils.toArray("section").forEach((section, i) => {

//     gsap.fromTo(section, {
//         backgroundPosition: () => i ? `50% ${ -window.innerHeight * getRatio(section) }px` : "50% 0px"
//     }, {
//         backgroundPosition: () => `50% ${ window.innerHeight * (1 - getRatio(section)) }px`,
//         ease: "none",
//         scrollTrigger: {
//             trigger: section,
//             start: () => i ? "top bottom" : "top top",
//             end: "bottom top",
//             scrub: true,
//             markers: true,
//             invalidateOnRefresh: true // to make it responsive
//         }
//     });

// });


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
    scrollTrigger: {
        trigger: '.about__content',
        start: '10% top',
        toggleActions: 'play reverse play none',
        // markers: true
    }
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
        // markers: true,
        start: 'bottom top',
        // end: () => {
        //     console.log(document.querySelector('.about').offsetHeight)
        //     return `${ document.querySelector('.about').offsetHeight * 2 } top`
        // }
    },
    yPercent: 200,
    duration: 1,
})
// .to('.about__bg', { opacity: 0 })


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
        // markers: true,
        start: '20% top',
        end: '+=50%',
    },
    duration: 12,
    delay: 4
})
offersTimeline.fromTo(".offers__right", {
    yPercent: 100
}, {
    yPercent: -85,
    scrollTrigger: {
        trigger: '.offers__right',
        scrub: 2,
        // markers: true,
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
            // easeEach: 'back'
        },

        scrollTrigger: {
            trigger: '.offers__right', // тут ошибка
            scrub: 2,
            // markers: true,
            start: () => {
                return `${ document.querySelector('.offers__right').offsetHeight + (item.offsetHeight + 60) * i } 95%`
            },
            end: () => {
                return `${ document.querySelector('.offers__right').offsetHeight + (item.offsetHeight + 60) * i } 15%}`
            }

        },

    })
})

//skills

ScrollTrigger.create({
    trigger: '.skills',
    scroller: '.all-content',
    pin: true,
    // pinSpacing: false,
    start: '100% bottom',
    end: '+=700%',
    // markers: true

})


const skillsBgTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.skills',
        start: '100% bottom',
        end: '+=650%',
        scrub: 1,
        // markers: true
    },
    ease: 'none'
})

skillsBgTimeline.to('.skills__computers', {
    scale: 3,
    duration: 30,
    transformOrigin: 'left center'
})

    // .fromTo('.skills__display', {
    //     opacity: 0,
    // }, { opacity: 1, duration: 0.1 })
    .to('.skills__bg', {
        scale: 2,
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
        // text: {
        //     value: "",
        //     delimiter: " "
        // },
        opacity: 0,
        yPercent: -30

    })
    .to('.skills__computers', {
        scale: 1,
        duration: 30,
        transformOrigin: 'left center'
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


// WORKS

const worksListWidth = document.querySelector('.works__list').scrollWidth;

ScrollTrigger.create({
    trigger: '.works',
    scroller: '.all-content',
    pin: true,
    // pinSpacing: false,
    start: 'top top',
    end: () => `+=${ 0.15 * window.innerHeight + worksListWidth }`,
    // markers: true

})

console.log(worksListWidth)

const worksTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.works__list',
        start: 'top top',
        end: () => `+=${ worksListWidth }px`,
        scrub: 2,
        markers: true
    },
})

worksTimeline.to('.works__list', {
    xPercent: -105,
    duration: 10
})




// CONTACTS

ScrollTrigger.create({
    trigger: '.legendary',
    scroller: '.all-content',
    pin: true,
    // pinSpacing: false,
    start: '100% bottom',
    end: '+=700%',
    // markers: true

})



const legendaryTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.legendary',
        start: '99% bottom',
        end: '+=150%',
        scrub: 2,
        // markers: true
    },
})

legendaryTimeline.from('.legendary__text--1', {
    xPercent: -70,
    scale: 0,
    opacity: 0,
    duration: 20,
    ease: 'back',
})
    .from('.legendary__text--2', {
        xPercent: 70,
        scale: 0,
        opacity: 0,
        duration: 20,
        ease: 'back',
    }, '+=3')
    .from('.legendary__text--wait', {
        scale: 0,
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
    yPercent: -200,
    delay: 4,
    scrollTrigger: {
        trigger: '.legendary',
        start: 'bottom bottom',
        markers: true,
        // toggleActions: 'restart none none none'
    }
})









// offersTimeline.fromTo(".offers__item", {
//     opacity: 0,
//     scaleX: 0.5,
//     yPercent: 300
// }, {
//    yPercent: 0,
//    scaleX: 1,
//    opacity: 1,
//     scrollTrigger: {
//         trigger: '.offers__right',
//         scrub: 2,
//         markers: true,
//         start: 'top bottom',
//         end: '+=100%',
//     },
//     stagger: 5,
//     duration: 5,
//    })


// gsap.from('.legendary__frame-floor ', {
//     scrollTrigger: {
//         trigger: ".legendary",
//         // scrub: 1,
//         // pin: true,
//         start: "10px 50%",
//         end: "10px 10%",
//         toggleActions: 'restart none reverse none',
//         markers: true
//     },
//     y: -1200,
//     rotation: -120,
//     // bottom: '-5%',
//     delay: 4,
//     duration: 1,
//     ease: 'back'
// })



// .fromTo('.skills__bg', {
//     backgroundSize: '100% auto'
// }, { backgroundSize: '200% auto', duration: 4, transformOrigin: 'center bottom' })


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// })

