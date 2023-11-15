window.addEventListener("DOMContentLoaded", (event) => {
  // Split text into spans
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span"
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    // Reset tl when scroll out of view past bottom of screen
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top bottom",
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      }
    });
    // Play tl when scrolled into view (60% from top of screen)
    ScrollTrigger.create({
      trigger: triggerElement,
      start: "top 85%",
      onEnter: () => timeline.play()
    });
  }

$("[letters-slide-up]").each(function (index) {
  let tl = gsap.timeline({ paused: true });

  // Gebruik de delay-functie om een vertraging van 1 seconde toe te voegen
  tl.from($(this).find(".char"), { yPercent: 100, delay: 2, duration: 0.4, ease: "power1.out", stagger: { amount: 0.6 } }); // 1 seconde vertraging per element

  createScrollTrigger($(this), tl);
});

  $("[letters-slide-up-title]").each(function (index) {
    let tl = gsap.timeline({ paused: true });
    tl.from($(this).find(".char"), { yPercent: 100, duration: 0.4, ease: "power1.out", stagger: { amount: 0.6, } });

    createScrollTrigger($(this), tl);
  });



 


  $("[scrub-each-word]").each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 90%",
        end: "top center",
        scrub: true
      }
    });
    tl.from($(this).find(".word"), { opacity: 0.2, duration: 0.2, ease: "power1.out", stagger: { each: 0.4 } });
  });

  // Avoid flash of unstyled content
  gsap.set("[text-split]", { opacity: 1 });
});
