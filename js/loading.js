document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        // document.querySelector(
        //     ".all-content").style.visibility = "hidden";
        document.querySelector(
            ".loader").style.visibility = "visible";
    } else {
        document.querySelector(
            ".all-content").style.visibility = "visible";


        setTimeout(() => {

            gsap.to('.loader', {
                yPercent: 100,
                opacity: 0,
                duration: 2,
                ease: 'none'
            })

        }, 2000);


        setTimeout(() => {
            document.querySelector(
                ".loader").style.display = "none";
        }, 4000);

    }
};
