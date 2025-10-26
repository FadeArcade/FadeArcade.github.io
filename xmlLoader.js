// Global XML data storage
let xmlData = null;

// Load XML data once and store globally
function loadXMLData() {
    return fetch('data.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            xmlData = data;
            return data;
        })
        .catch(error => {
            console.error('Error loading XML:', error);
            return null;
        });
}

// Load Home Page Content
function loadHomeContent() {
    if (!xmlData) return;
    
    try {
        // Load hero section
        const hero = xmlData.querySelector('home hero');
        if (hero) {
            const leftTitle = hero.querySelector('left-title');
            const leftDesc = hero.querySelector('left-description');
            const rightTitle = hero.querySelector('right-title');
            const rightDesc = hero.querySelector('right-description');
            const profileImg = hero.querySelector('profile-image');
            
            if (leftTitle) document.querySelector('.hero .left h1').textContent = leftTitle.textContent;
            if (leftDesc) document.querySelector('.hero .left p').textContent = leftDesc.textContent;
            if (rightTitle) document.querySelector('.hero .right h1').innerHTML = rightTitle.textContent;
            if (rightDesc) document.querySelector('.hero .right p').textContent = rightDesc.textContent;
            if (profileImg) document.querySelector('.hero .center .profile-link img').src = profileImg.textContent;
        }
        
        // Load carousel items
        const carouselItems = xmlData.querySelectorAll('home carousel item');
        const carousel = document.querySelector('.carousel');
        if (carousel && carouselItems.length > 0) {
            carousel.innerHTML = '';
            carouselItems.forEach(item => {
                const title = item.querySelector('title');
                const description = item.querySelector('description');
                const image = item.querySelector('image');
                const link = item.querySelector('link');
                const external = item.querySelector('external');
                
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                
                let linkElement = '';
                if (external && external.textContent === 'true') {
                    linkElement = `<a href="${link ? link.textContent : '#'}" target="_blank" class="carousel-link">`;
                } else {
                    linkElement = `<a href="${link ? link.textContent : '#'}" class="carousel-link">`;
                }
                
                carouselItem.innerHTML = `
                    ${linkElement}
                        <img src="${image ? image.textContent : ''}" alt="${title ? title.textContent : ''}">
                        <div class="carousel-content">
                            <h3>${title ? title.textContent : ''}</h3>
                            <p>${description ? description.textContent : ''}</p>
                        </div>
                    </a>
                `;
                carousel.appendChild(carouselItem);
            });
        }
    } catch (error) {
        console.error('Error loading home content:', error);
    }
}

