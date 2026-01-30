const bigImage = document.getElementById("bigImage");
const smallImages = document.querySelectorAll(".small-circle img");

smallImages.forEach(img => {
    img.addEventListener("mouseenter", () => {
        bigImage.src = img.src;
    });
});
