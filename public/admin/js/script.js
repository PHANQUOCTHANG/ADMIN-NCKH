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

//CHECK-ALL
const checkAll = document.querySelector("input[name = check-all]");
const checkId = document.querySelectorAll("input[name=id]");
if (checkAll) {
  checkAll.addEventListener("click", () => {
    checkId.forEach((item) => {
      item.checked = checkAll.checked;
    });
  });
}
checkId.forEach((item) => {
  item.addEventListener("click", () => {
    const countCheckId = document.querySelectorAll("input[name=id]:checked");
    if (countCheckId.length === checkId.length) {
      checkAll.checked = true;
    } else checkAll.checked = false;
  });
});
// END


// CHANGE-ALL
const formChangeAll = document.querySelector("#form-change-all");
const type = document.querySelector("[name=type]");
console.log(formChangeAll) ;
console.log(type) ;
if (formChangeAll) {
  formChangeAll.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.querySelectorAll("input[name=id]:checked"); // mảng chứa các phần tử được chọn để thay đổi .
    if (id.length > 0) {
      let ids = [];
      const inputIds = formChangeAll.querySelector("[name=ids]");
      id.forEach((item) => {
        ids.push(item.value) ;
        // if (type.value === "update-position") {
        //   const position = item
        //     .closest("tr")
        //     .querySelector("input[name=position]");
        //   const idPosition = `${item.value}-${position.value}`;
        //   ids.push(idPosition);
        // } else ids.push(item.value);
      });
      if (type.value === "delete") {
        const isConfirm = confirm("Bạn có chắc muốn xóa không?");
        if (!isConfirm) return;
      }
      inputIds.value = ids.join(", ");
      formChangeAll.submit();
    } else {
      alert("Vui chon 1 ban ghi!");
    }
  });
}

// hotspot link model 
const buttonLinkModel = document.querySelectorAll('.link-model');
console.log(buttonLinkModel) ;
if (buttonLinkModel.length > 0) {
  const formLinkModel = document.querySelector("#form-linkModel");
  const path = formLinkModel.getAttribute("data-path");
  buttonLinkModel.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn chắc chắn muốn liên kết?");
      if (isConfirm) {
        const modelId = button.getAttribute("data-id");
        console.log(modelId) ;
        const newPath = `${path}/${modelId}?_method=PATCH` ;
        console.log(newPath) ;
        formLinkModel.action = newPath ;
        formLinkModel.submit() ;
      }
    });
  });
}
// END