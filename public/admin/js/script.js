// Upload Image Preview .
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
      uploadImagePreview.style.width = "100px";
      uploadImagePreview.style.height = "100px";
    }
  });
}
// End .


// [DELETE] by Form .
const buttonDeletes = document.querySelectorAll(".button-delete");
console.log(buttonDeletes) ;
if (buttonDeletes.length > 0) {
  const formDelete = document.querySelector("#form-delete");
  const path = formDelete.getAttribute("data-path");
  buttonDeletes.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn chắc chắn muốn xóa?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        formDelete.action = action;
        formDelete.submit();
      }
    });
  });
}
// END

// Add hotspot to model .
const buttonHotspot = document.querySelectorAll("[data-idHotspot]") ;
console.log("OK") ;
console.log(buttonHotspot) ;
if (buttonHotspot.length > 0) {
  const formAddHotspot = document.getElementById("form-addHotspot") ;
  const dataHotspot = formAddHotspot.querySelector("[data-hotspot]") ;
  for (let item of buttonHotspot) {
    item.addEventListener("click" , () => {
      const hotspotId = item.getAttribute("data-idHotspot");
      console.log(hotspotId) ;
      dataHotspot.value = hotspotId ;
      console.log(formAddHotspot) ;
      console.log(dataHotspot.value) ;
      formAddHotspot.submit() ;
    });
  } 
}