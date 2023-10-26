function locomotiveanimation() {
   gsap.registerPlugin(ScrollTrigger);

   // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

   const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
   });
   // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
   locoScroll.on("scroll", ScrollTrigger.update);

   // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
   ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
         return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
         return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
   });


   // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
   ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

   // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
   ScrollTrigger.refresh();



}
locomotiveanimation()

function video1() {
   const cursor = document.querySelector('#cursor')
   const childs = document.querySelectorAll('.child')
   childs.forEach((child) => {
      child.addEventListener('mouseenter', () => {
         gsap.to(cursor, {
            scale: 1,
            opacity: 1
         })
      })
      child.addEventListener('mouseleave', () => {
         gsap.to(cursor, {
            scale: 0,
            opacity: 0
         })
      })
      child.addEventListener('mousemove', (dets) => {
         gsap.to(cursor, {
            left: dets.x - 80,
            top: dets.y - 70
         })
      })
   })
}
video1();

function video() {
   const videocontainer = document.querySelector('#video-container')
   const play = document.querySelector('#play')

   videocontainer.addEventListener('mouseenter', () => {
      gsap.to(play, {
         scale: 1,
         opacity: 1
      })
   })
   videocontainer.addEventListener('mouseleave', () => {
      gsap.to(play, {
         scale: 0,
         opacity: 0
      })
   })
   videocontainer.addEventListener('mousemove', (dets) => {
      gsap.to(play, {
         left: dets.x - 80,
         top: dets.y - 70
      })
      //another way for moving cursor
      // play.style.left = dets.x + "px"
      // play.style.top = dets.x + "px"
   })
}
video();

function loadinganimation() {
   gsap.from('#page1 h1', {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 0.5,
      stagger: 0.3
   })

   gsap.from('#page1 #video-container', {
      y: 100,
      opacity: 0,
      delay: 1.2,
      duration: 0.5,
   })
}
loadinganimation();
function cursoranimation() {
   gsap.to("#nav1 ul", {
      transform: "translateY(-100%)",
      opacity:0,
      scrollTrigger:{
         trigger:"#page1",
         scroller:"#main",
         start:"top 0",
         end:"top -5%",
         scrub:true
      }
   })

   gsap.to("#nav-links h1", {
      transform: "translateY(-110%)",
      scrollTrigger:{
         trigger:"#page1",
         scroller:"#main",
         start:"top 0",
         end:"top -5%",
         scrub:true
      }
   })
   gsap.to("#nav-links img", {
      transform: "translateY(-100%)",
      scrollTrigger:{
         trigger:"#page1",
         scroller:"#main",
         start:"top 0",
         end:"top -5%",
         scrub:true
      }
   })
}
cursoranimation()

