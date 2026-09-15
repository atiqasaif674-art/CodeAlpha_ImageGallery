// Gallery Elements
const galleryItems =document.querySelectorAll(".gallery-item");//ele ko select karega
const filterButtons =document.querySelectorAll(".filter-btn");//saare filter buttons select krti All,nature etc
const lightbox =document.getElementById("lightbox");//element ko JavaScript mein select
const lightboxImage =document.getElementById("lightboxImage");//popup ke andar wali actual image ko select
const closeBtn =document.getElementById("closeBtn");//x
const prevBtn =document.getElementById("prevBtn");//<
const nextBtn =document.getElementById("nextBtn");//>
const imageCounter =document.getElementById("imageCounter");
// Image Array
//Ye array baad mein Next/Previous ke liye use hoga
const images = Array.from(galleryItems).map(item => {
    return item.querySelector("img").src;
});
// Current Image
//ye batata hai ke abhi kaunsi image open hai index start 0
let currentIndex = 0;
// Open Lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        //Jo image click hui hai uska index save kar do
        currentIndex = index;
        //Ab selected image ko lightbox mein show karo
        showImage(currentIndex);
        //CSS mein show class add karta hai
        lightbox.classList.add("show");
        //Jab lightbox open ho to user background page scroll nahi kar sakta
        document.body.style.overflow = "hidden";
    });
});
// Show Image
function showImage(index) {
    lightboxImage.src = images[index];
    imageCounter.textContent =`${index + 1} / ${images.length}`;
}
// Next Image
nextBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    showImage(currentIndex);
});
// Previous Image
prevBtn.addEventListener("click", (event) => {
    //Is click ko yahin rok do, parent ke click event ko mat chalne do
    event.stopPropagation();
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    showImage(currentIndex);
});
// Close Lightbox
closeBtn.addEventListener("click", () => {
    closeLightbox();
});
function closeLightbox() {
    lightbox.classList.remove("show");
    //Background ka scroll wapas enable kar do
    document.body.style.overflow = "auto";
}
// Click Outside Image
//Lightbox par click detect kar raha hai
lightbox.addEventListener("click", (event) => {
    //Kya user ne directly lightbox ke empty/background area par click kiya hai
    if (event.target === lightbox) {
        closeLightbox();
    }
});
// Keyboard Controls
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) {
        return;
    }
    if (event.key === "ArrowRight") {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        showImage(currentIndex);
    }
    if (event.key === "ArrowLeft") {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        showImage(currentIndex);
    }
    if (event.key === "Escape") {
        //Background par click karke bhi close kar sakta hai x dabna ki zarot ni
        closeLightbox();
    }
});
// Image Filters
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        // Add active class
        button.classList.add("active");
        const filter =button.dataset.filter;
        galleryItems.forEach(item => {
            const category =item.dataset.category;
            if (
                filter === "all" ||
                category === filter
            ) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});
// Gallery
//    ↓
// User image par click
//    ↓
// currentIndex save
//    ↓
// Lightbox open
//    ↓
// showImage()
//    ↓
// Next / Previous
//    ↓
// currentIndex change
//    ↓
// showImage() again

// Filter button click
//         ↓
// data-filter read
//         ↓
// Gallery ki category read
//         ↓
// Match?
//   ↓          ↓
//  YES         NO
//   ↓           ↓
// SHOW        HIDE
