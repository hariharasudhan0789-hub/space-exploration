/* ==================== Space Explorer JavaScript ==================== */

// ==================== Initialization ==================== 
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    initializeEventListeners();
    addStarfield();
    checkLoginState();
});

// ==================== Canvas Animation ==================== 
let canvas, ctx, particles = [];

function initializeCanvas() {
    canvas = document.getElementById('canvasElement');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create particles for animation
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.5
        });
    }
    
    animateCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function animateCanvas() {
    if (!canvas) return;
    
    ctx.fillStyle = 'rgba(10, 14, 39, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with glow
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow effect
        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    requestAnimationFrame(animateCanvas);
}

// ==================== Starfield Background ==================== 
function addStarfield() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    const stars = [];
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2 + 0.5;
        const opacity = Math.random() * 0.7 + 0.3;
        
        stars.push({
            x: x,
            y: y,
            size: size,
            opacity: opacity
        });
    }
    
    // Create star divs for visual effect
    stars.forEach(star => {
        const starDiv = document.createElement('div');
        starDiv.style.position = 'absolute';
        starDiv.style.width = star.size + 'px';
        starDiv.style.height = star.size + 'px';
        starDiv.style.left = star.x + '%';
        starDiv.style.top = star.y + '%';
        starDiv.style.backgroundColor = 'white';
        starDiv.style.borderRadius = '50%';
        starDiv.style.opacity = star.opacity;
        starDiv.style.boxShadow = `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`;
    });
}

// ==================== Event Listeners ==================== 
function initializeEventListeners() {
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScroll(target.id);
            }
        });
    });
    
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.style.display = 'none';
            }
        });
    });
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
}

