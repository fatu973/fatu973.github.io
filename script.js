

function init() {
  setMenu();
  setProjectModals();
}

// menu buttons, update active on click/scroll --------------------------------
function setMenu() {
  var menuContainer = document.getElementById("menu");
  var menuLinks = menuContainer.getElementsByClassName("menu-link");
  menuLinks = Array.prototype.slice.call(menuLinks)

  // initially make the first link the active link
  menuLinks[0].classList.add("active")

  // on click listener for menu links
  for (var i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", function () {

      var link = this.getElementsByClassName("actual-link")[0].getAttribute("href")
      var prevActive = document.getElementsByClassName("active");

      // Replace the previous active link with nothing
      prevActive[0].classList.remove("active");

      // Add the active class to the current button
      this.classList.add("active")

      // remove open class from nav todo
      var menu = document.getElementById("menu");
      if (menu.className === "nav") {
        menu.className = "nav";
      }

      // slow movement to this page with jquery
      $('html, body').animate(
        { scrollTop: $(link).offset().top - ($(window).height()) / 10 }, 'slow');
    })
  }

  // on scroll listener todo

}

function openMenu() {
  var menu = document.getElementById("menu");
  if (menu.className === "nav") {
    menu.classList.add("open")
  } else {
    menu.className = "nav";
  }
}

// project modals ---------------------------------------------------------------
function setProjectModals() {
  var modals = document.getElementsByClassName("modal");
  console.log(modals);

  for (var i = 0; i < modals.length; i++) {
    let currModal = modals[i];

    let id = currModal.id;
    let square = document.getElementById(id + "-link")
    let span = currModal.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    square.onclick = function () {
      currModal.style.display = "block";
    }

    // When the user clicks on x, close the modal
    span.onclick = function () {
      currModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target.classList[1] == "modal") {
        event.target.style.display = "none";
      }
    }

  }

}

// TypeWriter effect ----------------------------------------------------
// reference: https://codepen.io/gschier/pen/jkivt?editors=1010

function TypeWriter() {
  var introList = document.getElementsByClassName('intro');
  var waitPeriod = 1000;

  var toRotate = introList[0].getAttribute('data-rotate');

  new TxtRotate(introList[0], JSON.parse(toRotate), waitPeriod);

};

var TxtRotate = function (currPhrase, toRotate, waitPeriod) {
  this.toRotate = toRotate;
  this.currPhrase = currPhrase;
  this.loopNum = 0;
  this.waitPeriod = waitPeriod;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum;
  if (i < this.toRotate.length) {
    var fullTxt = this.toRotate[i];

    if (this.isDeleting && i != this.toRotate.length - 1) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.currPhrase.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.waitPeriod;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
};

window.onload = function () {

  init();

  TypeWriter();
};

  // -----------------------------------------------------------------------------