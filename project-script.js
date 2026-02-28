// Project data
const projects = {
    1: {
        title: "uvw",
        category: "Speculative Design",
        shortDescription: "Exploring the intersection of bio-tech and fashion, imagining garments that adapt to our bodies and environments in speculative futures.",
        overview: "The uvw is a digital fashion collection inspired by the interplay of light and matter in physical versus digital realities.",
        process: "Light in the physical world is governed by physical laws, while in computer graphics, light knows no bounds.",
        outcome: "Inspired by the limitless possibilities of the digital medium, I explore the potential of using light as a material to create garments that transcend the constraints of physical materials. The aim is to explore the transformative power of light and the potential for fashion to exist beyond its static nature.",
        images: [
            "https://via.placeholder.com/800x600?text=Future+Skins+1",
            "https://via.placeholder.com/800x600?text=Future+Skins+2",
            "https://via.placeholder.com/800x600?text=Future+Skins+3"
        ]
    },
    2: {
        title: "SpooktaculAR",
        category: "Digital Fashion",
        shortDescription: "What if the most horrifying thing about your Halloween costume wasn't the oil-based plastics, the one-time wear, or the landfill afterlife? If you're craving to look terrifying but worried you might regret it, fear not. I've created spooky AR costumes that deliver the fright and none of the horror.",
        overview: "Circular Narratives investigates how digital fashion and virtual clothing can offer sustainable alternatives to physical fashion production. The project proposes systems where digital garments can be owned, traded, and modified in virtual spaces without material waste.",
        process: "Research included interviews with sustainability experts, analysis of current circular economy models, and development of digital platforms for virtual clothing exchange. We created a proof-of-concept blockchain-based system for tracking digital garment ownership.",
        outcome: "The project includes a working prototype platform, design documentation, and a case study on how digital fashion could reduce environmental impact by 50% compared to traditional fashion.",
        images: [
            "https://via.placeholder.com/800x600?text=Circular+Narratives+1",
            "https://via.placeholder.com/800x600?text=Circular+Narratives+2",
            "https://via.placeholder.com/800x600?text=Circular+Narratives+3"
        ]
    },
    3: {
        title: "voronoi",
        category: "XR Fashion",
        shortDescription: "What if we co-design with the computer, inviting <em>coincidence</em> into the creative process, only to realize that randomness is a pattern still beyond our perception? Is what we call creative agency nothing more than a play of logic we cannot consciously grasp?",
        overview: "Glitch Couture is an experimental project that embraces digital imperfections and glitch aesthetics as a form of radical fashion design. It challenges the fashion industry's obsession with perfection by celebrating errors, artifacts, and unexpected digital phenomena.",
        process: "The project involved creating custom glitch algorithms, experimenting with corrupted 3D models, and developing a visual language around digital imperfection. We collaborated with digital artists to create a collection of glitched fashion designs.",
        outcome: "The project resulted in a limited edition digital collection and an exhibition exploring how imperfection can be beautiful. It sparked conversations about perfectionism in fashion and digital design.",
        images: [
            "https://via.placeholder.com/800x600?text=Glitch+Couture+1",
            "https://via.placeholder.com/800x600?text=Glitch+Couture+2",
            "https://via.placeholder.com/800x600?text=Glitch+Couture+3"
        ]
    },
    4: {
        title: "End Block",
        category: "Performance",
        shortDescription: "What if blockchain kept score of the clothes we leave behind? Would a personal disposal allowance shift us toward repair, exchange, and a higher sense of ownership? What if a system-imposed limit was the key to elevating your wardrobe?",
        overview: "End Block imagines a wardrobe economy where every person has a finite disposal allowance recorded on blockchain. Instead of treating garments as disposable, the project reframes clothing as accountable assets with visible afterlives.",
        process: "The work maps how a scoring ledger, disposal limits, and ownership records could influence behavior over time. Through speculative scenarios, the project tests how repair, exchange, and long-term care become more attractive when disposal has a measurable cost.",
        outcome: "End Block proposes a system narrative where limits elevate value: people buy with intention, keep items in circulation longer, and build stronger relationships with what they own. The project positions constraint as a design tool for more responsible wardrobe culture.",
        images: [
            "https://via.placeholder.com/800x600?text=End+Block+1",
            "https://via.placeholder.com/800x600?text=End+Block+2",
            "https://via.placeholder.com/800x600?text=End+Block+3"
        ]
    },
    5: {
        title: "Boredom-proof Checkout",
        category: "Intervention",
        shortDescription: "What if paying wasn’t effortless? Could a mini game in the checkout process interrupt impulse buying? Could a moment of distraction break the cycle of instant gratification and reveal whether the purchase is driven by desire or simply boredom?",
        overview: "Boredom-proof Checkout reframes payment as a reflective pause rather than a frictionless finish. By inserting a short mini game at checkout, the project tests whether momentary interruption can expose impulse behavior and create space for intentional decision-making.",
        process: "The intervention maps the emotional arc of online buying and identifies the instant-gratification moment where impulse is strongest. A lightweight mini game is placed before payment confirmation to introduce cognitive delay, redirect attention, and prompt users to reassess whether they still want the item.",
        outcome: "The concept proposes checkout friction as a behavioral design tool: not to block purchases, but to make desire more conscious. By turning a split-second transaction into a brief reflection, the project reveals when purchases are genuinely wanted versus driven by boredom.",
        images: [
            "https://via.placeholder.com/800x600?text=Boredom-proof+Checkout+1",
            "https://via.placeholder.com/800x600?text=Boredom-proof+Checkout+2",
            "https://via.placeholder.com/800x600?text=Boredom-proof+Checkout+3"
        ]
    },
    6: {
        title: "Trick-or-Treat",
        category: "Craftvism",
        shortDescription: "Radical experiments that challenge the boundaries between fashion, art, and technology—pushing the conventions of digital design.",
        overview: "Boundary Breaking is a series of experimental projects that intentionally blur the lines between fashion, art installation, and interactive technology. It challenges conventional understandings of what fashion can be.",
        process: "The project involved collaboration with artists, programmers, and designers. We experimented with AR, VR, generative design, and interactive installations. Each piece was designed to provoke questions about fashion's future.",
        outcome: "An interactive exhibition, a series of provocative designs, and community engagement through workshops. The project has generated significant discussion about experimental fashion and the role of technology in design.",
        images: [
            "https://via.placeholder.com/800x600?text=Boundary+Breaking+1",
            "https://via.placeholder.com/800x600?text=Boundary+Breaking+2",
            "https://via.placeholder.com/800x600?text=Boundary+Breaking+3"
        ]
    }
};

