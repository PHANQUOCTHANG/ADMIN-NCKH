// const modelViewer = document.getElementById("modelViewer");
// const fileInput = document.getElementById("fileInput");
// const tooltip = document.getElementById("tooltip");
// console.log("OK") ;
// // Danh sách hotspot
// const hotspots = [
//   {
//     slot: "hotspot-2",
//     x: "-0.15m",
//     y: "0.2m",
//     z: "0m",
//     info: "RAM",
//     img: "https://m.media-amazon.com/images/I/61XmhmEup8L._AC_SL1000_.jpg",
//   },
// ];

// hotspots.forEach((hotspot) => {
//   const button = document.createElement("button");
//   button.className = "hotspot";
//   button.setAttribute("slot", hotspot.slot);
//   button.dataset.info = hotspot.info;
//   button.innerText = hotspot.info;
//   button.setAttribute("data-img", hotspot.img);
//   button.setAttribute(
//     "data-position",
//     `${hotspot.x} ${hotspot.y} ${hotspot.z}`
//   );
//   modelViewer.appendChild(button);
// });

// // Chọn file 3D từ máy tính
// fileInput.addEventListener("change", function (event) {
//   const file = event.target.files[0];
//   if (file) {
//     const url = URL.createObjectURL(file);
//     modelViewer.setAttribute("src", url);
//   }
// });

// // Tải mô hình từ Google Drive
// function loadModel() {
//   const fileId = document.getElementById("driveInput").value.trim();
//   if (fileId) {
//     const url = fileId;
//     modelViewer.setAttribute("src", url);
//     alert(url);
//   } else {
//     alert("Vui lòng nhập Url tệp hợp lệ!");
//   }
// }

// document.querySelectorAll(".hotspot").forEach((hotspot) => {
//   hotspot.addEventListener("click", (event) => {
//     event.stopPropagation(); // Ngăn sự kiện lan ra ngoài

//     const tooltip = document.getElementById("tooltip");
//     const tooltipImg = document.getElementById("tooltip-img");
//     const tooltipText = document.getElementById("tooltip-text");

//     tooltipText.innerText = event.target.getAttribute("data-info");
//     tooltipImg.src = event.target.getAttribute("data-img");
//     tooltip.style.display = "block";

//     // Định vị tooltip gần hotspot
//     const rect = event.target.getBoundingClientRect();
//     tooltip.style.left = `${rect.left + window.scrollX + 20}px`;
//     tooltip.style.top = `${rect.top + window.scrollY - 30}px`;

//     // Hiệu ứng fade-in + bounce
//     tooltip.style.animation = "fadeBounce 0.4s ease-out forwards";
//   });
// });

// // Ẩn tooltip khi click bên ngoài
// document.addEventListener("click", () => {
//   tooltip.style.display = "none";
// });