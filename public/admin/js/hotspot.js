const input = document.querySelector('.img-hotspots-input');
const preview = document.querySelector('.img-hotspots');
if (input && preview) {
  input.addEventListener('input', () => {
    const url = input.value.trim();
    preview.src = url;

    if (url) {
      preview.classList.remove('d-none');
    } else {
      preview.classList.add('d-none');
    }
  });
}