// Get project ID from URL
function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

// Load project data
function loadProject(id) {
    const project = projects[id];
    
    if (!project) {
        window.location.href = 'index.html';
        return;
    }

    // Update page title
    document.title = project.title + " - silviciouƨ";

    // Populate project info
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-description').innerHTML = `<p>${project.shortDescription}</p>`;
    document.getElementById('project-overview').textContent = project.overview;
    document.getElementById('project-process').textContent = project.process;
    document.getElementById('project-outcome').textContent = project.outcome;

    // Update slider images
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.innerHTML = '';
    
    project.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `<img src="${image}" alt="Project image ${index + 1}">`;
        slidesContainer.appendChild(slide);
    });

    // Update indicators
    const indicatorsContainer = document.querySelector('.slider-indicators');
    indicatorsContainer.innerHTML = '';
    
    project.images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.dataset.index = index;
        indicatorsContainer.appendChild(indicator);
    });

    // Reset slider to first slide
    currentSlide = 0;
    setupSliderEventListeners();
}

// Slider functionality
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Hide all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Show current slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
}

function setupSliderEventListeners() {
    // Next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.onclick = nextSlide;
    }

    // Previous button
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.onclick = prevSlide;
    }

    // Indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            goToSlide(parseInt(indicator.dataset.index));
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
}

function syncSliderMediaMode() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    if (!sliderWrapper || !slides.length) return;

    const hasMotionMedia = Array.from(slides).some((slide) => slide.querySelector('iframe, video'));
    sliderWrapper.classList.toggle('has-motion-media', hasMotionMedia);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const projectId = getProjectId();
    loadProject(projectId);
    syncSliderMediaMode();
});
