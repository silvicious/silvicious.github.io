// Project data
const projects = {
    1: {
        title: "Future Skins",
        category: "Speculative Design",
        shortDescription: "Exploring the intersection of bio-tech and fashion, imagining garments that adapt to our bodies and environments in speculative futures.",
        overview: "Future Skins is a speculative design project that imagines how biotechnology and fashion could merge. The project explores adaptive garments that respond to environmental conditions and bodily needs, creating a narrative around human-technology integration in fashion.",
        process: "The design process involved research into bio-responsive materials, interviews with biotech experts, and iterative digital prototyping. We used 3D modeling and animation to visualize how these adaptive garments might function in different scenarios.",
        outcome: "The project resulted in a series of digital designs and a speculative video showing the garments in use, which was presented at multiple design conferences and featured in digital fashion publications.",
        images: [
            "https://via.placeholder.com/800x600?text=Future+Skins+1",
            "https://via.placeholder.com/800x600?text=Future+Skins+2",
            "https://via.placeholder.com/800x600?text=Future+Skins+3"
        ]
    },
    2: {
        title: "Circular Narratives",
        category: "Digital Fashion",
        shortDescription: "Digital design solutions for circular fashion systems, exploring how technology can create sustainable narratives and reduce waste.",
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
        title: "Glitch Couture",
        category: "XR Fashion",
        shortDescription: "Radical experimentation with digital aesthetics, glitch art, and fashion design to challenge traditional notions of beauty and perfection.",
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
        title: "Biometric Wear",
        category: "Performance",
        shortDescription: "Speculating on wearable technology integrated into fashion, exploring how garments could monitor and respond to human biometric data.",
        overview: "Biometric Wear speculates on a future where fashion garments are embedded with sensors and respond to the wearer's biometric data. The project explores how clothing could become more personal and intelligent through technology integration.",
        process: "We researched emerging wearable technologies, conducted user interviews about desired features, and created detailed concept mockups. The design process included prototyping interactions and visualizing data visualization within fashion design.",
        outcome: "The project includes interactive prototypes, design scenarios, and a comprehensive design guide for integrating biometric sensing into fashion. It has been featured in multiple tech and fashion publications.",
        images: [
            "https://via.placeholder.com/800x600?text=Biometric+Wear+1",
            "https://via.placeholder.com/800x600?text=Biometric+Wear+2",
            "https://via.placeholder.com/800x600?text=Biometric+Wear+3"
        ]
    },
    5: {
        title: "Waste to Wonder",
        category: "Intervention",
        shortDescription: "Transforming digital waste and obsolete materials into speculative fashion designs that tell stories of sustainability and innovation.",
        overview: "Waste to Wonder explores how digital waste and obsolete technology can be transformed into speculative fashion designs. The project tells stories of circular material cycles and gives new life to discarded items through fashion.",
        process: "We researched digital waste streams, documented obsolete technology lifecycles, and created digital designs inspired by these materials. The project includes 3D scans of e-waste and AI-generated design variations.",
        outcome: "A fully realized digital collection with accompanying documentation about material sustainability. The project has been exhibited in several galleries and sparked community discussions about waste and fashion.",
        images: [
            "https://via.placeholder.com/800x600?text=Waste+to+Wonder+1",
            "https://via.placeholder.com/800x600?text=Waste+to+Wonder+2",
            "https://via.placeholder.com/800x600?text=Waste+to+Wonder+3"
        ]
    },
    6: {
        title: "Boundary Breaking",
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const projectId = getProjectId();
    loadProject(projectId);
});