// ==================== Smooth Scrolling ==================== 
function smoothScroll(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== Planet Details Modal ==================== 
const planetData = {
    mercury: {
        name: 'Mercury',
        fullInfo: 'Mercury is the smallest planet in our solar system and closest to the Sun. Named after the Roman messenger god, Mercury has an extremely thin atmosphere and a cratered surface similar to the Moon. It has no natural satellites and completes an orbit around the Sun every 88 Earth days.',
        moons: 0,
        avgTemp: '167°C',
        composition: 'Rocky with Iron Core'
    },
    venus: {
        name: 'Venus',
        fullInfo: 'Venus is often called Earth\'s sister planet due to similar size and mass, but its conditions are vastly different. It has the hottest surface temperature of any planet, with a thick toxic atmosphere composed mainly of carbon dioxide. Venus rotates backwards and very slowly compared to other planets.',
        moons: 0,
        avgTemp: '464°C',
        composition: 'Rocky with Dense Atmosphere'
    },
    earth: {
        name: 'Earth',
        fullInfo: 'Earth is our home and the only known planet to support life. It has a perfect distance from the Sun for liquid water to exist. Earth\'s atmosphere protects us from harmful radiation and maintains the right temperature for life. It has one moon and is located in the habitable zone of our solar system.',
        moons: 1,
        avgTemp: '15°C',
        composition: 'Rocky with Water and Life'
    },
    mars: {
        name: 'Mars',
        fullInfo: 'Mars, the Red Planet, is a prime target for human exploration. Its reddish appearance comes from iron oxide (rust) on its surface. Evidence suggests Mars once had liquid water on its surface. It has two small moons, Phobos and Deimos, and is home to the largest volcano in the solar system, Olympus Mons.',
        moons: 2,
        avgTemp: '-63°C',
        composition: 'Rocky with Iron Oxide'
    },
    jupiter: {
        name: 'Jupiter',
        fullInfo: 'Jupiter is the largest planet in our solar system, a true gas giant. It contains more mass than all other planets combined. Its most famous feature is the Great Red Spot, a storm larger than Earth that has been raging for at least 300 years. Jupiter has at least 95 known moons.',
        moons: '95+',
        avgTemp: '-110°C',
        composition: 'Hydrogen and Helium'
    },
    saturn: {
        name: 'Saturn',
        fullInfo: 'Saturn is famous for its spectacular and extensive ring system, made up of billions of particles of ice and rock. It is the second-largest planet and is also a gas giant composed primarily of hydrogen and helium. Saturn has at least 146 known moons, including the large moon Titan.',
        moons: '146+',
        avgTemp: '-140°C',
        composition: 'Hydrogen and Helium with Rings'
    },
    uranus: {
        name: 'Uranus',
        fullInfo: 'Uranus is an ice giant that rotates on its side, likely due to a collision with an Earth-sized object early in the solar system\'s formation. It has a faint ring system and at least 28 known moons. Uranus appears as a featureless blue-green sphere in most telescopes.',
        moons: '28+',
        avgTemp: '-195°C',
        composition: 'Water, Ice, and Methane'
    },
    neptune: {
        name: 'Neptune',
        fullInfo: 'Neptune is the windiest planet in our solar system, with wind speeds exceeding 2,100 km/h. This ice giant has a beautiful deep blue color due to methane in its atmosphere. Neptune has at least 16 known moons, with Triton being the largest and geologically active.',
        moons: '16+',
        avgTemp: '-200°C',
        composition: 'Water, Ice, and Methane'
    }
};

function showPlanetDetail(planetName) {
    const data = planetData[planetName.toLowerCase()];
    if (!data) return;
    
    const modal = document.getElementById('planetModal');
    const planetDetails = document.getElementById('planetDetails');
    
    if (modal && planetDetails) {
        planetDetails.innerHTML = `
            <h2>${data.name}</h2>
            <p><strong>Description:</strong></p>
            <p>${data.fullInfo}</p>
            <div class="planet-detail-stats">
                <p><strong>Moons:</strong> ${data.moons}</p>
                <p><strong>Average Temperature:</strong> ${data.avgTemp}</p>
                <p><strong>Composition:</strong> ${data.composition}</p>
            </div>
        `;
        
        modal.style.display = 'block';
        
        // Add styles for modal details
        const style = document.createElement('style');
        style.textContent = `
            .planet-detail-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 2px solid rgba(0, 212, 255, 0.3);
            }
            .planet-detail-stats p {
                text-align: left;
            }
        `;
        if (!document.querySelector('style[data-modal-styles]')) {
            style.setAttribute('data-modal-styles', 'true');
            document.head.appendChild(style);
        }
    }
}

function closePlanetModal() {
    const modal = document.getElementById('planetModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('planetModal');
    if (modal && event.target == modal) {
        modal.style.display = 'none';
    }
});

// ==================== Contact Form Handling ==================== 
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        // Create success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 212, 255, 0.9);
            color: #0a0e27;
            padding: 20px;
            border-radius: 10px;
            z-index: 3000;
            font-weight: 600;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        successMsg.textContent = `Thank you ${name}! We'll get back to you soon.`;
        document.body.appendChild(successMsg);
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        if (!document.querySelector('style[data-slide-in]')) {
            style.setAttribute('data-slide-in', 'true');
            document.head.appendChild(style);
        }
        
        // Reset form
        document.querySelector('.contact-form').reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }
}

