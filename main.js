/*==================== MENU SHOW / HIDE ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Show menu */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
        navToggle.setAttribute('aria-expanded', 'true');
    });
}

/* Hide menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
        navToggle.setAttribute('aria-expanded', 'false');
    });
}

/* Remove menu on mobile */
const navLink = document.querySelectorAll('.nav__link');
navLink.forEach(n => 
    n.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        navToggle.setAttribute('aria-expanded', 'false');
    })
);

/* Close menu with ESC key */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

/*==================== SKILLS TOGGLE ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skills__content');
    
    // Add click event to each skill card header
    skillCards.forEach(card => {
        const header = card.querySelector('.skills__header');
        
        header.addEventListener('click', function() {
            // Toggle open class on clicked card
            card.classList.toggle('open');
            
            // Update arrow rotation
            const arrow = header.querySelector('.skills__arrow');
            if (card.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Optional: Open first card by default
    if(skillCards.length > 0) {
        skillCards[0].classList.add('open');
        const firstArrow = skillCards[0].querySelector('.skills__arrow');
        firstArrow.style.transform = 'rotate(180deg)';
    }
});






/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

// Function to switch tabs
function switchTab(targetTab) {
    const targetId = targetTab.getAttribute('data-target');
    const targetContent = document.querySelector(targetId);
    
    if(!targetContent) return;

    // Hide all tab contents
    tabContents.forEach(tc => {
        tc.classList.remove('qualification__active');
        tc.setAttribute('aria-hidden', 'true');
        tc.style.display = 'none';
    });
    
    // Show target content
    targetContent.classList.add('qualification__active');
    targetContent.setAttribute('aria-hidden', 'false');
    targetContent.style.display = 'block';
    
    // Update tab states
    tabs.forEach(t => {
        t.classList.remove('qualification__active');
        t.setAttribute('aria-selected', 'false');
    });
    
    targetTab.classList.add('qualification__active');
    targetTab.setAttribute('aria-selected', 'true');
    
    // Store active tab in localStorage
    localStorage.setItem('active-qualification-tab', targetId);
}

// Initialize tabs
tabs.forEach(tab =>{
    tab.addEventListener('click', () => switchTab(tab));
    
    // Initialize ARIA attributes
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', 'false');
    const targetId = tab.getAttribute('data-target');
    tab.setAttribute('aria-controls', targetId.substring(1));
});

// Set first tab as active by default
if(tabs.length > 0){
    // Check if there's a saved preference
    const savedTab = localStorage.getItem('active-qualification-tab');
    const savedTabElement = savedTab ? document.querySelector(`[data-target="${savedTab}"]`) : null;
    
    if(savedTabElement){
        switchTab(savedTabElement);
    } else {
        // Default to first tab
        tabs[0].classList.add('qualification__active');
        tabs[0].setAttribute('aria-selected', 'true');
        
        // Show first content
        const firstContentId = tabs[0].getAttribute('data-target');
        const firstContent = document.querySelector(firstContentId);
        if(firstContent){
            firstContent.classList.add('qualification__active');
            firstContent.setAttribute('aria-hidden', 'false');
            firstContent.style.display = 'block';
        }
    }
}

// Add keyboard navigation for tabs
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const activeTab = document.querySelector('[role="tab"][aria-selected="true"]');
        if(!activeTab) return;
        
        const tabArray = Array.from(tabs);
        const currentIndex = tabArray.indexOf(activeTab);
        let nextIndex;
        
        if(e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % tabArray.length;
        } else {
            nextIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
        }
        
        switchTab(tabArray[nextIndex]);
        tabArray[nextIndex].focus();
    }
});
/*==================== PUBLICATIONS INTERACTIVITY ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Publication data for modal
    const publicationData = {
        1: {
            title: "Maternal Health Risk Factors Dataset: Clinical Parameters and Insights from Rural Bangladesh",
            authors: "Mayen Uddin Mojumdar, Dhiman Sarker, Md Assaduzzaman, Hasin Arman Shifa, Md. Anisul Haque Sajeeb, <strong>Oahidul Islam</strong>, Md Shadikul Bari, Mohammad Jahangir Alam , Narayan Ranjan Chakraborty",
            journal: "Data in Brief, Elsevier",
            year: "2025",
            abstract: "The study presents a comprehensive dataset of 1206 pregnant women from Kurigram General Hospital, investigating the impact of pre-existing diabetes on maternal health risks. Using statistical tests including Chi-Square, Z-test, T-test, and ANOVA, the research reveals a strong association between pre-existing diabetes and higher pregnancy risk levels, significantly affecting BMI and other vital clinical indicators. The dataset serves as a critical resource for advancing maternal health research and developing predictive models in resource-constrained settings.",
            contribution: [
                "Developed and implemented data preprocessing and analysis code",
                "Performed Exploratory Data Analysis (EDA) for visual and statistical insights",
                "Conducted advanced statistical analysis using Chi-Square, Z-test, T-test, and ANOVA",
                "Contributed to writing the data article, summarizing findings and methodologies",
                "Ensured reproducibility and clarity of the analytical workflow"
            ],
            link: "https://www.sciencedirect.com/science/article/pii/S2352340925000952",
            metrics: ["Medical Dataset", "Statistical Analysis", "1206 Patients", "Rural Bangladesh"]
        },
        2: {
            title: "Transformer with Explainable AI: A Synergistic Approach to Smart Grid Stability Analysis",
            authors: "Sumaia Akter; <strong>Oahidul Islam</strong>; Tanjid Ahmed; Md Shamim Ahamed; Md Hasan Talukdar",
            journal: "IEEE International Conference",
            year: "2024",
            abstract: "This research introduces machine learning (ML) and deep learning (DL) models for smart grid stability prediction. Our proposed model, TabTransformer obtained the best results on the assessed methodologies at 99.40% test accuracy and an AUC-ROC score of 1.0. Additionally, our research combined with explainability approaches in the form of SHAP and LIME that will further provide insight into the decision-making process, enhancing model transparency and trustworthiness for real-world smart grid applications.",
            contribution: [
                "Lead researcher in developing the TabTransformer architecture",
                "Integrated Explainable AI (XAI) techniques for model transparency",
                "Conducted comparative analysis with traditional ML models",
                "Authored the manuscript and presented findings",
                "Coordinated research workflow and experimental design"
            ],
            link: "https://ieeexplore.ieee.org/abstract/document/11013447/",
            metrics: ["99.40% Accuracy", "Smart Grid AI", "XAI Integration", "TabTransformer"]
        },
        3: {
            title: "An Explainable AI-based Blood Cell Classification using Optimized Convolutional Neural Network",
            authors: "<strong>Oahidul Islam</strong>, Md Assaduzzaman , Md Zahid Hasan",
            journal: "Journal of Pathology Informatics, Elsevier",
            year: "2024",
            abstract: "The paper presents a high-performing, interpretable deep learning approach for classifying four types of white blood cells (WBCs): eosinophils, lymphocytes, monocytes, and neutrophils. A novel, optimized CNN architecture achieved a testing accuracy of 99.12%, surpassing transfer learning baselines including Inception V3, MobileNetV2, and DenseNet201. To tackle the 'black box' nature of deep learning, explainable AI (XAI) techniques such as SHAP, LIME, Grad-CAM, and Grad-CAM++ were integrated, enhancing model transparency. The model was successfully deployed in a user-friendly web and Android application.",
            contribution: [
                "Conceived the research idea and led the project from design to implementation",
                "Designed and developed the optimized CNN architecture tailored for WBC classification",
                "Applied and analyzed multiple Explainable AI (XAI) techniques",
                "Conducted comparative evaluation with state-of-the-art transfer learning models",
                "Built and deployed end-to-end system for web and Android platforms"
            ],
            link: "https://www.sciencedirect.com/science/article/pii/S2153353924000282",
            metrics: ["99.12% Accuracy", "Medical AI", "XAI Integration", "Web & Mobile App"]
        },
        4: {
            title: "A Benchmark Dataset for Analyzing Hematological Responses to Dengue Fever in Bangladesh",
            authors: ">Md․ Assaduzzaman , <strong>Oahidul Islam</strong>, Md․ Asraful Sharker Nirob , Md․ Minhajul Hayat Mim , Arif Mahmud",
            journal: "Data in Brief, Elsevier",
            year: "2024",
            abstract: "The study presents a dataset of 1003 dengue patients from Kalai, Jaipurhat, analyzing hematological parameters to identify gender-specific patterns and potential diagnostic markers. While no significant association was found between sex and overall diagnosis, statistically significant differences in hemoglobin levels between males and females were observed. The dataset holds promise for developing predictive models, improving clinical insights, and enhancing public health responses to dengue in endemic regions.",
            contribution: [
                "Implemented code for data preprocessing, cleaning, and normalization",
                "Conducted Exploratory Data Analysis (EDA) and visualized key hematological trends",
                "Performed advanced statistical analyses (Chi-Square, Z-test, T-test, ANOVA)",
                "Co-authored the manuscript, contributing to data interpretation and insights",
                "Designed reproducible analysis pipelines for future research applications"
            ],
            link: "https://www.sciencedirect.com/science/article/pii/S2352340924009922",
            metrics: ["1003 Patients", "Dengue Research", "Hematological Analysis", "Bangladesh"]
        },
        5: {
            title: "Multi-Head Self-Attention Mechanisms in Vision Transformers for Retinal Image Classification",
            authors: "<strong>Oahidul Islam</strong>; Kowshik Kumer; Sumaia Akter; Md Mohi Uddin",
            journal: "IEEE Conference",
            year: "2024",
            abstract: "The paper explores the application of Vision Transformers (ViTs) in the automated detection of Diabetic Retinopathy (DR). By leveraging multi-head self-attention mechanisms, the model effectively identifies critical features from retinal images. The approach achieved high performance metrics, including a 96.13% accuracy, 0.92 precision, 0.95 recall, 0.93 F1 score, and a 0.969 ROC-AUC score. This study highlights the potential of ViTs in improving diagnostic accuracy, reducing manual workload, and enabling earlier intervention in DR cases.",
            contribution: [
                "Designed and implemented the Vision Transformer (ViT) architecture with multi-head self-attention",
                "Processed and preprocessed retinal image datasets for optimal model input",
                "Conducted model training, evaluation, and hyperparameter tuning",
                "Contributed to manuscript writing, experimental analysis, and interpretation",
                "Ensured reproducibility of the pipeline for real-world medical deployment"
            ],
            link: "https://ieeexplore.ieee.org/abstract/document/10795956",
            metrics: ["96.13% Accuracy", "Vision Transformer", "Diabetic Retinopathy", "Medical Imaging"]
        },
        6: {
            title: "Tuberculosis Disease Detection from Chest X-rays Using Deep Learning Techniques",
            authors: "Mehedi Hasan Rabby; <strong>Oahidul Islam</strong>; Md. Assaduzzaman; Monoronjon Dutta",
            journal: "IEEE International Conference",
            year: "2024",
            abstract: "The paper presents an efficient deep learning-based framework for identifying tuberculosis (TB) from chest X-ray (CXR) images. Leveraging a dataset of 3500 CXR images categorized into Tuberculosis and Normal classes, the study evaluates four prominent CNN architectures: VGG16, VGG19, MobileNetV2, and InceptionV3. Among these, MobileNetV2 outperformed the others, achieving 99.99% training accuracy and 98.93% test accuracy, making it the most robust model for automated TB detection.",
            contribution: [
                "Led the research direction and problem formulation focused on TB detection",
                "Conducted dataset cleaning, augmentation, and image preprocessing",
                "Implemented and fine-tuned all four CNN models (VGG16, VGG19, MobileNetV2, InceptionV3)",
                "Analyzed model performances and identified MobileNetV2 as the best fit",
                "Wrote manuscript draft and coordinated team inputs and revisions"
            ],
            link: "https://ieeexplore.ieee.org/abstract/document/10441031/",
            metrics: ["98.93% Accuracy", "TB Detection", "MobileNetV2", "3500 CXR Images"]
        }
    };

    // Elements
    const modal = document.getElementById('publicationModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.publication__modal-close');
    const detailBtns = document.querySelectorAll('.publication__details-btn');
    const filterBtns = document.querySelectorAll('.publications__filter-btn');
    const publicationCards = document.querySelectorAll('.publication__card');

    // Open modal with publication details
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pubId = this.getAttribute('data-publication');
            const data = publicationData[pubId];
            
            if (data) {
                modalBody.innerHTML = `
                    <div class="publication__modal-header">
                        <span class="publication__modal-badge">${data.year}</span>
                        <h2 class="publication__modal-title">${data.title}</h2>
                        <div class="publication__modal-authors">${data.authors}</div>
                        <div class="publication__modal-journal">
                            <i class="uil uil-book-open"></i> ${data.journal}
                        </div>
                    </div>
                    
                    <div class="publication__modal-metrics">
                        ${data.metrics.map(metric => `
                            <span class="publication__modal-metric">${metric}</span>
                        `).join('')}
                    </div>
                    
                    <div class="publication__modal-section">
                        <h3>Abstract</h3>
                        <p>${data.abstract}</p>
                    </div>
                    
                    <div class="publication__modal-section">
                        <h3>My Contribution</h3>
                        <ul>
                            ${data.contribution.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="publication__modal-links">
                        <a href="${data.link}" class="publication__modal-link" target="_blank">
                            <i class="uil uil-external-link-alt"></i> View Full Publication
                        </a>
                        <button class="publication__modal-close-btn">
                            <i class="uil uil-times"></i> Close
                        </button>
                    </div>
                `;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add event listener to close button inside modal
                const closeModalBtn = modalBody.querySelector('.publication__modal-close-btn');
                if (closeModalBtn) {
                    closeModalBtn.addEventListener('click', closeModal);
                }
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Filter publications
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter publications
            publicationCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Add hover effects for cards
    publicationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});


/*==================== TESTIMONIAL SWIPER ====================*/
if (document.querySelector(".testimonial__container")) {
    let swiperTestimonial = new Swiper('.testimonial__container',{
        loop: true,
        grabCursor: true,
        spaceBetween: 48,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination:{
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints:{ 
            568:{ slidesPerView: 1 },
            768:{ slidesPerView: 2 },
            1024:{ slidesPerView: 3 }
        }
    });
}



/*==================== SCROLL ACTIVE SECTION ====================*/
const sections = document.querySelectorAll('section[id]');

// Debounce function for scroll performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function scrollActive(){
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Find current active section
    let currentSection = '';
    
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 100,
              sectionId = current.getAttribute('id'),
              link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(link){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                link.classList.add('active-link');
                currentSection = sectionId;
            } else {
                link.classList.remove('active-link');
            }
        }
    });
    
    // Update URL hash without scrolling
    if(currentSection && history.replaceState) {
        history.replaceState(null, null, '#' + currentSection);
    }
}
window.addEventListener('scroll', debounce(scrollActive));

