const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let currentPage = 0;

// custom pages loop through each
const pages = [
    { title: "Happy Valentines Day Beb", img: "cat_heart.gif" },
    { title: "Lets go on a little adventure", img: "cat_dance.gif" },
    { 
        title: "Take a trip down memory lane! (you can click)", 
        // gal1
        images: ["./images/image1.jpg", "./images/image2.jpg", "./images/image3.jpg", "./images/image4.jpg"] 
    },
    { 
        title: "Theres so many images", 
        // gal2
        images: ["./images/image5.jpg", "./images/image6.jpg", "./images/image7.jpg", "./images/image8.jpg"] 
    },
    { 
        title: "This whole thing would take forever", 
        // gal3
        images: ["./images/image9.jpg", "./images/image10.jpg", "./images/image11.jpg", "./images/image12.jpg"] 
    },
    { 
        title: "Thank you for all of these memories", 
        // gal4
        images: ["./images/image13.jpg", "./images/image14.jpg", "./images/image15.jpg", "./images/image16.jpg"] 
    },
    { 
        title: "They will always be cherished and have a place in my heart", 
        // gal5
        images: ["./images/image17.jpg", "./images/image18.jpg", "./images/image19.png", "./images/image20.jpg"] 
    },
    { 
        title: "A Song Just For You", 
        // Replace this ID with your chosen song ID
        spotifyId: "3EVhjxPooIaS3AzpIejqVz" 
    },
    { 
        title: "How much do I love you?", 
        isSliderPage: true,
        img: "goofy_cat.gif" 
    },
    { title: "yippee", img: "cat_boom.gif" },
    { 
        title: "A Little Message for You", 
        videoSrc: "https://drive.google.com/file/d/1CsM6XUAqYfNveqeZa8heeYVOshDBsD5E/preview" 
    },
    { 
        title: "Since i'm not there to see you smile let's see you smile!", 
        isPhotobooth: true 
    },
    { title: "making this was a learning process LOL", img: "hoji.jpg" },
    { 
        title: "Final Message", 
        paragraph: "Happy Valentines Day beb once again! I am so grateful and lucky to have you in my life and I really do hope you are having a fun time back in Indonesia and I miss you very much! I want you to know that I love you so so so so so so so much and I really want the best for you and wish for you to be the happiest. I will always be here for you if you ever need anything no matter how big or how small, I will always be by your side. I'll always be there for you at the highest points in your life, your lowest points in your life, or if you ever want to talk about anything. You really do mean a lot to me and I wish you could see yourself the way I see you. (continue next page)" 
    },
    { 
        paragraph: "I love you your laugh and smile, I love how sweet and caring you are, I love how silly and goofy you are, I love how unique you are and how you love so many random things that other people might not like (DIFFERENT), I love that you are a truthful person, I love how smart and ambitious you are, I love how you have a close connection with your family, I love your cool style (all of your styles), I love how you are such a strong person. I love how once you talk about something or like something you can go on and on and on. YOU ARE PRETTY OK SO DONT CALL URSELF MID EVER. There's so much to love about you and I can go on and on and on (continue next page)" 
    },
    { 
        paragraph: "I know there are times where I might not be the best person, but I just want you to know that I really do care for you and I just want to see you happy. There is so much more I want to say, but I would also want to be able to express it to you in person since this is through my goofy website. Thank you for having me be your boyfriend and for bringing in so much joy in my life, I learned so much and got to experience so much being with you and I love you. Happy Valentines Day Corina <3" 
    },
    {
        title: "The Big Reveal!",
        img: "goofy_cat.gif",
        finalText: "Meow Restaurant" 
}
];

// open Letter
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

