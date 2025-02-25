// alert flash .
const textFlash = document.querySelector(".text-flash") ;
const buttonClose = document.querySelector(".close") ;
if (buttonClose) {
    buttonClose.addEventListener("click" , () => {
        textFlash.style.display = "none" ;
    }) ;
}

// Chuyển trang .
const buttonPage = document.querySelectorAll("[number-page]");
if (buttonPage) {
  let url = new URL(window.location.href);
  buttonPage.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("number-page");
      console.log(page);
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}