document.addEventListener("DOMContentLoaded", () => {
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const prevImageBtn = document.getElementById("prevImage");
  const nextImageBtn = document.getElementById("nextImage");
  const closeModalBtn = document.querySelector(".close");
  const productFormContainer = document.getElementById("productFormContainer");
  const createNewProductBtn = document.getElementById("createNewProductBtn");
  const cancelFormBtn = document.getElementById("cancelFormBtn");

  let currentImages = [];
  let currentIndex = 0;

  const updateModalImage = () => {
      modalImage.src = currentImages[currentIndex];
  };

  document.querySelectorAll(".product-image").forEach((img) => {
      img.addEventListener("click", (event) => {
          currentImages = JSON.parse(event.target.getAttribute('data-images'));
          currentIndex = 0; // Start with the first image

          updateModalImage();
          imageModal.classList.remove("hidden");
      });
  });

  prevImageBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateModalImage();
      }
  });

  nextImageBtn.addEventListener("click", () => {
      if (currentIndex < currentImages.length - 1) {
          currentIndex++;
          updateModalImage();
      }
  });

  closeModalBtn.addEventListener("click", () => {
      imageModal.classList.add("hidden");
  });

  createNewProductBtn.addEventListener("click", () => {
      productFormContainer.classList.remove("hidden");
  });

  cancelFormBtn.addEventListener("click", () => {
      productFormContainer.classList.add("hidden");
  });

  document.getElementById("productImages").addEventListener("change", (event) => {
      const files = event.target.files;
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.innerHTML = '';

      Array.from(files).forEach(file => {
          if (file && file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = () => {
                  const img = document.createElement('img');
                  img.src = reader.result;
                  imagePreview.appendChild(img);
              };
              reader.readAsDataURL(file);
          }
      });
  });
});