function updatePage() {
    title.style.opacity = 0;
    catImg.style.opacity = 0;

    const elementsToRemove = ["image-gallery", "spotify-player", "slider-container", "video-player", "photobooth-container", "letter-note"];
    elementsToRemove.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });

    if (window.localStream) {
        window.localStream.getTracks().forEach(track => track.stop());
    }

    setTimeout(() => {
        const content = pages[currentPage];
        title.textContent = content.title;

        if (content.paragraph) {
            catImg.style.display = "none"; // Hide the cat for the final note
            
            const note = document.createElement("p");
            note.id = "letter-note";
            note.textContent = content.paragraph;
            document.getElementById("walkthrough-content").appendChild(note);
        } else if (content.isPhotobooth) {
            catImg.style.display = "none";
            
            const boothCont = document.createElement("div");
            boothCont.id = "photobooth-container";
            boothCont.innerHTML = `
                <div class="booth-view" id="booth-view">
                    <video id="booth-video" autoplay playsinline></video>
                    <div id="flash-effect"></div>
                </div>
                <button id="snap-btn">snap!</button>
            `;
            document.getElementById("walkthrough-content").appendChild(boothCont);

            const video = document.getElementById("booth-video");
            const snapBtn = document.getElementById("snap-btn");
            const flash = document.getElementById("flash-effect");

            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(stream => {
                    window.localStream = stream;
                    video.srcObject = stream;
                });

            snapBtn.onclick = () => {
                snapBtn.disabled = true;
                snapBtn.style.opacity = "0.5";

                // Trigger Flash
                flash.style.opacity = "1";
                setTimeout(() => flash.style.opacity = "0", 150);

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                const frameImg = new Image();
                frameImg.src = "photo_frame.png"; 
                frameImg.onload = () => {
                    ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
                    const combinedData = canvas.toDataURL("image/png");
                    
                    // Open the modal immediately
                    openModal(combinedData); 

                    // Create the "View Photo" button if it doesn't exist yet
                    if (!document.getElementById("view-photo-btn")) {
                        const viewBtn = document.createElement("button");
                        viewBtn.id = "view-photo-btn";
                        viewBtn.textContent = "View Photo";
                        viewBtn.onclick = () => openModal(combinedData); // Re-opens the same photo
                        document.getElementById("photobooth-container").appendChild(viewBtn);
                    }

                    if (window.localStream) {
                        window.localStream.getTracks().forEach(track => track.stop());
                    }
                };
            };
        } else if (content.videoSrc) {
            catImg.style.display = "none"; // Hide broken image icon
            
            const video = document.createElement("iframe");
            video.id = "video-player";
            video.src = content.videoSrc;
            video.width = "100%";
            video.height = "250"; // Adjust to fit your pink window
            video.frameBorder = "0";
            video.allow = "autoplay";
            
            document.getElementById("walkthrough-content").appendChild(video);
        } else if (content.isSliderPage) {
            catImg.style.display = "none"; 

            const sliderCont = document.createElement("div");
            sliderCont.id = "slider-container";
            sliderCont.innerHTML = `
                <input type="range" min="0" max="100" value="0" class="love-slider" id="love-slider">
                <p id="slider-value">0%</p>
            `;
            document.getElementById("walkthrough-content").appendChild(sliderCont);

            // Hide next button initially
            nextBtn.style.visibility = "hidden";

            const slider = document.getElementById("love-slider");
            const valDisplay = document.getElementById("slider-value");

            slider.oninput = function() {
                valDisplay.textContent = this.value + "%";
                if (this.value >= 100) {
                    valDisplay.textContent = "MAXIMUM LOVE?? ❤️";
                    nextBtn.style.visibility = "visible";
                } else {
                    nextBtn.style.visibility = "hidden";
                }
            };
        } else if (content.spotifyId) {
            catImg.style.display = "none";
            const player = document.createElement("iframe");
            player.id = "spotify-player";
            player.src = `https://open.spotify.com/embed/track/${content.spotifyId}?utm_source=generator&theme=0`;
            player.width = "100%";
            player.height = "152";
            player.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
            player.loading = "lazy";
            
            document.getElementById("walkthrough-content").appendChild(player);
        } else if (content.images) {
            catImg.style.display = "none";
            const gallery = document.createElement("div");
            gallery.id = "image-gallery";
            
            content.images.slice(0, 4).forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.className = "gallery-item";
                img.onclick = () => openModal(src);
                gallery.appendChild(img);
            });
            document.getElementById("walkthrough-content").appendChild(gallery);
        } else if (content.finalText) {
            catImg.style.display = "block";
            catImg.src = "cat_dance.gif";
            finalText.style.display = "block";
            finalText.textContent = "Valentine Date: I will pick you up and take you to go to Disney at any date you are free once you come back!";
            nextBtn.style.visibility = "hidden"; 
            prevBtn.style.visibility = "hidden"; 
        } else {
            catImg.style.display = "block";
            catImg.src = content.img;
        }

        title.style.opacity = 1;
        catImg.style.opacity = 1;
    }, 150);

    prevBtn.style.visibility = currentPage === 0 ? "hidden" : "visible";
    
    if (currentPage === pages.length - 1) {
        nextBtn.style.visibility = "hidden"; 
    } else {
        nextBtn.style.visibility = "visible";
        nextBtn.onclick = nextPage;
    }
}

// modal Function
function openModal(src) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    
    modalImg.src = src;
    modal.classList.add("active"); // adds the class to trigger fade-in
}

function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.classList.remove("active"); // removes class to trigger fade-out
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
}

// attach Event Listeners
nextBtn.onclick = nextPage;
prevBtn.onclick = prevPage;

// initial styling for transitions
title.style.transition = "opacity 0.2s";
catImg.style.transition = "opacity 0.2s";