// ==================== Interactive Tools ==================== 
function showSizeComparison() {
    const modal = document.getElementById('planetModal');
    const planetDetails = document.getElementById('planetDetails');
    
    if (modal && planetDetails) {
        planetDetails.innerHTML = `
            <h2>Planet Size Comparison</h2>
            <p>Relative sizes of planets in our solar system (not to actual scale):</p>
            <div class="size-comparison">
                <div class="size-item">
                    <div class="size-bar" style="width: 20px; background: #8c7853;"></div>
                    <p>Mercury</p>
                </div>
                <div class="size-item">
                    <div class="size-bar" style="width: 48px; background: #ffc649;"></div>
                    <p>Venus</p>
                </div>
                <div class="size-item">
                    <div class="size-bar" style="width: 50px; background: #4a90e2;"></div>
                    <p>Earth</p>
                </div>
                <div class="size-item">
                    <div class="size-bar" style="width: 27px; background: #e27b58;"></div>
                    <p>Mars</p>
                </div>
                <div class="size-item">
                    <div class="size-bar" style="width: 550px; background: #c88b3a;"></div>
                    <p>Jupiter</p>
                </div>
                <div class="size-item">
                    <div class="size-bar" style="width: 460px; background: #daa520;"></div>
                    <p>Saturn</p>
                </div>
                <div class="size-item">
                    <div class="size-bar" style="width: 200px; background: #4fd0e7;"></div>
                    <p>Uranus</p>
                </div>
                <div class="size-item">
                    <div class="size-bar" style="width: 194px; background: #4166f5;"></div>
                    <p>Neptune</p>
                </div>
            </div>
        `;
        
        // Add styles for size comparison
        const style = document.createElement('style');
        style.textContent = `
            .size-comparison {
                margin-top: 20px;
            }
            .size-item {
                display: flex;
                align-items: center;
                gap: 15px;
                margin: 15px 0;
            }
            .size-bar {
                height: 30px;
                border-radius: 5px;
                box-shadow: 0 0 10px currentColor;
            }
            .size-item p {
                text-align: left;
                min-width: 80px;
                color: #00d4ff;
                font-weight: 600;
            }
        `;
        if (!document.querySelector('style[data-size-comparison]')) {
            style.setAttribute('data-size-comparison', 'true');
            document.head.appendChild(style);
        }
        
        modal.style.display = 'block';
    }
}

function showDistanceCalculator() {
    const modal = document.getElementById('planetModal');
    const planetDetails = document.getElementById('planetDetails');
    
    if (modal && planetDetails) {
        planetDetails.innerHTML = `
            <h2>Distance Calculator</h2>
            <p>Calculate distances between planets (in million km):</p>
            <div class="calculator">
                <div class="calc-group">
                    <label>From Planet:</label>
                    <select id="fromPlanet" class="calc-select">
                        <option value="mercury">Mercury (57.9)</option>
                        <option value="venus">Venus (108.2)</option>
                        <option value="earth">Earth (149.6)</option>
                        <option value="mars">Mars (227.9)</option>
                        <option value="jupiter">Jupiter (778.5)</option>
                        <option value="saturn">Saturn (1400)</option>
                        <option value="uranus">Uranus (2900)</option>
                        <option value="neptune">Neptune (4500)</option>
                    </select>
                </div>
                <div class="calc-group">
                    <label>To Planet:</label>
                    <select id="toPlanet" class="calc-select">
                        <option value="earth">Earth (149.6)</option>
                        <option value="mars">Mars (227.9)</option>
                        <option value="jupiter">Jupiter (778.5)</option>
                        <option value="saturn">Saturn (1400)</option>
                    </select>
                </div>
                <button class="btn btn-small" onclick="calculateDistance()">Calculate</button>
                <div id="calcResult" style="margin-top: 20px; padding: 15px; background: rgba(0, 212, 255, 0.1); border-left: 4px solid #00d4ff; border-radius: 5px; display: none;"></div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .calculator {
                margin-top: 20px;
            }
            .calc-group {
                margin: 15px 0;
            }
            .calc-group label {
                display: block;
                color: #00d4ff;
                font-weight: 600;
                margin-bottom: 8px;
            }
            .calc-select {
                width: 100%;
                padding: 10px;
                background: rgba(0, 212, 255, 0.1);
                border: 2px solid #00d4ff;
                color: #e0e0e0;
                border-radius: 5px;
                font-size: 1rem;
            }
            .calc-select:focus {
                outline: none;
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
            }
        `;
        if (!document.querySelector('style[data-calculator]')) {
            style.setAttribute('data-calculator', 'true');
            document.head.appendChild(style);
        }
        
        modal.style.display = 'block';
    }
}