/*==================== ACCORDION ====================*/
const accordion = document.getElementsByClassName('contentBx');
for (let i = 0; i < accordion.length; i++){
    accordion[i].addEventListener('click', function(){
        this.classList.toggle('active');
        
        // Update ARIA expanded attribute
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        
        // Find and toggle the content
        const content = this.querySelector('.content');
        if(content) {
            if(isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0px";
            }
        }
    });
    
    // Initialize ARIA attributes
    accordion[i].setAttribute('aria-expanded', 'false');
    accordion[i].setAttribute('role', 'button');
}

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header');
    if(nav){
        if(window.scrollY >= 80) nav.classList.add('scroll-header');
        else nav.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', debounce(scrollHeader));

/*==================== SHOW SCROLL UP BUTTON ====================*/
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(scrollUp){
        if(window.scrollY >= 560) scrollUp.classList.add('show-scroll');
        else scrollUp.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', debounce(scrollUp));

// Smooth scroll to top
const scrollUpBtn = document.getElementById('scroll-up');
if(scrollUpBtn){
    scrollUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*==================== DARK / LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

if(themeButton){
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');

    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

    if(selectedTheme){
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    }

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        
        // Update button text for screen readers
        const isDark = document.body.classList.contains(darkTheme);
        themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
    
    // Initialize ARIA label
    const isDark = document.body.classList.contains(darkTheme);
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

/*==================== MENTOR AUTO SLIDER ====================*/
const mentorSlides = document.querySelectorAll("#mentorSlider .mentor-card");
let mentorIndex = 0;
let mentorInterval;

function showMentorSlides(){
    mentorSlides.forEach((slide, i) => {
        slide.style.opacity = (i === mentorIndex) ? "1" : "0";
        slide.style.zIndex = (i === mentorIndex) ? "1" : "0";
    });
    mentorIndex = (mentorIndex + 1) % mentorSlides.length;
}

function startMentorSlider() {
    mentorInterval = setInterval(showMentorSlides, 6000);
}

function stopMentorSlider() {
    clearInterval(mentorInterval);
}

if(mentorSlides.length > 0){
    const mentorSlider = document.getElementById('mentorSlider');
    if(mentorSlider) {
        mentorSlider.addEventListener('mouseenter', stopMentorSlider);
        mentorSlider.addEventListener('mouseleave', startMentorSlider);
        mentorSlider.addEventListener('focusin', stopMentorSlider);
        mentorSlider.addEventListener('focusout', startMentorSlider);
    }
    showMentorSlides();
    startMentorSlider();
}

/*==================== ACHIEVEMENT SLIDER ====================*/
let achIndex = 0;
const achCards = document.querySelectorAll(".achievement-card");
const dotContainer = document.getElementById("achievementDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let achInterval;

if(achCards.length > 0 && dotContainer){
    // Create dots
    achCards.forEach((_, i) => {
        let dot = document.createElement("span");
        dot.setAttribute("aria-label", `Go to achievement ${i + 1}`);
        dot.setAttribute("role", "button");
        dot.setAttribute("tabindex", "0");
        dot.addEventListener("click", () => {
            resetTimer();
            showAch(i);
        });
        
        // Keyboard support for dots
        dot.addEventListener("keydown", (e) => {
            if(e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                resetTimer();
                showAch(i);
            }
        });
        
        dotContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll("#achievementDots span");

    function showAch(n) {
        achIndex = (n + achCards.length) % achCards.length;
        
        achCards.forEach(card => {
            card.classList.remove("active");
            card.setAttribute("aria-hidden", "true");
        });
        dots.forEach(dot => dot.classList.remove("active"));

        achCards[achIndex].classList.add("active");
        achCards[achIndex].setAttribute("aria-hidden", "false");
        dots[achIndex].classList.add("active");
        
        // Update counter
        updateCounter();
    }

    // Navigation buttons
    if(prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            resetTimer();
            showAch(achIndex - 1);
        });
        
        nextBtn.addEventListener("click", () => {
            resetTimer();
            showAch(achIndex + 1);
        });
        
        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if(e.key === "ArrowLeft") {
                resetTimer();
                showAch(achIndex - 1);
            } else if(e.key === "ArrowRight") {
                resetTimer();
                showAch(achIndex + 1);
            }
        });
    }

    // Auto-rotate function
    function startAutoSlide() {
        achInterval = setInterval(() => {
            showAch(achIndex + 1);
        }, 8000);
    }

    function resetTimer() {
        clearInterval(achInterval);
        startAutoSlide();
    }

    // Pause on hover
    const wrapper = document.querySelector(".achievement-wrapper");
    if(wrapper) {
        wrapper.addEventListener("mouseenter", () => clearInterval(achInterval));
        wrapper.addEventListener("mouseleave", startAutoSlide);
        wrapper.addEventListener("focusin", () => clearInterval(achInterval));
        wrapper.addEventListener("focusout", startAutoSlide);

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        wrapper.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(achInterval);
        });
        
        wrapper.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if(touchEndX < touchStartX - swipeThreshold) {
                showAch(achIndex + 1);
            }
            if(touchEndX > touchStartX + swipeThreshold) {
                showAch(achIndex - 1);
            }
        }
    }

    // Counter function
    function updateCounter() {
        let counter = document.querySelector(".achievement-counter");
        if(!counter) {
            counter = document.createElement("div");
            counter.className = "achievement-counter";
            counter.setAttribute("aria-live", "polite");
            counter.setAttribute("aria-atomic", "true");
            dotContainer.parentNode.insertBefore(counter, dotContainer.nextSibling);
        }
        counter.textContent = `${achIndex + 1} of ${achCards.length}`;
        counter.setAttribute("aria-label", `Achievement ${achIndex + 1} of ${achCards.length}`);
    }

    // Initialize
    showAch(0);
    startAutoSlide();
}

