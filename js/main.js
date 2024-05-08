const colorLis = document.querySelectorAll(".colors-list li");
/////////////check color localStorage ///////
if (localStorage.getItem("color-opition")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-opition")
  );
  colorLis.forEach((item) => {
    item.classList.remove("active");

    if (item.dataset.color == localStorage.getItem("color-opition")) {
      item.classList.add("active");
    }
  });
}

/////////////////// document color changes///////////

colorLis.forEach((i) => {
  i.addEventListener("click", function () {
    colorLis.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      this.dataset.color
    );
    localStorage.setItem("color-opition", this.dataset.color);
  });
});

///////////////////settings-box and spin icon settings/////////////////////

let settBox = document.querySelector(".settings-box");
let settDivIcon = document.getElementById("open-icon-div");
let settIcon = document.getElementById("sett-icon");
settDivIcon.addEventListener("click", function () {
  settBox.classList.toggle("open");
  settIcon.classList.toggle("fa-spin");
});
///////////////////////// landinng page background Change/////////////////
let lanImage = document.querySelector(".lan-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let counter;
counter = setInterval(() => {
  let randomNumber = Math.floor(Math.random() * imagesArray.length);
  lanImage.style.backgroundImage = `url(/imgs/${imagesArray[randomNumber]})`;
}, 5000);

///////////////////////////// settings-background/////////
// let backOpition = localStorage.getItem("randomBackgroundMode");
// if (backOpition) {
//   if (backOpition == "yes") {
//     counter = setInterval(() => {
//       let randomNumber = Math.floor(Math.random() * imagesArray.length);
//       lanImage.style.backgroundImage = `url(/imgs/${imagesArray[randomNumber]})`;
//     }, 5000);
//   } else {
//     clearInterval(counter);
//   }
// }
let btnsChange = document.querySelectorAll(".settings-background span");
btnsChange.forEach((btn) => {
  btn.addEventListener("click", function () {
    btnsChange.forEach((btn) => {
      btn.classList.remove("active");
    });
    this.classList.add("active");
    if (btn.classList.contains("no")) {
      clearInterval(counter);
    } else {
      counter = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * imagesArray.length);
        lanImage.style.backgroundImage = `url(/imgs/${imagesArray[randomNumber]})`;
      }, 5000);
    }
    // localStorage.setItem("randomBackgroundMode", this.dataset.mode);
  });
});

///////////////////////////Our Skilll seciton/////////////
let ourSkillSecition = document.querySelector(".skills");

window.onscroll = function () {
  let skillOffSetTop = ourSkillSecition.offsetTop;
  let skillOutHeight = ourSkillSecition.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillOffSetTop + skillOutHeight - windowHeight) {
    let allSpanProgrss = document.querySelectorAll(
      ".skill-box .skill-progrss span"
    );
    allSpanProgrss.forEach((item) => {
      item.style.width = item.dataset.progrss;
    });
  }
};

/////////////////////////////////// our gallery ///////////////

let galleryImages = document.querySelectorAll(".gallery-images img");

galleryImages.forEach((img) => {
  img.addEventListener("click", function () {
    let overLay = document.createElement("div");
    overLay.className = "overlay-pop";
    let overLayBox = document.createElement("div");
    overLayBox.className = "overlay-box";
    if (this.alt !== null) {
      let overLayBoxHead = document.createElement("h3");
      overLayBoxHead.className = "overlay-box-head";
      overLayBoxHead.textContent = `${this.alt}`;
      overLayBox.appendChild(overLayBoxHead);
    }
    let closeButton = document.createElement("span");
    closeButton.textContent = "X";
    closeButton.className = "close-btn";
    overLayBox.appendChild(closeButton);
    let overLayBoxImage = document.createElement("img");
    overLayBoxImage.src = this.src;
    overLayBox.appendChild(overLayBoxImage);
    document.body.appendChild(overLay);
    overLay.appendChild(overLayBox);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".overlay-pop").remove();
  }
});

//////////////////////////////// nav-bulltes acitons ////////
let allBulltes = document.querySelectorAll(".nav-bulltes .bullte");
let headerLinks = document.querySelectorAll(".header .links a");

function scrollingSecitions(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(e.target.dataset.seciton).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollingSecitions(allBulltes);
scrollingSecitions(headerLinks);

/////////////////////////////// show bullets acitions /////////////

let btnShowBullets = document.querySelectorAll(".settings-bullets span");
let bulletsContainer = document.querySelector(".nav-bulltes");

if (localStorage.getItem("showBullets") !== null) {
  bulletsContainer.style.display = `${localStorage.getItem("showBullets")}`;
  btnShowBullets.forEach((btn) => {
    if (btn.dataset.show == `${localStorage.getItem("showBullets")}`) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

btnShowBullets.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    btnShowBullets.forEach((btn) => {
      btn.classList.remove("active");
    });

    if (e.target.dataset.show === "block") {
      bulletsContainer.style.display = "block";
      btn.classList.add("active");
      localStorage.setItem("showBullets", e.target.dataset.show);
    } else {
      bulletsContainer.style.display = "none";
      btn.classList.add("active");
      localStorage.setItem("showBullets", e.target.dataset.show);
    }
  });
});

///////////////////////rest btn
document.getElementById("rest-btn").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

////////////////////header and menu acitons //////////
let toggleBtn = document.getElementById("menu-icon");
let ulMenu = document.querySelector(".header .links");

toggleBtn.addEventListener("click", function () {
  ulMenu.classList.toggle("open");
});
document.addEventListener("click", function (event) {
  if (!ulMenu.contains(event.target) && event.target !== toggleBtn) {
    if (ulMenu.classList.contains("open")) {
      ulMenu.classList.remove("open");
    }
  }
});
