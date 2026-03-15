// Custom Cursor
const cursor = document.querySelector('.cursor');
const updateCursor = (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
};
window.addEventListener('mousemove', updateCursor);

document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Typewriter Effect
const textToType = "> SYSTEM INITIATED...\n> I build AI systems that solve real problems.";
let i = 0;
const speed = 40; 
const typeWriterElement = document.getElementById("typewriter");
const typeWriter = () => {
    if (i < textToType.length) {
        if(textToType.charAt(i) === '\n') {
            typeWriterElement.innerHTML += '<br>';
        } else {
            typeWriterElement.innerHTML += textToType.charAt(i);
        }
        i++;
        setTimeout(typeWriter, speed);
    }
};
setTimeout(typeWriter, 500);

// Hero Background Image Slider Logic
const heroSlides = document.querySelectorAll('.hero-slide');
let currentHeroSlide = 0;
if(heroSlides.length > 0) {
    setInterval(() => {
        heroSlides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }, 5000); // Transitions every 5 seconds
}

// Scroll Intersection Observer
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
});

// Navbar active highlights
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach(sec => {
        const sectionTop = sec.offsetTop;
        if (scrollY >= sectionTop - window.innerHeight / 3) {
            currentId = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        }
    });
});

// Sliders Logic
const sliderState = {
    'slider-achievements': { index: 0, interval: null },
    'slider-certs': { index: 0, interval: null }
};

const updateSliderPosition = (sliderId) => {
    const track = document.querySelector(`#${sliderId} .slider-track`);
    const slides = document.querySelectorAll(`#${sliderId} .slide-card`);
    if(!slides.length) return;
    
    const slideWidth = slides[0].offsetWidth; 
    const maxIndex = slides.length - 1;
    
    if (sliderState[sliderId].index > maxIndex) sliderState[sliderId].index = 0;
    if (sliderState[sliderId].index < 0) sliderState[sliderId].index = maxIndex;
    
    track.style.transform = `translateX(-${sliderState[sliderId].index * slideWidth}px)`;
};

const moveSlider = (sliderId, dir) => {
    sliderState[sliderId].index += dir;
    updateSliderPosition(sliderId);
    resetAutoPlay(sliderId);
};

const startAutoPlay = (sliderId) => {
    sliderState[sliderId].interval = setInterval(() => {
        sliderState[sliderId].index++;
        updateSliderPosition(sliderId);
    }, 3000); // Changed to 3s auto-play per user request
};

const resetAutoPlay = (sliderId) => {
    clearInterval(sliderState[sliderId].interval);
    startAutoPlay(sliderId);
};

// Sticky Scroll Scrollytelling Logic for Hackathons
window.addEventListener('scroll', () => {
    const achievementsSection = document.querySelector('.achievements-section');
    if(!achievementsSection) return;

    const items = document.querySelectorAll('.achievement-item');
    const dots = document.querySelectorAll('.progress-dot');
    const rect = achievementsSection.getBoundingClientRect();
    
    // If the top of the section is above viewport and bottom is below viewport
    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        // How far are we down the container? (0 to 1)
        // -rect.top is how many pixels the top edge has scrolled UP past the viewport
        // The total scroll distance is rect.height - window.innerHeight
        const scrollProgress = -rect.top / (rect.height - window.innerHeight);
        
        // Which index should be active?
        const maxIndex = items.length - 1;
        let currentIndex = Math.floor(scrollProgress * items.length);
        
        // Clamp index just in case bounds exceed slightly
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    } else if (rect.top > 0) {
        // We are above the section - force first item active
        items.forEach(i => i.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        if(items[0]) items[0].classList.add('active');
        if(dots[0]) dots[0].classList.add('active');
    } else if (rect.bottom < window.innerHeight) {
        // We are past the section - force last item active
        items.forEach(i => i.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        if(items[items.length-1]) items[items.length-1].classList.add('active');
        if(dots[dots.length-1]) dots[dots.length-1].classList.add('active');
    }
});

// Initialize first state for sticky layout
const firstStickyItem = document.querySelector('.achievement-item');
const firstStickyDot = document.querySelector('.progress-dot');
if (firstStickyItem) firstStickyItem.classList.add('active');
if (firstStickyDot) firstStickyDot.classList.add('active');

// Re-initialize slider logic for certificates
Object.keys(sliderState).forEach(id => {
    startAutoPlay(id);
    window.addEventListener('resize', () => {
        setTimeout(() => updateSliderPosition(id), 100);
    });
});

// Form Submit
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const baseURL = "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform";
    const name = encodeURIComponent(document.getElementById('entryName').value);
    const email = encodeURIComponent(document.getElementById('entryEmail').value);
    const message = encodeURIComponent(document.getElementById('entryMessage').value);

    const urlQuery = `?usp=pp_url&entry.11111=${name}&entry.22222=${email}&entry.33333=${message}`;
    window.open(baseURL + urlQuery, "_blank");
    e.target.reset();
});