/*==================== SMOOTH SCROLL ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if(href === "#") return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if(target) {
            // Close mobile menu if open
            if(navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without triggering scroll
            if(history.pushState) {
                history.pushState(null, null, href);
            }
        }
    });
});

/*==================== LAZY LOADING FOR IMAGES ====================*/
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '0px 0px 100px 0px'
});

lazyImages.forEach(img => imageObserver.observe(img));

/*==================== INITIALIZE ON DOM LOAD ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loaded');
    
    // Initialize any components that need it
    scrollActive();
    scrollHeader();
    scrollUp();
    
    // Remove initial loading state
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
});


/*==================== RESIZE HANDLER ====================*/
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any layout-dependent values
        const activeAccordions = document.querySelectorAll('.contentBx.active');
        activeAccordions.forEach(accordion => {
            const content = accordion.querySelector('.content');
            if(content) {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }, 250);
});



// Add this JavaScript for interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Update visit counter (mock)
    const visitCount = document.getElementById('visitCount');
    if (visitCount) {
        // Simulate random visit count
        const visits = Math.floor(Math.random() * 10000) + 1000;
        visitCount.textContent = visits.toString().padStart(4, '0');
    }
    
    // Update last updated time
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        const now = new Date();
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        lastUpdated.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.footer__input').value;
            
            // Show success message
            const submitBtn = this.querySelector('.footer__submit');
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="uil uil-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                this.reset();
            }, 2000);
        });
    }
    
    // Animate tech badges on hover
    const techBadges = document.querySelectorAll('.footer__tech-badge');
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(0) scale(1)';
        });
    });
});