function calculateDistance() {
    const distances = {
        mercury: 57.9,
        venus: 108.2,
        earth: 149.6,
        mars: 227.9,
        jupiter: 778.5,
        saturn: 1400,
        uranus: 2900,
        neptune: 4500
    };
    
    const from = document.getElementById('fromPlanet').value;
    const to = document.getElementById('toPlanet').value;
    
    const distance = Math.abs(distances[to] - distances[from]);
    const result = document.getElementById('calcResult');
    
    result.innerHTML = `<strong>Distance:</strong> ${distance.toFixed(2)} million km`;
    result.style.display = 'block';
}

function showTimeline() {
    const modal = document.getElementById('planetModal');
    const planetDetails = document.getElementById('planetDetails');
    
    if (modal && planetDetails) {
        planetDetails.innerHTML = `
            <h2>Space Exploration Timeline</h2>
            <div class="timeline">
                <div class="timeline-item">
                    <span class="timeline-year">1957</span>
                    <p><strong>Sputnik 1</strong> - First artificial satellite launched by USSR</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">1961</span>
                    <p><strong>Yuri Gagarin</strong> - First human in space</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">1969</span>
                    <p><strong>Apollo 11</strong> - First humans on the Moon</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">1971</span>
                    <p><strong>Salyut 1</strong> - First space station</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">1977</span>
                    <p><strong>Voyager 1</strong> - Begins journey to the outer solar system</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">1998</span>
                    <p><strong>ISS Assembly Begins</strong> - International Space Station construction starts</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">2012</span>
                    <p><strong>Curiosity Rover</strong> - Lands on Mars</p>
                </div>
                <div class="timeline-item">
                    <span class="timeline-year">2021</span>
                    <p><strong>James Webb Space Telescope</strong> - Launches on Christmas Day</p>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .timeline {
                margin-top: 20px;
                border-left: 3px solid #ff006e;
                padding-left: 20px;
            }
            .timeline-item {
                margin: 20px 0;
                position: relative;
                padding-left: 0;
            }
            .timeline-item::before {
                content: '';
                position: absolute;
                left: -26px;
                top: 5px;
                width: 15px;
                height: 15px;
                background: #ff006e;
                border-radius: 50%;
                border: 3px solid #0a0e27;
            }
            .timeline-year {
                display: inline-block;
                background: #ff006e;
                color: #0a0e27;
                padding: 5px 12px;
                border-radius: 20px;
                font-weight: 600;
                margin-right: 10px;
            }
            .timeline-item p {
                display: inline-block;
                text-align: left;
            }
        `;
        if (!document.querySelector('style[data-timeline]')) {
            style.setAttribute('data-timeline', 'true');
            document.head.appendChild(style);
        }
        
        modal.style.display = 'block';
    }
}

// ==================== Scroll Animations ==================== 
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.planet-card, .mission-card, .fact-card, .tool-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is ready
window.addEventListener('load', observeElements);

// ==================== Additional Utility Functions ==================== 
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Add header padding on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.2)';
    }
});

// ==================== Performance Optimization ==================== 
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Space Explorer website initialized successfully!');

// ==================== Login State Helpers ====================
function checkLoginState() {
    try {
        const loggedIn = localStorage.getItem('space_explorer_logged_in') === 'true';
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');
        // find Login link
        navLinks.forEach(link => {
            if (link.getAttribute('href') === 'login.html') {
                if (loggedIn) {
                    link.textContent = 'Logout';
                    link.setAttribute('href', '#');
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        logout();
                    });
                } else {
                    // ensure it points to login
                    link.textContent = 'Login';
                    link.setAttribute('href', 'login.html');
                }
            }
        });
    } catch (e) {
        // ignore storage errors
    }
}

function logout() {
    try {
        localStorage.removeItem('space_explorer_logged_in');
    } catch (e) {}
    // simple reload to update UI
    window.location.reload();
}