// Load About Page Content
function loadAboutContent() {
    if (!xmlData) return;
    
    try {
        // Load Profile Section
        const profile = xmlData.querySelector('profile');
        if (profile) {
            const name = profile.querySelector('name');
            const tagline = profile.querySelector('tagline');
            
            if (name) document.querySelector('.profile-info h1').textContent = name.textContent;
            if (tagline) document.querySelector('.profile-info .location').textContent = tagline.textContent;
        }
        
        // Load About Section
        const aboutParagraphs = xmlData.querySelectorAll('about paragraph');
        if (aboutParagraphs.length > 0) {
            const aboutContent = Array.from(aboutParagraphs)
                .map(p => `<p>${p.textContent}</p><br>`)
                .join('');
            document.querySelector('.stats-header').innerHTML = 
                `<h2>About me</h2>${aboutContent}`;
        }
        
        // Load Skills
        const skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = '';
            xmlData.querySelectorAll('skills skill').forEach(skill => {
                const name = skill.querySelector('name');
                const icon = skill.querySelector('icon');
                const technologies = skill.querySelector('technologies');
                
                skillsGrid.innerHTML += `
                    <div class="skill-card">
                        <i class="${icon ? icon.textContent : ''}"></i>
                        <h4>${name ? name.textContent : ''}</h4>
                        <p>${technologies ? technologies.textContent : ''}</p>
                    </div>
                `;
            });
        }
        
        // Load Education
        const educationTimeline = document.querySelector('.education-timeline');
        if (educationTimeline) {
            educationTimeline.innerHTML = '';
            xmlData.querySelectorAll('education degree').forEach(degree => {
                const title = degree.querySelector('title');
                const institution = degree.querySelector('institution');
                const period = degree.querySelector('period');
                
                educationTimeline.innerHTML += `
                    <div class="education-card">
                        <h4>${title ? title.textContent : ''}</h4>
                        <p>${institution ? institution.textContent : ''}</p>
                        <p class="year">${period ? period.textContent : ''}</p>
                    </div>
                `;
            });
        }
        
        // Load Interests Carousel
        const interestsCarousel = document.querySelector('.interests-carousel');
        if (interestsCarousel) {
            interestsCarousel.innerHTML = '';
            xmlData.querySelectorAll('interests interest').forEach(interest => {
                const type = interest.querySelector('type');
                const image = interest.querySelector('image');
                const description = interest.querySelector('description');
                
                interestsCarousel.innerHTML += `
                    <div class="interests-carousel-item">
                        <div class="interest-image">
                            <img src="${image ? image.textContent : ''}" alt="${type ? type.textContent : ''}">
                        </div>
                        <div class="interest-content">
                            <h4>${type ? type.textContent : ''}</h4>
                            <p>${description ? description.textContent : ''}</p>
                        </div>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error('Error loading about content:', error);
    }
}

// Load Portfolio Content
function loadPortfolioContent() {
    if (!xmlData) return;
    
    try {
        // Load Websites
        const websitesSection = document.querySelector('#websites .portfolio-grid');
        if (websitesSection) {
            websitesSection.innerHTML = '';
            xmlData.querySelectorAll('portfolio websites project').forEach(project => {
                const title = project.querySelector('title');
                const description = project.querySelector('description');
                const image = project.querySelector('image');
                const link = project.querySelector('link');
                const external = project.querySelector('external');
                
                const target = external && external.textContent === 'true' ? ' target="_blank"' : '';
                
                websitesSection.innerHTML += `
                    <div class="portfolio-item">
                        <div class="item-image">
                            <img src="${image ? image.textContent : ''}" alt="${title ? title.textContent : ''}">
                        </div>
                        <div class="item-overlay">
                            <h3>${title ? title.textContent : ''}</h3>
                            <p>${description ? description.textContent : ''}</p>
                            <a href="${link ? link.textContent : '#'}" class="view-project"${target}>View Project</a>
                        </div>
                    </div>
                `;
            });
        }
        
        // Load Videos
        const videosSection = document.querySelector('#videos .portfolio-grid');
        if (videosSection) {
            videosSection.innerHTML = '';
            xmlData.querySelectorAll('portfolio videos project').forEach(project => {
                const title = project.querySelector('title');
                const description = project.querySelector('description');
                const image = project.querySelector('image');
                const link = project.querySelector('link');
                
                videosSection.innerHTML += `
                    <div class="portfolio-item">
                        <div class="item-image">
                            <img src="${image ? image.textContent : ''}" alt="${title ? title.textContent : ''}">
                        </div>
                        <div class="item-overlay">
                            <h3>${title ? title.textContent : ''}</h3>
                            <p>${description ? description.textContent : ''}</p>
                            <a href="${link ? link.textContent : '#'}" class="view-project" data-type="video">Watch Video</a>
                        </div>
                    </div>
                `;
            });
        }
        
        // Load Visuals
        const visualsSection = document.querySelector('#visuals .portfolio-grid');
        if (visualsSection) {
            visualsSection.innerHTML = '';
            xmlData.querySelectorAll('portfolio visuals project').forEach(project => {
                const title = project.querySelector('title');
                const description = project.querySelector('description');
                const image = project.querySelector('image');
                const link = project.querySelector('link');
                
                visualsSection.innerHTML += `
                    <div class="portfolio-item">
                        <div class="item-image">
                            <img src="${image ? image.textContent : ''}" alt="${title ? title.textContent : ''}">
                        </div>
                        <div class="item-overlay">
                            <h3>${title ? title.textContent : ''}</h3>
                            <p>${description ? description.textContent : ''}</p>
                            <a href="${link ? link.textContent : '#'}" class="view-project" data-type="image">View Full Size</a>
                        </div>
                    </div>
                `;
            });
        }
        
        // Load Photos
        const photosSection = document.querySelector('#photos .portfolio-grid');
        if (photosSection) {
            photosSection.innerHTML = '';
            xmlData.querySelectorAll('portfolio photos project').forEach(project => {
                const title = project.querySelector('title');
                const description = project.querySelector('description');
                const image = project.querySelector('image');
                const link = project.querySelector('link');
                
                photosSection.innerHTML += `
                    <div class="portfolio-item">
                        <div class="item-image">
                            <img src="${image ? image.textContent : ''}" alt="${title ? title.textContent : ''}">
                        </div>
                        <div class="item-overlay">
                            <h3>${title ? title.textContent : ''}</h3>
                            <p>${description ? description.textContent : ''}</p>
                            <a href="${link ? link.textContent : '#'}" class="view-project" data-type="image">View Full Size</a>
                        </div>
                    </div>
                `;
            });
        }
        
        // Load external links
        const externalLinks = xmlData.querySelectorAll('contact external-links link');
        externalLinks.forEach(link => {
            const title = link.querySelector('title');
            const url = link.querySelector('url');
            const category = link.querySelector('category');
            
            if (category && category.textContent === 'videos') {
                const videosMoreLink = document.querySelector('#videos .more-link a');
                if (videosMoreLink && title && url) {
                    videosMoreLink.textContent = title.textContent;
                    videosMoreLink.href = url.textContent;
                }
            } else if (category && category.textContent === 'photos') {
                const photosMoreLink = document.querySelector('#photos .more-link a');
                if (photosMoreLink && title && url) {
                    photosMoreLink.textContent = title.textContent;
                    photosMoreLink.href = url.textContent;
                }
            }
        });
    } catch (error) {
        console.error('Error loading portfolio content:', error);
    }
}

// Load Contact Content
function loadContactContent() {
    if (!xmlData) return;
    
    try {
        const contact = xmlData.querySelector('contact');
        if (contact) {
            const title = contact.querySelector('title');
            const description = contact.querySelector('description');
            const email = contact.querySelector('email');
            const location = contact.querySelector('location');
            
            if (title) document.querySelector('.contact-info h1').textContent = title.textContent;
            if (description) document.querySelector('.contact-description').textContent = description.textContent;
            if (email) document.querySelector('.detail-item span').textContent = email.textContent;
            if (location) document.querySelectorAll('.detail-item span')[1].textContent = location.textContent;
        }
        
        // Load social links
        const socialLinks = document.querySelector('.social-links');
        if (socialLinks) {
            socialLinks.innerHTML = '';
            xmlData.querySelectorAll('contact social-links social').forEach(social => {
                const platform = social.querySelector('platform');
                const icon = social.querySelector('icon');
                const url = social.querySelector('url');
                
                socialLinks.innerHTML += `
                    <a href="${url ? url.textContent : '#'}" target="_blank" class="social-link">
                        <i class="${icon ? icon.textContent : ''}"></i>
                        <span>${platform ? platform.textContent : ''}</span>
                    </a>
                `;
            });
        }
    } catch (error) {
        console.error('Error loading contact content:', error);
    }
}

// Load common elements (header, footer)
function loadCommonElements() {
    if (!xmlData) return;
    
    try {
        const site = xmlData.querySelector('site');
        if (site) {
            const logo = site.querySelector('logo');
            const copyright = site.querySelector('copyright');
            
            // Update logo
            if (logo) {
                document.querySelectorAll('.logo-link img').forEach(img => {
                    img.src = logo.textContent;
                });
            }
            
            // Update copyright
            if (copyright) {
                document.querySelectorAll('footer p').forEach(p => {
                    p.textContent = copyright.textContent;
                });
            }
        }
        
        // Update social links in header and footer
        const socialLinks = xmlData.querySelectorAll('contact social-links social');
        socialLinks.forEach(social => {
            const platform = social.querySelector('platform');
            const icon = social.querySelector('icon');
            const url = social.querySelector('url');
            
            // Update header socials
            document.querySelectorAll('.socials a').forEach(link => {
                const iconElement = link.querySelector('i');
                if (iconElement && iconElement.className === icon.textContent) {
                    link.href = url.textContent;
                }
            });
            
            // Update footer socials
            document.querySelectorAll('.footer-socials a').forEach(link => {
                const iconElement = link.querySelector('i');
                if (iconElement && iconElement.className === icon.textContent) {
                    link.href = url.textContent;
                }
            });
        });
    } catch (error) {
        console.error('Error loading common elements:', error);
    }
}

// Main initialization function
document.addEventListener('DOMContentLoaded', function() {
    loadXMLData().then(() => {
        // Determine which page we're on and load appropriate content
        const currentPage = window.location.pathname.split('/').pop();
        
        // Always load common elements
        loadCommonElements();
        
        // Load page-specific content
        switch(currentPage) {
            case 'index.html':
            case '':
                loadHomeContent();
                break;
            case 'about.html':
                loadAboutContent();
                break;
            case 'portfolio.html':
                loadPortfolioContent();
                break;
            case 'contact.html':
                loadContactContent();
                break;
        }
    });
});