/*==================== PORTFOLIO INTERACTIVITY ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Project data for modal - completed all 9 projects
    const projectData = {
        1: {
            title: "AmarCare - AI-Powered Health Assistant",
            description: "AmarCare is an intelligent healthcare platform that combines machine learning disease prediction with Gemini AI-powered medical assistance. The system helps users assess their risk for diabetes, heart disease, and kidney disease while providing instant health information through an AI chatbot. This project represents a significant step forward in making healthcare more accessible through AI technology.",
            features: [
                "Multi-disease prediction (Diabetes, Heart Disease, Kidney Disease)",
                "Gemini AI-powered medical chatbot",
                "Personalized risk assessment algorithms",
                "User-friendly web interface",
                "Real-time health insights"
            ],
            technologies: ["Python", "Machine Learning", "Gemini AI API", "Flask", "HTML/CSS/JS", "Scikit-learn"],
            github: "https://github.com/wahidpanda/AmarCare",
            demo: null,
            category: "health ai",
            impact: "Improves healthcare accessibility through AI-powered diagnostics and guidance"
        },
        2: {
            title: "AI-Doctor-Alert",
            description: "An intelligent medical urgency analysis system that processes audio recordings, transcribes medical conversations, analyzes urgency levels, and automatically alerts doctors for critical cases using AI-powered classification. The system helps prioritize patient care and ensures timely medical attention for urgent cases.",
            features: [
                "Audio recording processing and transcription",
                "Urgency level classification (Critical/Non-Critical)",
                "Automated doctor alert system",
                "Real-time analysis dashboard",
                "Medical terminology recognition"
            ],
            technologies: ["Python", "Streamlit", "Speech Recognition", "NLP", "Machine Learning", "Audio Processing"],
            github: "https://github.com/wahidpanda/AI-Doctor-Alert",
            demo: "https://ai-doctor-alert.streamlit.app/",
            category: "health ai",
            impact: "Reduces emergency response time by automatically identifying and alerting for critical medical cases"
        },
        3: {
            title: "ScholarSnap - Research Summarizer",
            description: "ScholarSnap is an innovative Chrome Extension designed to revolutionize academic research by leveraging AI to simplify paper analysis, citation formatting, and multi-document processing. Built during the Google Chrome Hackathon, this tool empowers students, teachers, and researchers to navigate complex academic materials efficiently.",
            features: [
                "Automatic research paper summarization",
                "Citation formatting for multiple styles (APA, MLA, Chicago)",
                "Multi-document comparison and analysis",
                "One-click key insights extraction",
                "Integration with academic databases"
            ],
            technologies: ["JavaScript", "Chrome Extension API", "Natural Language Processing", "AI Models", "HTML/CSS"],
            github: "https://github.com/wahidpanda/ScholarSnap--Research-Summarizer",
            demo: null,
            category: "research ai",
            impact: "Accelerates academic research by automating tedious tasks and providing intelligent insights"
        },
        4: {
            title: "MusicLLM - AI Music Therapy Platform",
            description: "A comprehensive AI-powered platform for music analysis, virality prediction, and expert recommendations for autism therapy. Combines audio processing, machine learning, and large language models to provide actionable insights for therapeutic applications. The system helps therapists select appropriate music for different therapy sessions.",
            features: [
                "Music analysis for therapeutic properties",
                "Virality prediction for music tracks",
                "Autism therapy recommendations",
                "Audio feature extraction",
                "Therapist dashboard with insights"
            ],
            technologies: ["Python", "LLM", "Audio Processing", "Streamlit", "Machine Learning", "Signal Processing"],
            github: "https://github.com/wahidpanda/AI_Engineer_Assesment_Test",
            demo: "https://musicllm.streamlit.app/",
            category: "ai",
            impact: "Enhances music therapy effectiveness through data-driven insights and personalized recommendations"
        },
        5: {
            title: "CourseCat - Course Recommendation System",
            description: "CourseCat is an intelligent course recommendation system that helps learners discover the perfect courses tailored to their interests using advanced machine learning algorithms and collaborative filtering techniques. The system analyzes user preferences, learning patterns, and course content to provide personalized recommendations.",
            features: [
                "Personalized course recommendations",
                "Collaborative filtering algorithms",
                "User preference analysis",
                "Course content matching",
                "Learning path optimization"
            ],
            technologies: ["Python", "Machine Learning", "Flask", "Recommendation Systems", "Pandas", "Scikit-learn"],
            github: "https://github.com/wahidpanda/CourseCat---Your-Ultimate-Course-Recommendation-System",
            demo: null,
            category: "ai web",
            impact: "Improves learning outcomes by matching students with courses that align with their interests and goals"
        },
        6: {
            title: "AI Research Assistant",
            description: "An intelligent tool that helps users conduct in-depth research on any topic by generating insights, trends, and valuable information with academic sources integration and customizable output formats. The assistant can analyze research papers, extract key information, and provide comprehensive summaries.",
            features: [
                "Topic-based research generation",
                "Academic source integration",
                "Customizable output formats",
                "Trend analysis and insights",
                "Multi-language support"
            ],
            technologies: ["Python", "AI", "Web Scraping", "Data Analysis", "NLP", "Research Tools"],
            github: "https://github.com/wahidpanda/Research-Agent",
            demo: null,
            category: "research ai",
            impact: "Reduces research time by automating information gathering and analysis processes"
        },
        7: {
            title: "querry.ai",
            description: "An advanced data analysis and interactive application platform that integrates various features including data analysis, chatbot interaction, custom dashboards, and advanced analytics capabilities. Designed for data scientists and analysts to streamline their workflow.",
            features: [
                "Interactive data analysis",
                "AI-powered chatbot for queries",
                "Customizable dashboards",
                "Advanced analytics tools",
                "Data visualization engine"
            ],
            technologies: ["Python", "Data Science", "Dashboards", "Analytics", "Visualization", "Chatbots"],
            github: "https://github.com/wahidpanda/querry.ai",
            demo: null,
            category: "data ai",
            impact: "Enhances data analysis productivity through integrated AI tools and intuitive interfaces"
        },
        8: {
            title: "Dreamjob.AI",
            description: "An intelligent career development platform designed to empower job seekers with cutting-edge AI tools and personalized guidance. Developed as part of the Google AI Hackathon 2024, it offers resume optimization, interview preparation, and career path recommendations.",
            features: [
                "Resume analysis and optimization",
                "Interview preparation with AI feedback",
                "Career path recommendations",
                "Job market insights",
                "Skill gap analysis"
            ],
            technologies: ["Python", "ML", "AI Tools", "Career Tech", "NLP", "Recommendation Systems"],
            github: "https://github.com/wahidpanda/Dreamjob-AI",
            demo: null,
            category: "ai web",
            impact: "Improves job search success rates through personalized AI-powered career guidance"
        },
        9: {
            title: "AI Applications Collection",
            description: "A comprehensive collection of machine learning and AI applications including disease detection systems, recommendation engines, intelligent chatbots, and various other AI-powered solutions. This repository showcases various AI implementations and use cases.",
            features: [
                "Multiple AI applications in one collection",
                "Disease detection systems",
                "Recommendation engines",
                "Intelligent chatbots",
                "Various AI implementations"
            ],
            technologies: ["Python", "ML", "AI", "Applications", "Various Frameworks", "Data Science"],
            github: "https://github.com/wahidpanda?tab=repositories",
            demo: null,
            category: "ai",
            impact: "Provides a learning resource and showcases practical AI implementations across different domains"
        }
    };

    // Portfolio Filter Functionality
    const filterButtons = document.querySelectorAll('.portfolio__filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio__card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Show all cards if filter is 'all'
            if (filterValue === 'all') {
                portfolioCards.forEach(card => {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                });
            } else {
                // Filter cards based on category
                portfolioCards.forEach(card => {
                    const cardCategories = card.getAttribute('data-category').split(' ');
                    
                    if (cardCategories.includes(filterValue)) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    });

    // Modal Functionality
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('portfolioModalBody');
    const modalClose = document.querySelector('.portfolio__modal-close');
    const detailButtons = document.querySelectorAll('.portfolio__details-btn');

    // Function to open modal with project details
    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Create modal content
        const modalContent = `
            <div class="portfolio__modal-header">
                <div class="portfolio__modal-badge ${project.category.includes('health') ? 'health' : 
                    project.category.includes('research') ? 'research' : 
                    project.category.includes('web') ? 'web' : 
                    project.category.includes('data') ? 'data' : 'ai'}">
                    ${project.category.replace('ai', 'AI').toUpperCase()}
                </div>
                <h3 class="portfolio__modal-title">${project.title}</h3>
                <p class="portfolio__modal-impact"><strong>Impact:</strong> ${project.impact}</p>
            </div>
            
            <div class="portfolio__modal-description">
                <h4>Description</h4>
                <p>${project.description}</p>
            </div>
            
            <div class="portfolio__modal-features">
                <h4>Key Features</h4>
                <ul>
                    ${project.features.map(feature => `<li><i class="uil uil-check-circle"></i> ${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="portfolio__modal-technologies">
                <h4>Technologies Used</h4>
                <div class="portfolio__modal-tech-tags">
                    ${project.technologies.map(tech => `<span class="portfolio__modal-tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="portfolio__modal-links">
                ${project.github ? `<a href="${project.github}" class="portfolio__modal-link" target="_blank">
                    <i class="uil uil-github"></i> View on GitHub
                </a>` : ''}
                ${project.demo ? `<a href="${project.demo}" class="portfolio__modal-demo" target="_blank">
                    <i class="uil uil-external-link-alt"></i> Live Demo
                </a>` : ''}
            </div>
        `;

        modalBody.innerHTML = modalContent;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Add click event to detail buttons
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close modal functionality
    modalClose.addEventListener('click', () => {
        closeModal();
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Auto-rotate timer functionality (10 seconds each)
    let currentFilterIndex = 0;
    let rotationInterval;
    const filterValues = ['all', 'ai', 'health', 'web', 'data', 'research'];
    const filterLabels = ['All Projects', 'AI/ML Projects', 'Healthcare AI', 'Web Applications', 'Data Science', 'Research Tools'];
    
    // Function to start auto-rotation
    function startAutoRotation() {
        // Clear any existing interval
        if (rotationInterval) {
            clearInterval(rotationInterval);
        }
        
        // Start new interval (10 seconds each)
        rotationInterval = setInterval(() => {
            // Get the next filter value
            currentFilterIndex = (currentFilterIndex + 1) % filterValues.length;
            const nextFilter = filterValues[currentFilterIndex];
            
            // Find and click the corresponding filter button
            const nextButton = document.querySelector(`.portfolio__filter-btn[data-filter="${nextFilter}"]`);
            if (nextButton) {
                nextButton.click();
                
                // Optional: Show notification of current filter
                showFilterNotification(filterLabels[currentFilterIndex]);
            }
        }, 10000); // 10 seconds
    }
    
    // Function to show filter notification
    function showFilterNotification(filterName) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.filter-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'filter-notification';
        notification.innerHTML = `
            <span>Now showing: ${filterName}</span>
            <button class="filter-notification-close">
                <i class="uil uil-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--first-color);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(var(--first-color-rgb), 0.3);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 14px;
            font-weight: 500;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        `;
        
        // Add close button styles
        const closeBtn = notification.querySelector('.filter-notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Add close functionality
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Add CSS for animations
        if (!document.querySelector('#filter-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'filter-notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // Pause auto-rotation when user interacts with filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update current index based on clicked button
            const filterValue = button.getAttribute('data-filter');
            currentFilterIndex = filterValues.indexOf(filterValue);
            
            // Clear auto-rotation when user manually selects a filter
            if (rotationInterval) {
                clearInterval(rotationInterval);
                rotationInterval = null;
                
                // Show restart message
                showRestartMessage();
            }
        });
    });
    
    // Function to show restart message
    function showRestartMessage() {
        const existingMessage = document.querySelector('.restart-message');
        if (existingMessage) existingMessage.remove();
        
        const message = document.createElement('div');
        message.className = 'restart-message';
        message.innerHTML = `
            <span>Auto-rotation paused. Click to restart:</span>
            <button class="restart-rotation-btn">
                <i class="uil uil-play-circle"></i> Restart Auto-rotate
            </button>
        `;
        
        message.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--container-color);
            border: 1px solid rgba(var(--first-color-rgb), 0.2);
            padding: 10px 15px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 12px;
            color: var(--text-color);
            max-width: 250px;
        `;
        
        const restartBtn = message.querySelector('.restart-rotation-btn');
        restartBtn.style.cssText = `
            background: var(--first-color);
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            transition: background 0.3s ease;
        `;
        
        restartBtn.addEventListener('mouseenter', () => {
            restartBtn.style.background = 'var(--first-color-alt)';
        });
        
        restartBtn.addEventListener('mouseleave', () => {
            restartBtn.style.background = 'var(--first-color)';
        });
        
        restartBtn.addEventListener('click', () => {
            startAutoRotation();
            message.remove();
        });
        
        document.body.appendChild(message);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 10000);
    }
    
    // Add hover effect to pause auto-rotation on portfolio grid hover
    const portfolioGrid = document.querySelector('.portfolio__grid');
    portfolioGrid.addEventListener('mouseenter', () => {
        if (rotationInterval) {
            clearInterval(rotationInterval);
        }
    });
    
    portfolioGrid.addEventListener('mouseleave', () => {
        if (rotationInterval === null) {
            // Only restart if it was previously running
            return;
        }
    });
    
    // Start auto-rotation after page loads
    setTimeout(() => {
        startAutoRotation();
        showFilterNotification('Auto-rotation started (10s each)');
    }, 2000); // Start after 2 seconds
    
    // Add some CSS for modal content
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .portfolio__modal-header {
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(var(--first-color-rgb), 0.1);
            padding-bottom: 1rem;
        }
        
        .portfolio__modal-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 1rem;
        }
        
        .portfolio__modal-badge.health {
            background: rgba(46, 204, 113, 0.15);
            color: #27ae60;
        }
        
        .portfolio__modal-badge.ai {
            background: rgba(52, 152, 219, 0.15);
            color: #2980b9;
        }
        
        .portfolio__modal-badge.web {
            background: rgba(155, 89, 182, 0.15);
            color: #8e44ad;
        }
        
        .portfolio__modal-badge.data {
            background: rgba(230, 126, 34, 0.15);
            color: #d35400;
        }
        
        .portfolio__modal-badge.research {
            background: rgba(231, 76, 60, 0.15);
            color: #c0392b;
        }
        
        .portfolio__modal-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--title-color);
            margin-bottom: 0.5rem;
            line-height: 1.3;
        }
        
        .portfolio__modal-impact {
            font-size: 0.875rem;
            color: var(--text-color);
            background: rgba(var(--first-color-rgb), 0.05);
            padding: 0.75rem;
            border-radius: 0.5rem;
            border-left: 3px solid var(--first-color);
        }
        
        .portfolio__modal-description,
        .portfolio__modal-features,
        .portfolio__modal-technologies {
            margin-bottom: 2rem;
        }
        
        .portfolio__modal-description h4,
        .portfolio__modal-features h4,
        .portfolio__modal-technologies h4 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--title-color);
            margin-bottom: 1rem;
        }
        
        .portfolio__modal-description p {
            font-size: 1rem;
            line-height: 1.7;
            color: var(--text-color);
        }
        
        .portfolio__modal-features ul {
            list-style: none;
            padding-left: 0;
        }
        
        .portfolio__modal-features li {
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(var(--first-color-rgb), 0.05);
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
        }
        
        .portfolio__modal-features li:last-child {
            border-bottom: none;
        }
        
        .portfolio__modal-features li i {
            color: var(--first-color);
            margin-top: 0.25rem;
            font-size: 1rem;
        }
        
        .portfolio__modal-tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .portfolio__modal-tech-tag {
            padding: 0.5rem 1rem;
            background: rgba(var(--first-color-rgb), 0.1);
            color: var(--first-color);
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .portfolio__modal-links {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(var(--first-color-rgb), 0.1);
        }
        
        .portfolio__modal-link,
        .portfolio__modal-demo {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 1rem;
            border-radius: 0.75rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .portfolio__modal-link {
            background: var(--first-color);
            color: white;
        }
        
        .portfolio__modal-link:hover {
            background: var(--first-color-alt);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(var(--first-color-rgb), 0.3);
        }
        
        .portfolio__modal-demo {
            background: rgba(46, 204, 113, 0.1);
            color: #27ae60;
            border: 1px solid rgba(46, 204, 113, 0.2);
        }
        
        .portfolio__modal-demo:hover {
            background: rgba(46, 204, 113, 0.2);
            transform: translateY(-2px);
        }
        
        @media screen and (max-width: 768px) {
            .portfolio__modal-links {
                flex-direction: column;
            }
            
            .portfolio__modal-title {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(modalStyles);
});

// Add CSS for initial card animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .portfolio__card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .portfolio__card[style*="display: flex"] {
        animation: fadeInUp 0.5s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
/*==================== THEME SWITCHER ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const themeButton = document.getElementById('theme-button');
    const darkTheme = 'dark-theme';
    const iconTheme = 'uil-sun';
    
    // Check if theme was previously selected
    const selectedTheme = localStorage.getItem('selected-theme');
    const selectedIcon = localStorage.getItem('selected-icon');
    
    if (selectedTheme) {
        // Apply saved theme
        document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
        themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
    }
    
    // Toggle theme
    themeButton.addEventListener('click', () => {
        // Toggle dark theme
        document.body.classList.toggle(darkTheme);
        // Toggle icon
        themeButton.classList.toggle(iconTheme);
        
        // Save theme preference
        const isDark = document.body.classList.contains(darkTheme);
        localStorage.setItem('selected-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('selected-icon', themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun');
        
        // Dispatch custom event for portfolio updates
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { isDark: isDark }
        }));
    });
});
/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close');

modalBtns.forEach((modalBtn, i) =>{
    modalBtn.addEventListener('click', () =>{
        modalViews[i].classList.add('active-modal');
        modalViews[i].setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

modalCloses.forEach(close =>{
    close.addEventListener('click', () =>{
        modalViews.forEach(mv => {
            mv.classList.remove('active-modal');
            mv.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalViews.forEach(mv => {
            mv.classList.remove('active-modal');
            mv.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = 'auto';
    }
});

// Close modal when clicking outside
modalViews.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active-modal');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    });
});

/*==================== PORTFOLIO SWIPER ====================*/
if (document.querySelector(".portfolio__container")) {
    let swiper = new Swiper(".portfolio__container", {
        cssMode: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        mousewheel: true,
        keyboard: true,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
}
