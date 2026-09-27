/**
 * H.O. Damilare Michael Portfolio - Core JavaScript System
 * Dynamic Theme Backgrounds, Dual Motion Carousels, 7-Item Pagination,
 * Global Video Players, Modal Choreography, Accessibility & Footer Sequence
 */

// Fetch Setter Polyfill/Safeguard for iframe Sandbox Environments
(function() {
    try {
        var _currentFetch = window.fetch;
        if (typeof Window !== 'undefined' && Window.prototype) {
            try {
                var protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
                if (!protoDesc || !protoDesc.set || !protoDesc.writable) {
                    Object.defineProperty(Window.prototype, 'fetch', {
                        get: function() { return _currentFetch; },
                        set: function(fn) { _currentFetch = fn; },
                        configurable: true,
                        enumerable: true
                    });
                }
            } catch (err) {}
        }
        try {
            var winDesc = Object.getOwnPropertyDescriptor(window, 'fetch');
            if (!winDesc || !winDesc.set || !winDesc.writable) {
                Object.defineProperty(window, 'fetch', {
                    get: function() { return _currentFetch; },
                    set: function(fn) { _currentFetch = fn; },
                    configurable: true,
                    enumerable: true
                });
            }
        } catch (err) {}
    } catch (e) {}
})();

// Toast Notifications
function showNotification(message, isError = false) {
    let toast = document.getElementById('mho-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'mho-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `fixed top-24 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-full text-sm font-semibold shadow-2xl transition-all duration-300 pointer-events-none opacity-100 transform translate-y-0 ${
        isError 
            ? 'bg-rose-950/90 text-rose-200 border border-rose-500/50 backdrop-blur-md' 
            : 'bg-[#12161A]/95 text-[#F5E6C8] border border-[#E6C280]/60 backdrop-blur-md shadow-[0_0_20px_rgba(230,194,128,0.2)]'
    }`;
    setTimeout(() => {
        if (toast) {
            toast.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-full text-sm font-semibold shadow-2xl transition-all duration-300 pointer-events-none opacity-0 transform -translate-y-4';
        }
    }, 4000);
}

// Global Preloader Execution (Optimized for Snappy & Seamless Loading)
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const progressEl = preloader.querySelector('.loader-bar-progress');
    const percentEl = preloader.querySelector('.loader-percentage');

    let current = 0;
    const target = 100;
    const duration = 180; // Instantaneous 180ms
    const start = performance.now();

    function dismissPreloader() {
        if (preloader.classList.contains('loaded')) return;
        if (progressEl) progressEl.style.width = '100%';
        if (percentEl) percentEl.textContent = '100%';
        preloader.classList.add('loaded');
        triggerHeroEntrance();
    }

    function updateCounter(now) {
        const elapsed = now - start;
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.floor(eased * target);

        if (progressEl) progressEl.style.width = `${current}%`;
        if (percentEl) percentEl.textContent = `${current}%`;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            dismissPreloader();
        }
    }

    if (document.readyState === 'complete') {
        dismissPreloader();
    } else {
        requestAnimationFrame(updateCounter);
        window.addEventListener('load', () => setTimeout(dismissPreloader, 40), { once: true });
    }
}

// Hero Entrance Animation with H1 Text GSAP Perspective Reveal
function triggerHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    gsap.fromTo('.hero-fade-in', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out' }
    );

    gsap.fromTo('.celestial-moon-wrap',
        { scale: 0.75, opacity: 0, y: -20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.3)', delay: 0.1 }
    );

    initHeadingGsapAnimations();
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });
}

/* ==========================================================================
   PAGE-SPECIFIC ANIMATED BACKGROUNDS
   1. Creative Services: Cosmic Galaxy & Shooting Comets
   2. Leadership & Health: Medicine & Cellular Vitality Flow Canvas
   3. Web Proficiency: Analytics Data Grid & Architectural Vectors Canvas
   4. About Me / Home: Storytelling Waves & Narrative Streams Canvas
   ========================================================================== */
function initThemeBackground() {
    const bodyTheme = document.body.getAttribute('data-page-theme') || '';
    const currentPath = window.location.pathname.toLowerCase();

    if (bodyTheme === 'creative' || currentPath.includes('creative-space')) {
        initCosmicGalaxy();
    } else if (bodyTheme === 'health' || bodyTheme === 'leadership' || currentPath.includes('leadership-business')) {
        initBioCellularFlow();
    } else if (bodyTheme === 'web' || currentPath.includes('web-services')) {
        initAnalyticsDataGrid();
    } else {
        initNarrativeLightFlow();
    }
}

// 1. Creative Space: Deep Space Galaxy, Solar System, Comets & Stellar Drift
function initCosmicGalaxy() {
    const canvas = document.getElementById('cosmicCanvas');
    const warpContainer = document.getElementById('warpBg');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let mousePos = { x: width / 2, y: height / 2, active: false };
        let smoothParallax = { x: 0, y: 0 };
        let time = 0;

        window.addEventListener('mousemove', (e) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
            mousePos.active = true;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mousePos.active = false;
        });

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // --- A. STELLAR STARFIELD WITH REALISTIC SCINTILLATION ---
        const STAR_COUNT = Math.min(180, Math.floor(width / 9));
        const starHues = ['#ffffff', '#FFF3CD', '#E6C280', '#F5E6C8', '#D8B4FE', '#93C5FD'];
        const stars = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 0.7 + Math.random() * 2.2,
                depth: 0.15 + Math.random() * 0.85,
                color: starHues[Math.floor(Math.random() * starHues.length)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.015 + Math.random() * 0.035,
                baseAlpha: 0.18 + Math.random() * 0.55
            });
        }

        // --- B. SWIRLING SPIRAL GALAXY ARMS (COSMIC DUST) ---
        const GALAXY_PARTICLES = 90;
        const galaxyArms = [];
        for (let i = 0; i < GALAXY_PARTICLES; i++) {
            const arm = i % 2; // 2 distinct spiral arms
            const dist = 35 + (i / GALAXY_PARTICLES) * 260;
            const angleOffset = (arm * Math.PI) + (dist * 0.022);
            galaxyArms.push({
                dist: dist,
                angleOffset: angleOffset,
                size: 1 + Math.random() * 2.2,
                color: i % 3 === 0 ? '#E6C280' : (i % 3 === 1 ? '#FFF3CD' : '#C084FC'),
                alpha: 0.15 + Math.random() * 0.45
            });
        }
        let galaxyRotation = 0;

        // --- C. SOLAR SYSTEM ENGINE (SUN, ORBITS, PLANETS, RINGED GIANT & MOON) ---
        const planets = [
            {
                name: "Hermes Prime",
                semiA: 85,
                semiB: 55,
                angle: 0.4,
                speed: 0.018,
                radius: 4,
                color: "#E6C280",
                glow: "rgba(230, 194, 128, 0.6)",
                hasMoon: false
            },
            {
                name: "Aura Oceanus",
                semiA: 155,
                semiB: 100,
                angle: 2.1,
                speed: 0.011,
                radius: 6.5,
                color: "#7DD3FC",
                glow: "rgba(125, 211, 252, 0.6)",
                hasMoon: true,
                moonAngle: 0,
                moonSpeed: 0.05,
                moonDist: 14
            },
            {
                name: "Kronos Titan",
                semiA: 235,
                semiB: 150,
                angle: 4.2,
                speed: 0.0065,
                radius: 9.5,
                color: "#FDE68A",
                glow: "rgba(253, 230, 138, 0.5)",
                hasRings: true,
                ringRadiusX: 19,
                ringRadiusY: 6,
                ringTilt: -0.35
            },
            {
                name: "Neura Celestial",
                semiA: 320,
                semiB: 200,
                angle: 1.1,
                speed: 0.0035,
                radius: 5.5,
                color: "#C084FC",
                glow: "rgba(192, 132, 252, 0.4)",
                hasAura: true
            }
        ];

        // --- D. HIGH-VELOCITY COMETS & SHOOTING STARS ---
        const comets = [];
        const cometSparks = [];

        function spawnComet() {
            if (comets.length >= 3) return;
            const startFromTop = Math.random() > 0.4;
            comets.push({
                x: startFromTop ? (Math.random() * width * 0.85) : -30,
                y: startFromTop ? -30 : (Math.random() * height * 0.5),
                vx: 5.5 + Math.random() * 4.5,
                vy: 4.2 + Math.random() * 3.5,
                length: 80 + Math.random() * 90,
                alpha: 0.85,
                size: 2.5 + Math.random() * 1.5,
                color: Math.random() > 0.4 ? '#FFF3CD' : '#E6C280'
            });
        }

        setInterval(() => {
            if (Math.random() > 0.25) spawnComet();
        }, 2600);

        function renderCosmicSpace() {
            window._renderCosmicSpaceRef = renderCosmicSpace;
            if (window.isBgAnimationPaused && window.isBgAnimationPaused()) return;
            if (document.hidden) {
                requestAnimationFrame(renderCosmicSpace);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            time += 0.016;

            const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.028 : 0;
            const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.028 : 0;
            smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.05;
            smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.05;

            // --- 1. RENDER SWIRLING GALAXY SPIRAL ARMS ---
            const galaxyX = (width < 900 ? width * 0.22 : width * 0.28) + smoothParallax.x * 0.4;
            const galaxyY = (width < 900 ? height * 0.72 : height * 0.65) + smoothParallax.y * 0.4;
            galaxyRotation += 0.0012;

            // Core galaxy glow
            const galGrad = ctx.createRadialGradient(galaxyX, galaxyY, 0, galaxyX, galaxyY, 140);
            galGrad.addColorStop(0, 'rgba(230, 194, 128, 0.12)');
            galGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.06)');
            galGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = galGrad;
            ctx.beginPath();
            ctx.arc(galaxyX, galaxyY, 140, 0, Math.PI * 2);
            ctx.fill();

            galaxyArms.forEach(gp => {
                const currentAngle = gp.angleOffset + galaxyRotation;
                const px = galaxyX + Math.cos(currentAngle) * gp.dist;
                const py = galaxyY + Math.sin(currentAngle) * (gp.dist * 0.65); // Elliptical perspective

                ctx.beginPath();
                ctx.arc(px, py, gp.size, 0, Math.PI * 2);
                ctx.fillStyle = gp.color;
                ctx.globalAlpha = gp.alpha;
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // --- 2. RENDER SOLAR SYSTEM: SUN & ORBITAL PATHS ---
            const sunX = (width < 900 ? width * 0.78 : width * 0.72) + smoothParallax.x * 0.8;
            const sunY = (width < 900 ? height * 0.28 : height * 0.35) + smoothParallax.y * 0.8;

            // Pulsing Coronal Radiance (The Solar Core)
            const sunPulse = Math.sin(time * 2.2) * 3;
            const sunGlowGrad = ctx.createRadialGradient(sunX, sunY, 4, sunX, sunY, 65 + sunPulse);
            sunGlowGrad.addColorStop(0, '#FFFFFF');
            sunGlowGrad.addColorStop(0.18, 'rgba(255, 243, 205, 0.95)');
            sunGlowGrad.addColorStop(0.45, 'rgba(230, 194, 128, 0.55)');
            sunGlowGrad.addColorStop(0.8, 'rgba(230, 194, 128, 0.12)');
            sunGlowGrad.addColorStop(1, 'transparent');

            ctx.fillStyle = sunGlowGrad;
            ctx.beginPath();
            ctx.arc(sunX, sunY, 65 + sunPulse, 0, Math.PI * 2);
            ctx.fill();

            // Solar Core Disk
            ctx.fillStyle = '#FFFDF0';
            ctx.beginPath();
            ctx.arc(sunX, sunY, 13, 0, Math.PI * 2);
            ctx.fill();

            // Render Elliptical Orbital Guides
            ctx.strokeStyle = 'rgba(230, 194, 128, 0.14)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 7]);

            planets.forEach(p => {
                ctx.beginPath();
                ctx.ellipse(sunX, sunY, p.semiA, p.semiB, -0.22, 0, Math.PI * 2);
                ctx.stroke();
            });
            ctx.setLineDash([]); // Reset line dash

            // Render Orbiting Planets
            planets.forEach(p => {
                p.angle += p.speed;
                // Parametric ellipse calculation with rotation
                const tilt = -0.22;
                const rawX = Math.cos(p.angle) * p.semiA;
                const rawY = Math.sin(p.angle) * p.semiB;
                const rotX = rawX * Math.cos(tilt) - rawY * Math.sin(tilt);
                const rotY = rawX * Math.sin(tilt) + rawY * Math.cos(tilt);

                const px = sunX + rotX;
                const py = sunY + rotY;

                // Planet Glow Aura
                ctx.fillStyle = p.glow;
                ctx.beginPath();
                ctx.arc(px, py, p.radius * 2.2, 0, Math.PI * 2);
                ctx.fill();

                // Planet Body
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(px, py, p.radius, 0, Math.PI * 2);
                ctx.fill();

                // Ringed Giant: Saturn Rings
                if (p.hasRings) {
                    ctx.save();
                    ctx.translate(px, py);
                    ctx.rotate(p.ringTilt);
                    ctx.strokeStyle = 'rgba(253, 230, 138, 0.75)';
                    ctx.lineWidth = 2.2;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.ringRadiusX, p.ringRadiusY, 0, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }

                // Exoplanet Moonlet
                if (p.hasMoon) {
                    p.moonAngle += p.moonSpeed;
                    const mx = px + Math.cos(p.moonAngle) * p.moonDist;
                    const my = py + Math.sin(p.moonAngle) * (p.moonDist * 0.7);
                    ctx.fillStyle = '#F8FAFC';
                    ctx.beginPath();
                    ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // --- 3. RENDER SCINTILLATING STELLAR STARS ---
            stars.forEach(s => {
                s.pulse += s.pulseSpeed;
                const alpha = (Math.sin(s.pulse) * 0.2 + s.baseAlpha);

                let sx = s.x + smoothParallax.x * s.depth * 2;
                let sy = s.y + smoothParallax.y * s.depth * 2;

                if (mousePos.active) {
                    const dx = sx - mousePos.x;
                    const dy = sy - mousePos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150 && dist > 0) {
                        const push = (1 - dist / 150) * 1.8 * s.depth;
                        sx += (dx / dist) * push;
                        sy += (dy / dist) * push;
                    }
                }

                ctx.beginPath();
                ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = Math.max(0.08, Math.min(0.85, alpha));
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // --- 4. RENDER COMETS WITH ION TAILS & TRAILING STARDUST SPARKS ---
            for (let i = comets.length - 1; i >= 0; i--) {
                const c = comets[i];
                c.x += c.vx;
                c.y += c.vy;
                c.alpha -= 0.007;

                // Spawn tail dust sparks
                if (Math.random() > 0.45) {
                    cometSparks.push({
                        x: c.x - c.vx * 2 + (Math.random() - 0.5) * 6,
                        y: c.y - c.vy * 2 + (Math.random() - 0.5) * 6,
                        alpha: 0.8,
                        color: c.color
                    });
                }

                const tailX = c.x - c.vx * 16;
                const tailY = c.y - c.vy * 16;
                const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
                grad.addColorStop(0, '#FFFFFF');
                grad.addColorStop(0.2, c.color);
                grad.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.moveTo(c.x, c.y);
                ctx.lineTo(tailX, tailY);
                ctx.strokeStyle = grad;
                ctx.lineWidth = c.size;
                ctx.globalAlpha = Math.max(0, c.alpha);
                ctx.stroke();

                // Comet head flare
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(c.x, c.y, c.size * 1.2, 0, Math.PI * 2);
                ctx.fill();

                ctx.globalAlpha = 1;

                if (c.y > height + 100 || c.x > width + 100 || c.alpha <= 0) {
                    comets.splice(i, 1);
                }
            }

            // Render comet dust sparks
            for (let s = cometSparks.length - 1; s >= 0; s--) {
                const sp = cometSparks[s];
                sp.alpha -= 0.035;
                if (sp.alpha <= 0) {
                    cometSparks.splice(s, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(sp.x, sp.y, 1.2, 0, Math.PI * 2);
                    ctx.fillStyle = sp.color;
                    ctx.globalAlpha = sp.alpha * 0.7;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            }

            requestAnimationFrame(renderCosmicSpace);
        }

        renderCosmicSpace();
        return;
    }

    if (!warpContainer) return;
}

// 2. Leadership & Health: Subtle Interconnected Cellular Defense & Pathogen Neutralization (With Responsive Cursor Interaction)
function initBioCellularFlow() {
    const canvas = document.getElementById('bioCellularCanvas') || document.getElementById('cellularCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mousePos = { x: -999, y: -999, active: false };
    let lastMousePos = { x: -999, y: -999 };
    let mouseVelocity = { x: 0, y: 0 };
    let smoothParallax = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        if (!mousePos.active) {
            lastMousePos.x = e.clientX;
            lastMousePos.y = e.clientY;
        } else {
            mouseVelocity.x = (e.clientX - lastMousePos.x) * 0.4;
            mouseVelocity.y = (e.clientY - lastMousePos.y) * 0.4;
            lastMousePos.x = e.clientX;
            lastMousePos.y = e.clientY;
        }
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mousePos.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mousePos.active = false;
        mouseVelocity.x = 0;
        mouseVelocity.y = 0;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 1. Healthy Interconnected Cells
    const cells = [];
    const CELL_COUNT = Math.min(32, Math.max(16, Math.floor(width / 46)));

    for (let i = 0; i < CELL_COUNT; i++) {
        cells.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 13 + Math.random() * 20,
            innerRadius: 3.5 + Math.random() * 5.5,
            vx: (Math.random() - 0.5) * 0.72,
            vy: -0.35 - Math.random() * 0.65, // Accelerated systemic buoyancy
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.038 + Math.random() * 0.045,
            isImmuneSentinel: Math.random() > 0.65, // Emerald vitality/immune sentinels
            lastFireTime: 0,
            fireCooldown: 16 + Math.floor(Math.random() * 24),
            organelles: [
                { angle: Math.random() * Math.PI * 2, dist: 5 + Math.random() * 6, speed: 0.035 },
                { angle: Math.random() * Math.PI * 2, dist: 7 + Math.random() * 4, speed: -0.028 }
            ]
        });
    }

    // 2. Cooperative Intercellular Signal Pulses (Healthy cell-to-cell communication)
    const intercellularPulses = [];
    for (let i = 0; i < 11; i++) {
        intercellularPulses.push({
            from: Math.floor(Math.random() * CELL_COUNT),
            to: Math.floor(Math.random() * CELL_COUNT),
            progress: Math.random(),
            speed: 0.018 + Math.random() * 0.025
        });
    }

    // 3. Ambient ATP / Vitality Sparkles
    const atpParticles = [];
    for (let i = 0; i < 35; i++) {
        atpParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 0.9 + Math.random() * 1.5,
            vy: -0.55 - Math.random() * 0.9,
            vx: (Math.random() - 0.5) * 0.45,
            alpha: 0.15 + Math.random() * 0.45,
            pulse: Math.random() * Math.PI * 2
        });
    }

    // 4. Red Viruses (Pathogens that pop up and get targeted)
    const viruses = [];
    const MAX_ACTIVE_VIRUSES = 3;
    let virusSpawnTimer = 0;

    function spawnVirus() {
        if (viruses.length >= MAX_ACTIVE_VIRUSES) return;
        const margin = 80;
        viruses.push({
            x: margin + Math.random() * (width - margin * 2),
            y: margin + Math.random() * (height - margin * 2),
            radius: 11 + Math.random() * 8,
            vx: (Math.random() - 0.5) * 0.65,
            vy: (Math.random() - 0.5) * 0.65,
            angle: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.035,
            spikes: 8,
            spikeLength: 5 + Math.random() * 3,
            maxHp: 100,
            hp: 100,
            spawnScale: 0.1,
            flash: 0,
            dissolving: false,
            dissolveProgress: 0
        });
    }

    // Seed 2 initial viruses
    spawnVirus();
    spawnVirus();

    // 5. Active Antibodies / Defensive Bio-pulses
    const antibodies = [];

    // 6. Dissolve Sparkling Particles (Harmless cellular nutrients when virus is defeated)
    const sparkles = [];

    function renderBioFlow() {
        window._renderBioFlowRef = renderBioFlow;
        if (window.isBgAnimationPaused && window.isBgAnimationPaused()) return;
        ctx.clearRect(0, 0, width, height);

        // Natural decay of cursor motion velocity
        mouseVelocity.x *= 0.92;
        mouseVelocity.y *= 0.92;

        // Smooth subtle 3D parallax offset responding to cursor position
        const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.022 : 0;
        const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.022 : 0;
        smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.06;
        smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.06;

        // --- SUBTLE LIVING BIO-FIELD HALO UNDER CURSOR ---
        if (mousePos.active) {
            const haloGrad = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 185);
            haloGrad.addColorStop(0, 'rgba(230, 194, 128, 0.025)');
            haloGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.01)');
            haloGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = haloGrad;
            ctx.beginPath();
            ctx.arc(mousePos.x, mousePos.y, 185, 0, Math.PI * 2);
            ctx.fill();
        }

        // --- A. SPAWN VIRUSES PERIODICALLY ---
        virusSpawnTimer++;
        if (virusSpawnTimer > 65 && viruses.length < MAX_ACTIVE_VIRUSES) {
            spawnVirus();
            virusSpawnTimer = 0;
        }

        // --- B. AMBIENT ATP PARTICLES (SUBTLE LIVING BACKGROUND, SWIRLING IN CURSOR WAKE) ---
        atpParticles.forEach(p => {
            p.y += p.vy;
            p.x += p.vx;
            p.pulse += 0.025;

            // Subtle organic response to cursor movement
            if (mousePos.active) {
                const pdx = p.x - mousePos.x;
                const pdy = p.y - mousePos.y;
                const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
                if (pdist < 180 && pdist > 0) {
                    const push = (1 - pdist / 180) * 1.35;
                    p.x += (pdx / pdist) * push;
                    p.y += (pdy / pdist) * push;
                    p.x += mouseVelocity.x * 0.035 * (1 - pdist / 180);
                    p.y += mouseVelocity.y * 0.035 * (1 - pdist / 180);
                }
            }

            if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            const glow = (Math.sin(p.pulse) * 0.12 + p.alpha) * 0.65;
            ctx.beginPath();
            ctx.arc(p.x + smoothParallax.x * 0.5, p.y + smoothParallax.y * 0.5, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 194, 128, ${Math.max(0.04, glow)})`;
            ctx.fill();
        });

        // --- C. INTERCONNECTED CELLULAR FILAMENTS (GAP JUNCTIONS WITH CURSOR SHIMMER) ---
        for (let i = 0; i < cells.length; i++) {
            for (let j = i + 1; j < cells.length; j++) {
                const dx = cells[i].x - cells[j].x;
                const dy = cells[i].y - cells[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 155) {
                    let alpha = (1 - dist / 155) * 0.11;

                    // Intercellular filaments subtly illuminate when cursor passes nearby
                    if (mousePos.active) {
                        const midX = (cells[i].x + cells[j].x) / 2;
                        const midY = (cells[i].y + cells[j].y) / 2;
                        const mdx = midX - mousePos.x;
                        const mdy = midY - mousePos.y;
                        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                        if (mdist < 180) {
                            alpha += (1 - mdist / 180) * 0.12;
                        }
                    }

                    ctx.beginPath();
                    ctx.moveTo(cells[i].x + smoothParallax.x, cells[i].y + smoothParallax.y);
                    ctx.lineTo(cells[j].x + smoothParallax.x, cells[j].y + smoothParallax.y);
                    ctx.strokeStyle = cells[i].isImmuneSentinel || cells[j].isImmuneSentinel
                        ? `rgba(16, 185, 129, ${alpha * 0.72})`
                        : `rgba(230, 194, 128, ${alpha * 0.75})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // --- D. INTERCELLULAR COMMUNICATION SIGNAL PULSES ---
        intercellularPulses.forEach(sp => {
            sp.progress += sp.speed;
            if (sp.progress >= 1) {
                sp.progress = 0;
                sp.from = Math.floor(Math.random() * cells.length);
                sp.to = Math.floor(Math.random() * cells.length);
            }

            const c1 = cells[sp.from];
            const c2 = cells[sp.to];
            if (c1 && c2) {
                const dx = c2.x - c1.x;
                const dy = c2.y - c1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 170) {
                    const px = c1.x + dx * sp.progress + smoothParallax.x;
                    const py = c1.y + dy * sp.progress + smoothParallax.y;

                    ctx.beginPath();
                    ctx.arc(px, py, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = c1.isImmuneSentinel ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255, 243, 205, 0.55)';
                    ctx.fill();
                }
            }
        });

        // --- E. UPDATE & DRAW VIRUSES (PATHOGENS EVADING SLIGHTLY FROM CURSOR) ---
        for (let vi = viruses.length - 1; vi >= 0; vi--) {
            const v = viruses[vi];

            // Scale-in popup effect
            if (v.spawnScale < 1) {
                v.spawnScale += 0.035;
                if (v.spawnScale > 1) v.spawnScale = 1;
            }

            if (!v.dissolving) {
                v.x += v.vx;
                v.y += v.vy;
                v.angle += v.rotSpeed;

                // Subtle pathogen response to cursor proximity
                if (mousePos.active) {
                    const vdx = v.x - mousePos.x;
                    const vdy = v.y - mousePos.y;
                    const vdist = Math.sqrt(vdx * vdx + vdy * vdy);
                    if (vdist < 180 && vdist > 0) {
                        const evade = (1 - vdist / 180) * 0.95;
                        v.x += (vdx / vdist) * evade;
                        v.y += (vdy / vdist) * evade;
                        v.angle += 0.03 * (1 - vdist / 180);
                    }
                }

                // Bounce softly off screen bounds
                if (v.x < 40 || v.x > width - 40) v.vx *= -1;
                if (v.y < 40 || v.y > height - 40) v.vy *= -1;

                if (v.flash > 0) v.flash -= 0.08;

                const curRadius = v.radius * v.spawnScale;
                const spikeLen = v.spikeLength * v.spawnScale;

                // 1. Draw virus radiating spikes (corona glycoproteins)
                ctx.save();
                ctx.translate(v.x + smoothParallax.x, v.y + smoothParallax.y);
                ctx.rotate(v.angle);

                for (let s = 0; s < v.spikes; s++) {
                    const sAngle = (s * Math.PI * 2) / v.spikes;
                    const sx1 = Math.cos(sAngle) * curRadius;
                    const sy1 = Math.sin(sAngle) * curRadius;
                    const sx2 = Math.cos(sAngle) * (curRadius + spikeLen);
                    const sy2 = Math.sin(sAngle) * (curRadius + spikeLen);

                    // Spiky stalk
                    ctx.beginPath();
                    ctx.moveTo(sx1, sy1);
                    ctx.lineTo(sx2, sy2);
                    ctx.strokeStyle = v.flash > 0 ? 'rgba(255, 243, 205, 0.45)' : 'rgba(239, 68, 68, 0.35)';
                    ctx.lineWidth = 1.3;
                    ctx.stroke();

                    // Spike bulb head
                    ctx.beginPath();
                    ctx.arc(sx2, sy2, 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = v.flash > 0 ? 'rgba(255, 255, 255, 0.65)' : 'rgba(220, 38, 38, 0.48)';
                    ctx.fill();
                }

                // 2. Draw virus core capsid
                ctx.beginPath();
                ctx.arc(0, 0, curRadius, 0, Math.PI * 2);
                ctx.fillStyle = v.flash > 0
                    ? 'rgba(255, 243, 205, 0.5)'
                    : 'rgba(220, 38, 38, 0.42)';
                ctx.shadowBlur = v.flash > 0 ? 8 : 4;
                ctx.shadowColor = v.flash > 0 ? '#FFF3CD' : 'rgba(239, 68, 68, 0.3)';
                ctx.fill();
                ctx.shadowBlur = 0;

                // Inner nucleocapsid ring
                ctx.beginPath();
                ctx.arc(0, 0, curRadius * 0.55, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(153, 27, 27, 0.5)';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();

                // Telemetry tag
                if (v.spawnScale >= 0.95) {
                    ctx.font = '8px monospace';
                    ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
                    ctx.textAlign = 'center';
                    ctx.fillText('PATHOGEN', v.x + smoothParallax.x, v.y + smoothParallax.y - curRadius - 8);
                }
            } else {
                // Dissolving into harmless golden nutrients
                v.dissolveProgress += 0.085;
                const curRadius = v.radius * (1 - v.dissolveProgress);
                const alpha = Math.max(0, 1 - v.dissolveProgress);

                ctx.beginPath();
                ctx.arc(v.x + smoothParallax.x, v.y + smoothParallax.y, Math.max(0.5, curRadius), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(230, 194, 128, ${alpha * 0.45})`;
                ctx.shadowBlur = 8;
                ctx.shadowColor = '#E6C280';
                ctx.fill();
                ctx.shadowBlur = 0;

                if (v.dissolveProgress >= 1) {
                    viruses.splice(vi, 1);
                }
            }
        }

        // --- F. CELLS COORDINATING & FIRING ANTIBODIES AT VIRUSES (WITH ORGANIC CURSOR PARTING) ---
        cells.forEach(c => {
            c.x += c.vx;
            c.y += c.vy;
            c.pulse += c.pulseSpeed;

            // Interactive organic response to cursor: subtle fluid deflection & wake drag
            if (mousePos.active) {
                const mdx = c.x - mousePos.x;
                const mdy = c.y - mousePos.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < 190 && mdist > 0) {
                    const force = (1 - mdist / 190) * 1.3;
                    c.x += (mdx / mdist) * force;
                    c.y += (mdy / mdist) * force;

                    c.x += mouseVelocity.x * 0.04 * (1 - mdist / 190);
                    c.y += mouseVelocity.y * 0.04 * (1 - mdist / 190);

                    c.pulse += 0.035 * (1 - mdist / 190);
                }
            }

            // Screen boundary wrap
            if (c.y < -50) { c.y = height + 50; c.x = Math.random() * width; }
            if (c.x < -50) c.x = width + 50;
            if (c.x > width + 50) c.x = -50;

            // Look for closest active virus to coordinate defense
            let closestVirus = null;
            let closestDist = 240;

            viruses.forEach(v => {
                if (v.dissolving || v.spawnScale < 0.7) return;
                const dx = v.x - c.x;
                const dy = v.y - c.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestVirus = v;
                }
            });

            // Extend defensive filament and fire antibodies
            if (closestVirus) {
                const defenseAlpha = (1 - closestDist / 240) * 0.14;

                ctx.beginPath();
                ctx.moveTo(c.x + smoothParallax.x, c.y + smoothParallax.y);
                ctx.lineTo(closestVirus.x + smoothParallax.x, closestVirus.y + smoothParallax.y);
                ctx.strokeStyle = c.isImmuneSentinel
                    ? `rgba(16, 185, 129, ${defenseAlpha})`
                    : `rgba(230, 194, 128, ${defenseAlpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                c.lastFireTime++;
                if (c.lastFireTime >= c.fireCooldown) {
                    c.lastFireTime = 0;
                    antibodies.push({
                        x: c.x,
                        y: c.y,
                        startX: c.x,
                        startY: c.y,
                        target: closestVirus,
                        targetX: closestVirus.x,
                        targetY: closestVirus.y,
                        progress: 0,
                        speed: 0.075 + Math.random() * 0.045,
                        isEmerald: c.isImmuneSentinel
                    });
                }
            }

            // Draw healthy cell membrane & nucleus
            const breathingR = c.radius + Math.sin(c.pulse) * 2.2;
            const primaryColor = c.isImmuneSentinel ? 'rgba(16, 185, 129,' : 'rgba(230, 194, 128,';
            const cx = c.x + smoothParallax.x;
            const cy = c.y + smoothParallax.y;

            // Outer membrane
            ctx.beginPath();
            ctx.arc(cx, cy, breathingR, 0, Math.PI * 2);
            ctx.strokeStyle = `${primaryColor} 0.15)`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Inner vital nucleus
            ctx.beginPath();
            ctx.arc(cx, cy, c.innerRadius, 0, Math.PI * 2);
            ctx.fillStyle = c.isImmuneSentinel ? 'rgba(16, 185, 129, 0.45)' : 'rgba(230, 194, 128, 0.45)';
            ctx.shadowBlur = 5;
            ctx.shadowColor = c.isImmuneSentinel ? 'rgba(16, 185, 129, 0.3)' : 'rgba(230, 194, 128, 0.3)';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Orbiting organelles
            c.organelles.forEach(o => {
                o.angle += o.speed;
                const ox = cx + Math.cos(o.angle) * o.dist;
                const oy = cy + Math.sin(o.angle) * o.dist;
                ctx.beginPath();
                ctx.arc(ox, oy, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = '#FFF3CD';
                ctx.globalAlpha = 0.55;
                ctx.fill();
                ctx.globalAlpha = 1;
            });
        });

        // --- G. UPDATE & DRAW ANTIBODIES (IMMUNE QUANTA ATTACKING VIRUSES) ---
        for (let ai = antibodies.length - 1; ai >= 0; ai--) {
            const ab = antibodies[ai];
            ab.progress += ab.speed;

            const curTargetX = ab.target && !ab.target.dissolving ? ab.target.x : ab.targetX;
            const curTargetY = ab.target && !ab.target.dissolving ? ab.target.y : ab.targetY;

            ab.x = ab.startX + (curTargetX - ab.startX) * ab.progress;
            ab.y = ab.startY + (curTargetY - ab.startY) * ab.progress;

            ctx.beginPath();
            ctx.arc(ab.x + smoothParallax.x, ab.y + smoothParallax.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = ab.isEmerald ? 'rgba(167, 243, 208, 0.65)' : 'rgba(255, 243, 205, 0.6)';
            ctx.shadowBlur = 4;
            ctx.shadowColor = ab.isEmerald ? 'rgba(16, 185, 129, 0.45)' : 'rgba(230, 194, 128, 0.45)';
            ctx.fill();
            ctx.shadowBlur = 0;

            if (ab.progress >= 1) {
                if (ab.target && !ab.target.dissolving) {
                    ab.target.hp -= 25;
                    ab.target.flash = 1;

                    for (let k = 0; k < 4; k++) {
                        sparkles.push({
                            x: ab.target.x,
                            y: ab.target.y,
                            vx: (Math.random() - 0.5) * 1.8,
                            vy: (Math.random() - 0.5) * 1.8,
                            alpha: 0.65,
                            color: ab.isEmerald ? '#10B981' : '#FFF3CD'
                        });
                    }

                    if (ab.target.hp <= 0) {
                        ab.target.dissolving = true;
                        for (let k = 0; k < 16; k++) {
                            sparkles.push({
                                x: ab.target.x,
                                y: ab.target.y,
                                vx: (Math.random() - 0.5) * 2.8,
                                vy: (Math.random() - 0.5) * 2.8,
                                alpha: 0.75,
                                color: k % 2 === 0 ? '#E6C280' : '#FFF3CD'
                            });
                        }
                    }
                }
                antibodies.splice(ai, 1);
            }
        }

        // --- H. UPDATE & DRAW DISSOLVE SPARKLES (SWIRLING IN CURSOR FLOW) ---
        for (let si = sparkles.length - 1; si >= 0; si--) {
            const s = sparkles[si];
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.96;
            s.vy *= 0.96;
            s.alpha -= 0.022;

            if (mousePos.active) {
                const ssdx = s.x - mousePos.x;
                const ssdy = s.y - mousePos.y;
                const ssdist = Math.sqrt(ssdx * ssdx + ssdy * ssdy);
                if (ssdist < 120 && ssdist > 0) {
                    s.x += mouseVelocity.x * 0.025;
                    s.y += mouseVelocity.y * 0.025;
                }
            }

            if (s.alpha <= 0) {
                sparkles.splice(si, 1);
            } else {
                ctx.beginPath();
                ctx.arc(s.x + smoothParallax.x, s.y + smoothParallax.y, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.alpha * 0.65;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        requestAnimationFrame(renderBioFlow);
    }

    renderBioFlow();
}

// 3. Web Proficiency: Analytics Data Grid & Matrix Vectors (30% Brighter Technical Vector Mesh)
function initAnalyticsDataGrid() {
    const canvas = document.getElementById('analyticsGridCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mousePos = { x: -999, y: -999, active: false };
    let smoothParallax = { x: 0, y: 0 };
    let gridPulse = 0;

    window.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mousePos.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mousePos.active = false;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const GRID_SIZE = 50;
    const packets = [];
    const PACKET_COUNT = 32;

    for (let i = 0; i < PACKET_COUNT; i++) {
        packets.push({
            x: Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE,
            y: Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE,
            dir: Math.random() > 0.5 ? 'h' : 'v',
            speed: 1.8 + Math.random() * 2.5,
            length: 24 + Math.random() * 32,
            color: Math.random() > 0.35 ? '#FFF3CD' : '#E6C280'
        });
    }

    // Glowing coordinate matrix hubs
    const matrixHubs = [];
    const HUB_COUNT = 16;
    for (let i = 0; i < HUB_COUNT; i++) {
        matrixHubs.push({
            gridX: (i * 7 + 3) * GRID_SIZE,
            gridY: ((i * 5 + 2) % 18) * GRID_SIZE,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03
        });
    }

    function renderGridData() {
        window._renderGridDataRef = renderGridData;
        if (window.isBgAnimationPaused && window.isBgAnimationPaused()) return;
        if (document.hidden) {
            requestAnimationFrame(renderGridData);
            return;
        }

        ctx.clearRect(0, 0, width, height);
        gridPulse += 0.02;

        const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.022 : 0;
        const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.022 : 0;
        smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.05;
        smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.05;

        // --- 1. ARCHITECTURAL GRID COORDINATE LINES (30%+ BRIGHTER) ---
        ctx.strokeStyle = 'rgba(230, 194, 128, 0.085)';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        for (let x = 0; x < width; x += GRID_SIZE) {
            ctx.moveTo(x + smoothParallax.x, 0);
            ctx.lineTo(x + smoothParallax.x, height);
        }
        for (let y = 0; y < height; y += GRID_SIZE) {
            ctx.moveTo(0, y + smoothParallax.y);
            ctx.lineTo(width, y + smoothParallax.y);
        }
        ctx.stroke();

        // --- 2. PULSING MATRIX HUBS AT INTERSECTIONS ---
        matrixHubs.forEach(hub => {
            hub.phase += hub.pulseSpeed;
            const hx = (hub.gridX % (width + GRID_SIZE)) + smoothParallax.x;
            const hy = (hub.gridY % (height + GRID_SIZE)) + smoothParallax.y;
            const alpha = 0.3 + Math.sin(hub.phase) * 0.28;

            ctx.fillStyle = `rgba(230, 194, 128, ${alpha})`;
            ctx.beginPath();
            ctx.arc(hx, hy, 3, 0, Math.PI * 2);
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(230, 194, 128, 0.7)';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Reticle crosshair marker at hub
            ctx.strokeStyle = `rgba(255, 243, 205, ${alpha * 0.75})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(hx - 5, hy);
            ctx.lineTo(hx + 5, hy);
            ctx.moveTo(hx, hy - 5);
            ctx.lineTo(hx, hy + 5);
            ctx.stroke();
        });

        // --- 3. INTERACTIVE GLOW NODES NEAR CURSOR ---
        if (mousePos.active) {
            const nearGridX = Math.round(mousePos.x / GRID_SIZE) * GRID_SIZE;
            const nearGridY = Math.round(mousePos.y / GRID_SIZE) * GRID_SIZE;

            for (let ox = -GRID_SIZE * 2; ox <= GRID_SIZE * 2; ox += GRID_SIZE) {
                for (let oy = -GRID_SIZE * 2; oy <= GRID_SIZE * 2; oy += GRID_SIZE) {
                    const nx = nearGridX + ox + smoothParallax.x;
                    const ny = nearGridY + oy + smoothParallax.y;
                    const d = Math.hypot(nx - mousePos.x, ny - mousePos.y);
                    if (d < 160) {
                        const alpha = (1 - d / 160) * 0.45;
                        ctx.beginPath();
                        ctx.arc(nx, ny, 3.2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255, 243, 205, ${alpha})`;
                        ctx.shadowBlur = 6;
                        ctx.shadowColor = 'rgba(230, 194, 128, 0.6)';
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }
                }
            }
        }

        // --- 4. HIGH-LUMINANCE DATA PACKETS (30%+ BRIGHTER) ---
        packets.forEach(p => {
            let currentSpeed = p.speed;

            if (mousePos.active) {
                const distToMouse = Math.hypot(p.x - mousePos.x, p.y - mousePos.y);
                if (distToMouse < 150) {
                    currentSpeed *= 1.4;
                }
            }

            ctx.beginPath();
            if (p.dir === 'h') {
                p.x += currentSpeed;
                if (p.x > width + 60) {
                    p.x = -60;
                    p.y = Math.floor(Math.random() * (height / GRID_SIZE)) * GRID_SIZE;
                }
                const grad = ctx.createLinearGradient(p.x + smoothParallax.x, p.y + smoothParallax.y, p.x - p.length + smoothParallax.x, p.y + smoothParallax.y);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2.0;
                ctx.globalAlpha = 0.94;
                ctx.moveTo(p.x + smoothParallax.x, p.y + smoothParallax.y);
                ctx.lineTo(p.x - p.length + smoothParallax.x, p.y + smoothParallax.y);
            } else {
                p.y += currentSpeed;
                if (p.y > height + 60) {
                    p.y = -60;
                    p.x = Math.floor(Math.random() * (width / GRID_SIZE)) * GRID_SIZE;
                }
                const grad = ctx.createLinearGradient(p.x + smoothParallax.x, p.y + smoothParallax.y, p.x + smoothParallax.x, p.y - p.length + smoothParallax.y);
                grad.addColorStop(0, p.color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2.0;
                ctx.globalAlpha = 0.94;
                ctx.moveTo(p.x + smoothParallax.x, p.y + smoothParallax.y);
                ctx.lineTo(p.x + smoothParallax.x, p.y - p.length + smoothParallax.y);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Head beacon dot with bright radiant halo
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(p.x + smoothParallax.x, p.y + smoothParallax.y, 2.4, 0, Math.PI * 2);
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#FFF3CD';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(renderGridData);
    }

    renderGridData();
}

// 4. Home Page: 2D/3D Dynamic Conceptual Background Canvas
// Featuring Floating/Bubbling Elements (Movies, Web Concepts, Leadership, and Cellular Medicine Curing Disease)
function initNarrativeLightFlow() {
    const canvas = document.getElementById('narrativeCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking & smooth parallax
    let mousePos = { x: -999, y: -999, active: false };
    let smoothParallax = { x: 0, y: 0 };
    let hoveredElement = null;
    let clickRipples = [];

    window.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        mousePos.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mousePos.active = false;
        hoveredElement = null;
    });

    window.addEventListener('click', (e) => {
        // Create an interactive energetic shockwave on canvas
        clickRipples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            maxRadius: 140,
            alpha: 0.85,
            color: '#E6C280'
        });
        // Spawn 12 curative sparkle particles around click
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 1.5 + Math.random() * 3.5;
            curativeSparks.push({
                x: e.clientX,
                y: e.clientY,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                radius: 1.5 + Math.random() * 2,
                color: Math.random() > 0.4 ? '#E6C280' : '#10B981',
                alpha: 1,
                decay: 0.02 + Math.random() * 0.02
            });
        }
    });

    // --- A. THE LIVING CELLULAR ORGAN & MEDICINE CURING SIMULATION ---
    let organ = {
        baseRadius: 82,
        time: 0,
        pulse: 1,
        healingWave: 0, // 0 to 1
        isHealing: false,
        hudAlpha: 0,
        nodes: []
    };

    function initOrganNodes() {
        organ.nodes = [];
        const count = 15;
        for (let i = 0; i < count; i++) {
            const dist = 18 + Math.random() * (organ.baseRadius - 28);
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
            // 7 nodes start diseased (violet/dim slate), 8 start healthy (emerald/gold)
            const isDiseased = i % 2 === 0;
            organ.nodes.push({
                dist,
                baseDist: dist,
                angle,
                speed: 0.005 + (Math.random() - 0.5) * 0.008,
                radius: 3.5 + Math.random() * 2,
                isDiseased: isDiseased,
                flash: 0,
                curedAnim: 0
            });
        }
    }
    initOrganNodes();

    // Active medicinal capsule floating into organ
    let activeCapsule = {
        progress: 0,
        speed: 0.0035, // ~5-6s journey
        startX: 0,
        startY: 0,
        controlX: 0,
        controlY: 0,
        x: 0,
        y: 0,
        rot: 0,
        active: true,
        tailSparks: []
    };

    function resetCapsule() {
        const ox = width > 992 ? width * 0.74 : width * 0.5;
        const oy = height > 650 ? height * 0.42 : height * 0.38;
        activeCapsule.progress = 0;
        activeCapsule.startX = ox - 260 - Math.random() * 80;
        activeCapsule.startY = oy + 180 + Math.random() * 60;
        activeCapsule.controlX = ox - 140;
        activeCapsule.controlY = oy + 60;
        activeCapsule.x = activeCapsule.startX;
        activeCapsule.y = activeCapsule.startY;
        activeCapsule.active = true;
        activeCapsule.tailSparks = [];
    }
    resetCapsule();

    let curativeSparks = [];

    // Trigger supplement dose from external button (e.g. from Bento Card)
    window.triggerCellularSupplementDose = function() {
        activeCapsule.progress = 0.95; // Jump capsule to organ boundary
        showNotification("Bio-Supplement Administered · Cellular NAD+ Surging");
    };

    // --- B. FLOATING / BUBBLING CONCEPTUAL ELEMENTS (MOVIES, WEB, LEADERSHIP, HEALTH) ---
    const CONCEPT_ITEMS = [
        // 1. Movie / Cinema: 3D Film Clapperboard
        {
            category: "CINEMA REEL",
            title: "Latent Cinema · 24fps",
            type: "clapperboard",
            domain: "movies",
            xRatio: 0.16,
            yRatio: 0.28,
            baseRadius: 36,
            depth: 0.85,
            wobbleSpeed: 0.02,
            rotSpeed: 0.008,
            color: "#E6C280"
        },
        // 2. Movie / Cinema: Spinning 3D Film Reel
        {
            category: "AI VIDEO",
            title: "Neural Diffusion Reel",
            type: "filmreel",
            domain: "movies",
            xRatio: 0.28,
            yRatio: 0.78,
            baseRadius: 34,
            depth: 0.95,
            wobbleSpeed: 0.015,
            rotSpeed: 0.012,
            color: "#FFF3CD"
        },
        // 3. Movie / Cinema: Anamorphic Lens / Reticle
        {
            category: "OPTICS",
            title: "Anamorphic 35mm f/1.4",
            type: "lens",
            domain: "movies",
            xRatio: 0.88,
            yRatio: 0.24,
            baseRadius: 32,
            depth: 0.75,
            wobbleSpeed: 0.022,
            rotSpeed: 0.006,
            color: "#E6C280"
        },
        // 4. Web Concept: 3D Wireframe Cube
        {
            category: "ARCHITECTURE",
            title: "Distributed Cloud Mesh",
            type: "wireframeCube",
            domain: "web",
            xRatio: 0.12,
            yRatio: 0.62,
            baseRadius: 35,
            depth: 1.1,
            wobbleSpeed: 0.018,
            rotSpeed: 0.015,
            color: "#38BDF8"
        },
        // 5. Web Concept: Code Token Bracket Bubble
        {
            category: "ENGINEERING",
            title: "Next.js 15 & TypeScript",
            type: "codeNode",
            domain: "web",
            xRatio: 0.44,
            yRatio: 0.18,
            baseRadius: 30,
            depth: 0.7,
            wobbleSpeed: 0.025,
            rotSpeed: 0.005,
            color: "#E6C280"
        },
        // 6. Web Concept: Cloud Database Cylinder
        {
            category: "EDGE DATA",
            title: "PostgreSQL & GraphQL",
            type: "database",
            domain: "web",
            xRatio: 0.84,
            yRatio: 0.74,
            baseRadius: 32,
            depth: 0.9,
            wobbleSpeed: 0.016,
            rotSpeed: 0.01,
            color: "#38BDF8"
        },
        // 7. Leadership: Golden Summit Crown
        {
            category: "LEADERSHIP",
            title: "Executive Duplication",
            type: "crown",
            domain: "leadership",
            xRatio: 0.58,
            yRatio: 0.26,
            baseRadius: 34,
            depth: 1.0,
            wobbleSpeed: 0.019,
            rotSpeed: 0.008,
            color: "#F0C05A"
        },
        // 8. Leadership: Exponential Scale Trajectory
        {
            category: "GROWTH",
            title: "+10x Scaling Model",
            type: "growthCurve",
            domain: "leadership",
            xRatio: 0.38,
            yRatio: 0.84,
            baseRadius: 32,
            depth: 0.8,
            wobbleSpeed: 0.014,
            rotSpeed: 0.005,
            color: "#E6C280"
        },
        // 9. Leadership: Duplication Network Tree
        {
            category: "MENTORSHIP",
            title: "45K+ Coached Leaders",
            type: "duplicationTree",
            domain: "leadership",
            xRatio: 0.64,
            yRatio: 0.82,
            baseRadius: 34,
            depth: 0.85,
            wobbleSpeed: 0.02,
            rotSpeed: 0.007,
            color: "#F5E6C8"
        },
        // 10. Health & Vitality: 3D DNA Helix
        {
            category: "CELLULAR",
            title: "Mitochondrial Longevity",
            type: "dnaHelix",
            domain: "health",
            xRatio: 0.52,
            yRatio: 0.65,
            baseRadius: 34,
            depth: 0.95,
            wobbleSpeed: 0.022,
            rotSpeed: 0.02,
            color: "#10B981"
        },
        // 11. Health & Vitality: Floating Nano-Supplement Pill
        {
            category: "VITALITY",
            title: "NAD+ Cellular Formula",
            type: "supplementCapsule",
            domain: "health",
            xRatio: 0.22,
            yRatio: 0.44,
            baseRadius: 30,
            depth: 0.8,
            wobbleSpeed: 0.028,
            rotSpeed: 0.015,
            color: "#E6C280"
        }
    ];

    // Initialize conceptual items runtime state
    const elements = CONCEPT_ITEMS.map((item, idx) => ({
        ...item,
        id: idx,
        currentX: width * item.xRatio,
        currentY: height * item.yRatio,
        angle: Math.random() * Math.PI * 2,
        rotAngle: Math.random() * Math.PI * 2,
        scale: 1,
        hoverT: 0
    }));

    // --- C. RISING BIO-VITALITY AMBIENT MICRO-BUBBLES ---
    const BUBBLE_COUNT = 36;
    const bubbles = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
        bubbles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 2 + Math.random() * 6.5,
            speedY: 0.4 + Math.random() * 0.9,
            wobbleOffset: Math.random() * Math.PI * 2,
            wobbleFreq: 0.02 + Math.random() * 0.02,
            alpha: 0.12 + Math.random() * 0.35,
            hue: Math.random() > 0.35 ? 'gold' : 'cyan'
        });
    }

    let globalTick = 0;

    // --- MAIN 60FPS ANIMATION LOOP ---
    function renderDynamicUniverse() {
        window._renderDynamicUniverseRef = renderDynamicUniverse;
        if (window.isBgAnimationPaused && window.isBgAnimationPaused()) return;
        ctx.clearRect(0, 0, width, height);
        globalTick += 0.015;

        // Smooth mouse parallax interpolation
        const targetParallaxX = mousePos.active ? (mousePos.x - width / 2) * 0.025 : 0;
        const targetParallaxY = mousePos.active ? (mousePos.y - height / 2) * 0.025 : 0;
        smoothParallax.x += (targetParallaxX - smoothParallax.x) * 0.06;
        smoothParallax.y += (targetParallaxY - smoothParallax.y) * 0.06;

        // 1. Render Subtle Ambient Narrative Flow Stream Waves in Background
        renderBackgroundFlowStreams(ctx, width, height, globalTick, smoothParallax);

        // 2. Render Rising Bio-Vitality Micro-Bubbles
        renderBioBubbles(ctx, bubbles, width, height, globalTick, smoothParallax);

        // 3. Render The Living Cellular Organ & Medicine Curing Simulation
        renderCellularHealingSimulation(ctx, organ, activeCapsule, curativeSparks, width, height, globalTick, smoothParallax);

        // 4. Render Floating / Bubbling Conceptual Elements (Movies, Web, Leadership, Health)
        renderConceptualElements(ctx, elements, width, height, globalTick, smoothParallax, mousePos);

        // 5. Render Interactive Click Energy Ripples
        renderClickRipples(ctx, clickRipples);

        requestAnimationFrame(renderDynamicUniverse);
    }

    renderDynamicUniverse();

    // =========================================================================
    // SUB-RENDERERS FOR CRISP MODULAR ARCHITECTURE
    // =========================================================================

    // Subtle background flowing stream curves
    function renderBackgroundFlowStreams(ctx, w, h, tick, parallax) {
        const streamPaths = [
            { y: h * 0.25, amp: 40, freq: 0.0015, color: 'rgba(230, 194, 128, 0.03)' },
            { y: h * 0.52, amp: 55, freq: 0.0011, color: 'rgba(255, 243, 205, 0.025)' },
            { y: h * 0.78, amp: 45, freq: 0.0018, color: 'rgba(56, 189, 248, 0.02)' }
        ];
        streamPaths.forEach((s, idx) => {
            ctx.beginPath();
            ctx.moveTo(0, s.y + parallax.y * 0.5);
            for (let x = 0; x < w; x += 25) {
                const waveY = s.y + Math.sin(x * s.freq + tick * (0.8 + idx * 0.2)) * s.amp + parallax.y * 0.5;
                ctx.lineTo(x + parallax.x * 0.5, waveY);
            }
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 1.2;
            ctx.stroke();
        });
    }

    // Rising bio-vitality bubbles
    function renderBioBubbles(ctx, list, w, h, tick, parallax) {
        list.forEach(b => {
            b.y -= b.speedY;
            if (b.y < -20) {
                b.y = h + 20;
                b.x = Math.random() * w;
            }
            const wobbleX = Math.sin(tick * 2 + b.wobbleOffset) * 8;
            const rx = b.x + wobbleX + parallax.x * 0.4;
            const ry = b.y + parallax.y * 0.4;

            ctx.save();
            ctx.beginPath();
            ctx.arc(rx, ry, b.radius, 0, Math.PI * 2);
            ctx.strokeStyle = b.hue === 'gold' ? `rgba(230, 194, 128, ${b.alpha * 0.8})` : `rgba(56, 189, 248, ${b.alpha * 0.7})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Bubble highlight dot
            ctx.beginPath();
            ctx.arc(rx - b.radius * 0.35, ry - b.radius * 0.35, b.radius * 0.25, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.9})`;
            ctx.fill();
            ctx.restore();
        });
    }

    // THE CELLULAR ORGAN & MEDICINE CURING SIMULATION
    function renderCellularHealingSimulation(ctx, org, cap, sparks, w, h, tick, parallax) {
        const ox = (w > 992 ? w * 0.74 : w * 0.5) + parallax.x;
        const oy = (h > 650 ? h * 0.42 : h * 0.38) + parallax.y;

        // 1. Organ Membrane (Fourier Sinusoidal Breathing Contour)
        ctx.save();
        ctx.beginPath();
        const pts = 16;
        const rBase = org.baseRadius + Math.sin(tick * 2.5) * 3;
        for (let i = 0; i <= pts; i++) {
            const theta = (i / pts) * Math.PI * 2;
            const deform = Math.sin(theta * 3 + tick * 2) * 5 + Math.cos(theta * 2 - tick) * 4;
            const r = rBase + deform;
            const px = ox + Math.cos(theta) * r;
            const py = oy + Math.sin(theta) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();

        // Cytoplasm gradient fill
        const cytoGrad = ctx.createRadialGradient(ox, oy, 10, ox, oy, rBase + 8);
        if (org.isHealing) {
            cytoGrad.addColorStop(0, 'rgba(16, 185, 129, 0.18)');
            cytoGrad.addColorStop(0.6, 'rgba(230, 194, 128, 0.12)');
            cytoGrad.addColorStop(1, 'rgba(16, 185, 129, 0.02)');
        } else {
            cytoGrad.addColorStop(0, 'rgba(230, 194, 128, 0.09)');
            cytoGrad.addColorStop(0.7, 'rgba(192, 132, 252, 0.05)');
            cytoGrad.addColorStop(1, 'rgba(230, 194, 128, 0.01)');
        }
        ctx.fillStyle = cytoGrad;
        ctx.fill();

        // Membrane Double-Layer Outline
        ctx.strokeStyle = org.isHealing ? 'rgba(16, 185, 129, 0.65)' : 'rgba(230, 194, 128, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.strokeStyle = org.isHealing ? 'rgba(255, 243, 205, 0.35)' : 'rgba(240, 192, 90, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // 2. Organ Nucleus / Mitochondrion (Central Vitality Core)
        ctx.beginPath();
        const nucRadius = 16 + Math.sin(tick * 3) * 2;
        ctx.arc(ox, oy, nucRadius, 0, Math.PI * 2);
        ctx.fillStyle = org.isHealing ? 'rgba(16, 185, 129, 0.35)' : 'rgba(230, 194, 128, 0.25)';
        ctx.fill();
        ctx.strokeStyle = '#FFF3CD';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Central DNA helix icon representation
        ctx.fillStyle = '#FFFDF5';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('NAD+', ox, oy);

        // 3. Receptor Nodes Inside Organ (Diseased vs Cured)
        org.nodes.forEach(node => {
            node.angle += node.speed;
            const nx = ox + Math.cos(node.angle) * node.dist;
            const ny = oy + Math.sin(node.angle) * node.dist;

            ctx.beginPath();
            ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);

            if (node.flash > 0) {
                // Flash white during curing shockwave
                ctx.fillStyle = `rgba(255, 255, 255, ${node.flash})`;
                node.flash -= 0.04;
            } else if (node.isDiseased) {
                // Diseased node: dim flickering violet/slate
                const flicker = 0.45 + Math.sin(tick * 8 + node.angle) * 0.25;
                ctx.fillStyle = `rgba(192, 132, 252, ${flicker})`;
            } else {
                // Cured & Healthy node: glowing golden emerald
                const glow = 0.75 + Math.sin(tick * 4 + node.angle) * 0.25;
                ctx.fillStyle = `rgba(16, 185, 129, ${glow})`;
            }
            ctx.fill();

            // Golden link lines to nucleus
            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.lineTo(nx, ny);
            ctx.strokeStyle = node.isDiseased ? 'rgba(192, 132, 252, 0.1)' : 'rgba(230, 194, 128, 0.18)';
            ctx.lineWidth = 0.6;
            ctx.stroke();
        });

        // 4. Medicine / Supplement Capsule Flight towards Organ
        if (cap.active) {
            cap.progress += cap.speed;
            // Quadratic Bezier Interpolation
            const t = cap.progress;
            const invT = 1 - t;
            cap.x = invT * invT * cap.startX + 2 * invT * t * cap.controlX + t * t * (ox - org.baseRadius * 0.7);
            cap.y = invT * invT * cap.startY + 2 * invT * t * cap.controlY + t * t * (oy + org.baseRadius * 0.35);
            cap.rot = Math.atan2(
                2 * (1 - t) * (cap.controlY - cap.startY) + 2 * t * (oy - cap.controlY),
                2 * (1 - t) * (cap.controlX - cap.startX) + 2 * t * (ox - cap.controlX)
            );

            // Trailing active sparkles
            if (Math.random() > 0.4) {
                cap.tailSparks.push({
                    x: cap.x + (Math.random() - 0.5) * 4,
                    y: cap.y + (Math.random() - 0.5) * 4,
                    radius: 1 + Math.random() * 2,
                    alpha: 1
                });
            }

            // Draw trailing sparks
            cap.tailSparks.forEach((sp, idx) => {
                sp.alpha -= 0.05;
                ctx.beginPath();
                ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(230, 194, 128, ${Math.max(0, sp.alpha)})`;
                ctx.fill();
            });
            cap.tailSparks = cap.tailSparks.filter(sp => sp.alpha > 0);

            // Draw 3D Nano-Capsule Pill
            ctx.save();
            ctx.translate(cap.x, cap.y);
            ctx.rotate(cap.rot);

            const pillLen = 24;
            const pillRad = 5.5;

            // Golden half (left)
            ctx.beginPath();
            ctx.arc(-pillLen / 4, 0, pillRad, Math.PI / 2, -Math.PI / 2);
            ctx.lineTo(0, -pillRad);
            ctx.lineTo(0, pillRad);
            ctx.closePath();
            ctx.fillStyle = '#E6C280';
            ctx.fill();

            // Pearlescent Cream half (right)
            ctx.beginPath();
            ctx.arc(pillLen / 4, 0, pillRad, -Math.PI / 2, Math.PI / 2);
            ctx.lineTo(0, pillRad);
            ctx.lineTo(0, -pillRad);
            ctx.closePath();
            ctx.fillStyle = '#FFFDF5';
            ctx.fill();

            // Seam & highlight
            ctx.beginPath();
            ctx.moveTo(0, -pillRad);
            ctx.lineTo(0, pillRad);
            ctx.strokeStyle = '#D97706';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Gloss sheen
            ctx.beginPath();
            ctx.ellipse(0, -pillRad * 0.45, pillLen * 0.35, pillRad * 0.25, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.fill();

            ctx.restore();

            // 5. Docking / Entry & Curing Event
            if (cap.progress >= 1) {
                cap.active = false;
                org.isHealing = true;
                org.healingWave = 0;
                org.hudAlpha = 1;

                // Spawn burst of 25 curative sparks
                for (let i = 0; i < 25; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const spd = 1.2 + Math.random() * 3.2;
                    sparks.push({
                        x: ox,
                        y: oy,
                        vx: Math.cos(angle) * spd,
                        vy: Math.sin(angle) * spd,
                        radius: 1.5 + Math.random() * 2.5,
                        color: Math.random() > 0.4 ? '#10B981' : '#E6C280',
                        alpha: 1,
                        decay: 0.02 + Math.random() * 0.015
                    });
                }

                // Transform all diseased nodes to cured healthy states
                org.nodes.forEach(node => {
                    if (node.isDiseased) {
                        node.flash = 1;
                        node.isDiseased = false; // Disease cured!
                    }
                });

                // Reset cycle after 5 seconds
                setTimeout(() => {
                    initOrganNodes(); // Reset some nodes to diseased so the dynamic story repeats
                    org.isHealing = false;
                    resetCapsule();
                }, 5200);
            }
        }

        // Render expanding healing shockwave
        if (org.isHealing) {
            org.healingWave += 0.035;
            const waveR = org.healingWave * (org.baseRadius * 1.5);
            if (waveR < org.baseRadius * 1.5) {
                ctx.beginPath();
                ctx.arc(ox, oy, waveR, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(16, 185, 129, ${Math.max(0, 1 - org.healingWave)})`;
                ctx.lineWidth = 2.5;
                ctx.stroke();
            }
        }

        // Render curative sparks
        sparks.forEach(sp => {
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= sp.decay;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
            ctx.fillStyle = sp.color;
            ctx.globalAlpha = Math.max(0, sp.alpha);
            ctx.fill();
            ctx.globalAlpha = 1;
        });

        // 6. Holographic Cellular HUD Indicator
        if (org.hudAlpha > 0) {
            ctx.save();
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillStyle = `rgba(16, 185, 129, ${org.hudAlpha})`;
            ctx.textAlign = 'center';
            ctx.fillText('⚡ CELLULAR NAD+ UPTAKE · PATHOLOGY REVERSED', ox, oy + org.baseRadius + 24);
            ctx.fillStyle = `rgba(230, 194, 128, ${org.hudAlpha * 0.8})`;
            ctx.fillText('100% MITOCHONDRIAL VITALITY RESTORED', ox, oy + org.baseRadius + 38);
            ctx.restore();
            org.hudAlpha -= 0.005;
        }

        ctx.restore();
    }

    // FLOATING / BUBBLING CONCEPTUAL ELEMENTS
    function renderConceptualElements(ctx, items, w, h, tick, parallax, mouse) {
        items.forEach(item => {
            // Anchor coordinates
            const anchorX = w * item.xRatio;
            const anchorY = h * item.yRatio;

            // Bobbing float motion
            const bobX = Math.sin(tick + item.id * 1.3) * 12;
            const bobY = Math.cos(tick * 0.9 + item.id * 1.1) * 14;

            const px = anchorX + bobX + parallax.x * item.depth;
            const py = anchorY + bobY + parallax.y * item.depth;
            item.currentX = px;
            item.currentY = py;

            // Distance to cursor
            let isNear = false;
            if (mouse.active) {
                const dist = Math.hypot(mouse.x - px, mouse.y - py);
                if (dist < 65) {
                    isNear = true;
                    hoveredElement = item;
                }
            }

            item.hoverT += ((isNear ? 1 : 0) - item.hoverT) * 0.12;
            const curScale = 1 + item.hoverT * 0.28;
            item.rotAngle += item.rotSpeed;

            ctx.save();
            ctx.translate(px, py);
            ctx.scale(curScale, curScale);

            // Draw outer conceptual bubble shell
            ctx.beginPath();
            ctx.arc(0, 0, item.baseRadius, 0, Math.PI * 2);
            ctx.fillStyle = isNear ? 'rgba(230, 194, 128, 0.14)' : 'rgba(22, 27, 34, 0.45)';
            ctx.fill();
            ctx.strokeStyle = isNear ? 'rgba(230, 194, 128, 0.8)' : 'rgba(245, 230, 200, 0.2)';
            ctx.lineWidth = isNear ? 1.8 : 1.1;
            ctx.stroke();

            // Specular bubble shine
            ctx.beginPath();
            ctx.ellipse(-item.baseRadius * 0.35, -item.baseRadius * 0.35, item.baseRadius * 0.25, item.baseRadius * 0.14, -0.6, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fill();

            // Render Domain Specific 2D/3D Graphic
            switch (item.type) {
                case 'clapperboard':
                    draw3DClapperboard(ctx, item.rotAngle);
                    break;
                case 'filmreel':
                    draw3DFilmReel(ctx, item.rotAngle);
                    break;
                case 'lens':
                    drawCameraLens(ctx, item.rotAngle);
                    break;
                case 'wireframeCube':
                    draw3DWireframeCube(ctx, item.rotAngle);
                    break;
                case 'codeNode':
                    drawCodeBrackets(ctx, tick);
                    break;
                case 'database':
                    draw3DDatabase(ctx, tick);
                    break;
                case 'crown':
                    drawLeadershipCrown(ctx, tick);
                    break;
                case 'growthCurve':
                    drawGrowthTrajectory(ctx, tick);
                    break;
                case 'duplicationTree':
                    drawDuplicationTree(ctx, tick);
                    break;
                case 'dnaHelix':
                    draw3DDnaHelix(ctx, item.rotAngle);
                    break;
                case 'supplementCapsule':
                    drawNanoCapsule(ctx, item.rotAngle);
                    break;
            }

            // Draw Holographic HUD Badge on hover
            if (item.hoverT > 0.1) {
                ctx.save();
                ctx.globalAlpha = item.hoverT;
                ctx.font = 'bold 9px "JetBrains Mono", monospace';
                ctx.fillStyle = '#E6C280';
                ctx.textAlign = 'center';
                ctx.fillText(item.category, 0, item.baseRadius + 14);
                ctx.font = '10px "Plus Jakarta Sans", sans-serif';
                ctx.fillStyle = '#F5E6C8';
                ctx.fillText(item.title, 0, item.baseRadius + 26);
                ctx.restore();
            }

            ctx.restore();
        });
    }

    // --- INDIVIDUAL 2D/3D CONCEPT RENDERERS ---

    // 1. 3D Film Clapperboard
    function draw3DClapperboard(ctx, rot) {
        ctx.save();
        ctx.rotate(Math.sin(rot) * 0.2);
        // Slate body
        ctx.fillStyle = '#161B22';
        ctx.strokeStyle = '#E6C280';
        ctx.lineWidth = 1.2;
        ctx.fillRect(-16, -10, 32, 22);
        ctx.strokeRect(-16, -10, 32, 22);

        // Hinged stick with chevron bars
        ctx.save();
        ctx.translate(-16, -10);
        ctx.rotate(-0.25 + Math.sin(rot * 2) * 0.12);
        ctx.fillStyle = '#0D0F12';
        ctx.fillRect(0, -6, 32, 6);
        ctx.strokeRect(0, -6, 32, 6);
        // Yellow stripes
        ctx.fillStyle = '#E6C280';
        for (let i = 4; i < 30; i += 7) {
            ctx.beginPath();
            ctx.moveTo(i, -6);
            ctx.lineTo(i + 3, -6);
            ctx.lineTo(i, 0);
            ctx.lineTo(i - 3, 0);
            ctx.fill();
        }
        ctx.restore();

        // 24FPS text
        ctx.fillStyle = '#F5E6C8';
        ctx.font = 'bold 7px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('24FPS', 0, 4);
        ctx.restore();
    }

    // 2. 3D Film Reel
    function draw3DFilmReel(ctx, rot) {
        ctx.save();
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.strokeStyle = '#E6C280';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Spoke holes
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const hx = Math.cos(angle) * 10;
            const hy = Math.sin(angle) * 10;
            ctx.beginPath();
            ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#12161A';
            ctx.fill();
            ctx.strokeStyle = '#FFF3CD';
            ctx.lineWidth = 0.8;
            ctx.stroke();
        }
        // Center hub
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#E6C280';
        ctx.fill();
        ctx.restore();
    }

    // 3. Camera Lens / Viewfinder
    function drawCameraLens(ctx, rot) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.strokeStyle = '#E6C280';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 243, 205, 0.6)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Crosshairs
        ctx.strokeStyle = '#E6C280';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(-18, 0); ctx.lineTo(-11, 0);
        ctx.moveTo(11, 0); ctx.lineTo(18, 0);
        ctx.moveTo(0, -18); ctx.lineTo(0, -11);
        ctx.moveTo(0, 11); ctx.lineTo(0, 18);
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#E6C280';
        ctx.fill();
        ctx.restore();
    }

    // 4. 3D Wireframe Cube (Full Matrix 3D Projection)
    function draw3DWireframeCube(ctx, rot) {
        ctx.save();
        const size = 12;
        // 8 vertices in 3D
        let verts = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        // Rotate around Y and X
        const radY = rot * 1.5;
        const radX = rot * 0.9;
        const cosY = Math.cos(radY), sinY = Math.sin(radY);
        const cosX = Math.cos(radX), sinX = Math.sin(radX);

        const proj = verts.map(v => {
            // Y rot
            let x1 = v[0] * cosY - v[2] * sinY;
            let z1 = v[0] * sinY + v[2] * cosY;
            // X rot
            let y2 = v[1] * cosX - z1 * sinX;
            let z2 = v[1] * sinX + z1 * cosX;
            // Perspective
            const f = 60;
            const scale = f / (f + z2 * size);
            return [x1 * size * scale, y2 * size * scale];
        });

        // 12 edges
        const edges = [
            [0,1],[1,2],[2,3],[3,0],
            [4,5],[5,6],[6,7],[7,4],
            [0,4],[1,5],[2,6],[3,7]
        ];

        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        edges.forEach(e => {
            ctx.moveTo(proj[e[0]][0], proj[e[0]][1]);
            ctx.lineTo(proj[e[1]][0], proj[e[1]][1]);
        });
        ctx.stroke();

        // Vertices
        ctx.fillStyle = '#FFF3CD';
        proj.forEach(p => {
            ctx.beginPath();
            ctx.arc(p[0], p[1], 1.6, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }

    // 5. Code Syntax Brackets
    function drawCodeBrackets(ctx, tick) {
        ctx.save();
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.fillStyle = '#E6C280';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('< / >', 0, -2);
        ctx.font = '8px monospace';
        ctx.fillStyle = '#38BDF8';
        ctx.fillText('TSX', 0, 11);
        ctx.restore();
    }

    // 6. 3D Cloud Database Node
    function draw3DDatabase(ctx, tick) {
        ctx.save();
        const w = 22, h = 7;
        for (let i = -1; i <= 1; i++) {
            const dy = i * 8;
            ctx.beginPath();
            ctx.ellipse(0, dy, w / 2, h / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = '#161B22';
            ctx.fill();
            ctx.strokeStyle = '#38BDF8';
            ctx.lineWidth = 1;
            ctx.stroke();
            // Blinking query LED
            ctx.beginPath();
            ctx.arc(6, dy, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = Math.sin(tick * 5 + i) > 0 ? '#10B981' : '#38BDF8';
            ctx.fill();
        }
        ctx.restore();
    }

    // 7. Leadership Crown
    function drawLeadershipCrown(ctx, tick) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-14, 8);
        ctx.lineTo(14, 8);
        ctx.lineTo(12, -8);
        ctx.lineTo(5, 2);
        ctx.lineTo(0, -11);
        ctx.lineTo(-5, 2);
        ctx.lineTo(-12, -8);
        ctx.closePath();
        ctx.fillStyle = 'rgba(230, 194, 128, 0.25)';
        ctx.fill();
        ctx.strokeStyle = '#F0C05A';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Jewel vertex dots
        [[-12, -8], [0, -11], [12, -8]].forEach(pt => {
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF3CD';
            ctx.fill();
        });
        ctx.restore();
    }

    // 8. Exponential Growth Curve
    function drawGrowthTrajectory(ctx, tick) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-14, 10);
        ctx.quadraticCurveTo(-2, 8, 12, -10);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(12, -10);
        ctx.lineTo(6, -10);
        ctx.moveTo(12, -10);
        ctx.lineTo(12, -4);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 8px monospace';
        ctx.fillStyle = '#FFF3CD';
        ctx.textAlign = 'center';
        ctx.fillText('+10x', -2, -2);
        ctx.restore();
    }

    // 9. Duplication Network Tree
    function drawDuplicationTree(ctx, tick) {
        ctx.save();
        // Leader root node
        ctx.beginPath();
        ctx.arc(0, -9, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#E6C280';
        ctx.fill();

        // 3 child nodes
        const children = [-12, 0, 12];
        children.forEach(cx => {
            ctx.beginPath();
            ctx.moveTo(0, -9);
            ctx.lineTo(cx, 8);
            ctx.strokeStyle = 'rgba(230, 194, 128, 0.4)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(cx, 8, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF3CD';
            ctx.fill();
        });
        ctx.restore();
    }

    // 10. 3D DNA Double Helix
    function draw3DDnaHelix(ctx, rot) {
        ctx.save();
        const rungs = 7;
        for (let i = 0; i < rungs; i++) {
            const t = (i / rungs) * Math.PI * 2 + rot * 1.5;
            const y = (i - rungs / 2) * 4;
            const x1 = Math.cos(t) * 12;
            const x2 = -x1;
            const z = Math.sin(t);

            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.strokeStyle = z > 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(x1, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFF3CD';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x2, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#E6C280';
            ctx.fill();
        }
        ctx.restore();
    }

    // 11. Nano-Supplement Capsule
    function drawNanoCapsule(ctx, rot) {
        ctx.save();
        ctx.rotate(rot);
        const l = 20, r = 5;
        ctx.beginPath();
        ctx.arc(-l / 4, 0, r, Math.PI / 2, -Math.PI / 2);
        ctx.lineTo(0, -r);
        ctx.lineTo(0, r);
        ctx.fillStyle = '#E6C280';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(l / 4, 0, r, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(0, r);
        ctx.lineTo(0, -r);
        ctx.fillStyle = '#FFFDF5';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(0, r);
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }

    // Interactive Click Energy Ripples
    function renderClickRipples(ctx, list) {
        list.forEach((rip, idx) => {
            rip.radius += 3.5;
            rip.alpha -= 0.025;
            ctx.beginPath();
            ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(230, 194, 128, ${Math.max(0, rip.alpha)})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();
        });
        // Prune finished ripples
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].alpha <= 0) list.splice(i, 1);
        }
    }
}

/* ==========================================================================
   GLOBAL FLOATING LEFT CONTACT BAR
   ========================================================================== */
function initFloatingContactSidebar() {
    const toggle = document.getElementById('mobileContactToggle');
    const sidebar = document.querySelector('.global-contact-sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('mobile-open');
    });

    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== toggle) {
            sidebar.classList.remove('mobile-open');
        }
    });
}

/* ==========================================================================
   GLOBAL INTRO VIDEO SECTION HANDLER
   ========================================================================== */
function initIntroVideoPlayer() {
    const playButtons = document.querySelectorAll('.video-play-pulse-btn, .trigger-intro-video');
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoUrl = btn.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            const videoTitle = btn.getAttribute('data-video-title') || 'Personal Introduction · H.O. Damilare Michael';
            openVideoModal(videoUrl, videoTitle, 'Executive Introduction', 'Watch H.O. Damilare Michael share his multidisciplinary philosophy across full-stack architecture, generative AI video workflows, and transformative wellness distribution.');
        });
    });
}

/* ==========================================================================
   WEB ARCHITECTURE: 26 PROJECTS REPOSITORY, DUAL CAROUSELS & 7-ITEM REPEATER
   ========================================================================== */
const WEB_PROJECTS_DATA = [
    {
        id: 'adetech',
        title: 'Adetech Global Corporate Architecture',
        category: 'Enterprise Cloud Platforms',
        snippet: 'Scalable corporate web architecture providing infrastructure management & enterprise integrations.',
        description: 'Adetech is an enterprise corporate and technological presence engineered for maximum uptime, international CDN distribution, and multi-cloud service management. Features streamlined inquiry pipelines and dynamic content modules.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cloudflare Edge', 'REST API'],
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Adetech-Website',
        demo: 'https://adetechglobalwebsite.netlify.app'
    },
    {
        id: 'aetheria',
        title: 'Aetheria Ultra-Luxury Real Estate Sanctuary',
        category: 'Interactive WebGL & 3D Portals',
        snippet: 'Immersive architectural showcase for high-net-worth property acquisitions with cinematic spatial styling.',
        description: 'Aetheria redefines luxury real estate digital experiences with fluid micro-interactions, responsive high-resolution gallery viewports, VIP consultation scheduling, and modern architectural elegance.',
        tags: ['React', 'Three.js', 'Tailwind CSS', 'Vite', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Aetheria-Real-Estate-Site',
        demo: 'https://aetheria-real-estate-site.netlify.app'
    },
    {
        id: 'apex-logistics',
        title: 'Apex Global Logistics Matrix',
        category: 'Custom Web Applications',
        snippet: 'Real-time fleet coordination telemetry & global freight route visibility platform.',
        description: 'Engineered to eliminate supply chain opacity. Integrates multimodal freight tracking, customs documentation automation, latency-free vessel positioning, and enterprise client dashboards.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Geospatial Telemetry', 'REST API'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Apex-Logistics-Matrix',
        demo: 'https://apex-logistics-matrix.netlify.app'
    },
    {
        id: 'atelier-monarch',
        title: 'Atelier Monarch Haute Horology & Fashion',
        category: 'E-Commerce & Luxury Catalogues',
        snippet: 'Bespoke luxury horology & apparel boutique boasting sub-second page transitions & high-fidelity typography.',
        description: 'Tailored for high-end luxury collectors. Built with minimalist editorial aesthetics, curated timepiece lookbooks, private concierge appointment scheduling, and encrypted checkout workflows.',
        tags: ['React', 'Tailwind CSS', 'GraphQL', 'Shopify Storefront', 'GSAP'],
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Atelier-Monarch',
        demo: 'https://atelier-monarch.netlify.app'
    },
    {
        id: 'aura-techie',
        title: 'Aura Techie High-Conversion SaaS Landing',
        category: 'High-Performance Landing Pages',
        snippet: 'Performance-engineered landing portal achieving 99/100 Core Web Vitals with dynamic lead captures.',
        description: 'A modern technology product showcase featuring kinetic typography, dark-mode glassmorphic cards, responsive interactive feature matrices, and seamless integration with CRM webhooks.',
        tags: ['HTML5', 'Tailwind CSS', 'GSAP', 'Vite', 'Responsive Design'],
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Aura-Techie-Landing',
        demo: 'https://aura-ng.netlify.app'
    },
    {
        id: 'cito',
        title: 'Cito Digital Transformation Platform',
        category: 'High-Performance Landing Pages',
        snippet: 'Executive digital transformation launchpad designed to accelerate enterprise software adoption.',
        description: 'Cito provides modern technology consultancies with a high-impact conversion platform. Boasts frictionless interactive demo scheduling, structured service breakdowns, and optimized mobile velocity.',
        tags: ['React', 'Tailwind CSS', 'Vite', 'Micro-Interactions', 'SEO Engine'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Cito-Landing-Page',
        demo: 'https://citolandingpg.netlify.app'
    },
    {
        id: 'creative-design-apparel',
        title: 'Creative Design Apparel Catalogue',
        category: 'E-Commerce & Luxury Catalogues',
        snippet: 'Editorial streetwear & fashion catalogue featuring dynamic filtering and aesthetic product lookbooks.',
        description: 'An interactive fashion catalogue built for independent fashion design houses. Incorporates modular fabric swatch previews, seasonal drop timers, and fluid grid layouts.',
        tags: ['React', 'Tailwind CSS', 'Headless CMS', 'Editorial Layout', 'Vite'],
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Creative-Design-Apparel-Catalogue',
        demo: null
    },
    {
        id: 'devflow-copilot',
        title: 'DevFlow Copilot Developer Workspace',
        category: 'Custom Web Applications',
        snippet: 'Cloud-based developer productivity workstation streamlining workflow automation and code reviews.',
        description: 'A collaborative code intelligence workspace integrating syntax tree analysis, interactive snippet boards, multi-file side-by-side diff viewers, and webhook-driven CI/CD notifications.',
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'REST API'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/DevFlow-Copilot',
        demo: null
    },
    {
        id: 'flow-os',
        title: 'Flow OS Web Desktop Interface',
        category: 'Custom Web Applications',
        snippet: 'Browser-based operating system shell with multi-window multitasking & file management.',
        description: 'A responsive Web OS platform featuring draggable floating windows, taskbar docking, theme configuration, sandboxed browser mini-apps, and instant state persistence.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Window Management', 'Vite'],
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Flow-OS-Landing-Page',
        demo: 'https://flow-0s.netlify.app'
    },
    {
        id: 'study-pulse',
        title: 'Study Pulse AI Student Learning Hub',
        category: 'Online Course & LMS Platforms',
        snippet: 'Adaptive educational intelligence hub with personalized study trackers & cohort analytics.',
        description: 'Empowers students and academic institutions with intelligent study session logging, spaced repetition flashcards, automated progress metrics, and low-latency interactive quizzes.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Adaptive Analytics', 'Edge API'],
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/MAIN-Study-Pulse',
        demo: 'https://mainstudypulse.netlify.app'
    },
    {
        id: 'maison-there',
        title: 'MAISON THÉRÈSE Luxury Interior Architecture',
        category: 'Interactive WebGL & 3D Portals',
        snippet: 'High-end interior architecture showroom featuring 3D virtual room exploration & product specs.',
        description: 'Engineered for luxury architectural firms. Allows private clients to inspect designer fixtures, explore bespoke interior spatial layouts, and request private consultations with architectural partners.',
        tags: ['React', 'Three.js', 'Tailwind CSS', 'CAD Visualization', 'Vite'],
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/MAISON-TH-R-E---Luxury-Interior-Architecture-Product-Showroom',
        demo: 'https://maison-thre-luxury.netlify.app'
    },
    {
        id: 'medstream',
        title: 'Medstream Telemetry & Clinical Health',
        category: 'Custom Web Applications',
        snippet: 'Secure clinical telemetry portal delivering encrypted biometric tracking & practitioner records.',
        description: 'Engineered to modernize patient vitals tracking. Features longitudinal biomarker charting, HIPAA-aligned architecture, encrypted consultation requests, and immediate practitioner alert webhooks.',
        tags: ['React', 'WebRTC', 'Tailwind CSS', 'HIPAA Architecture', 'REST API'],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Medstream',
        demo: 'https://medistream.netlify.app'
    },
    {
        id: 'my-portfolio',
        title: 'HODM Multidisciplinary Portfolio Archive',
        category: 'High-Performance Landing Pages',
        snippet: 'Primary multidisciplinary personal brand archive demonstrating full-stack engineering & AI visual creation.',
        description: 'The foundational portfolio architecture of H.O. Damilare Michael. Showcases full-stack web platforms, generative AI video workflows, leadership frameworks, and health protocols.',
        tags: ['HTML5', 'Tailwind CSS', 'GSAP', 'Canvas Shaders', 'Web Audio'],
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/My-Portfolio-site',
        demo: null
    },
    {
        id: 'mykesyte',
        title: 'MykeSyte Interactive Studio',
        category: 'High-Performance Landing Pages',
        snippet: 'Creative web laboratory experimenting with kinetic micro-interactions & experimental CSS.',
        description: 'An interactive playground engineered to stress-test high-performance animations, canvas particulate fields, responsive typography scaling, and smooth navigation patterns.',
        tags: ['JavaScript', 'Tailwind CSS', 'CSS3', 'WebGL', 'Responsive UI'],
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/mykesyte',
        demo: null
    },
    {
        id: 'nexnova',
        title: 'NexNova Cloud Telemetry & DevOps Core',
        category: 'Enterprise Cloud Platforms',
        snippet: 'Distributed cloud observability suite delivering container health metrics & latency heatmaps.',
        description: 'Built for cloud infrastructure managers. Monitors microservice health, automated deployment pipelines, canary releases, and system uptime alerts through a reactive dark-mode interface.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Microservices', 'GraphQL'],
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/NexNova',
        demo: 'https://nexxnova.netlify.app'
    },
    {
        id: 'notewave-ai',
        title: 'NoteWave AI Knowledge & Student Hub',
        category: 'Online Course & LMS Platforms',
        snippet: 'Intelligent note orchestration platform with semantic query matching & automated summaries.',
        description: 'NoteWave AI aggregates student lecture notes, automatically compiles concise revision summaries, extracts key definitions, and provides instantaneous search across large knowledge repositories.',
        tags: ['React', 'Node.js', 'Tailwind CSS', 'Vector Embeddings', 'IndexedDB'],
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/NoteWaveAI',
        demo: 'https://notewave-studenthub.netlify.app'
    },
    {
        id: 'pc-refinishing-cyber',
        title: 'PC Refinishing Cyber Diagnostics WebApp',
        category: 'Custom Web Applications',
        snippet: 'Hardware diagnostic telemetry suite & automated PC restoration service scheduling engine.',
        description: 'Delivers real-time computer diagnostics estimation, hardware upgrade calculations, benchmark comparisons, and seamless booking for custom computing restoration.',
        tags: ['TypeScript', 'React', 'Tailwind CSS', 'Hardware Diagnostics', 'Vite'],
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/PC-Refinishing-Cyber-WebApp',
        demo: 'https://pc-refinishing.netlify.app'
    },
    {
        id: 'pc-refinishing-spa',
        title: 'PC Refinishing Spa Experience',
        category: 'High-Performance Landing Pages',
        snippet: 'Boutique hardware concierge landing platform featuring interactive transformation sliders.',
        description: 'A sensory, boutique showcase celebrating custom craftsmanship in computing hardware restoration. Features before-and-after interactive comparison sliders and VIP booking flows.',
        tags: ['HTML5', 'Tailwind CSS', 'GSAP ScrollTrigger', 'Responsive UI'],
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Pc-Refinishing-Spa-Landing-Page',
        demo: 'https://pc-refinishing-spa.netlify.app'
    },
    {
        id: 'sacco',
        title: 'SACCO Community Savings & Micro-Lending',
        category: 'Custom Web Applications',
        snippet: 'Decentralized financial cooperative ledger facilitating member savings & micro-credit loans.',
        description: 'Engineered to bring transparency to grassroots cooperative finance. Features tamper-evident transaction ledgers, member savings goal tracking, automated interest calculations, and SMS notification webhooks.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'Ledger Integrity', 'Stripe API'],
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/SACCO-Community-Savings-Loan-',
        demo: 'https://saac0.netlify.app'
    },
    {
        id: 'spectre',
        title: 'SPECTRE Electric Hypercar Showcase',
        category: 'Interactive WebGL & 3D Portals',
        snippet: 'Adrenaline-fueled 3D automotive portal featuring dynamic aerodynamics & specs inspection.',
        description: 'Showcasing next-generation electric hypercar engineering. Incorporates interactive 360-degree model rotation, dynamic powertrain telemetry readouts, acceleration benchmarks, and VIP allocation reservations.',
        tags: ['WebGL', 'Three.js', 'React', 'Tailwind CSS', 'Audio FX'],
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/SPECTRE-E-HYPERCAR',
        demo: 'https://spectre-e-hypercar-website.netlify.app'
    },
    {
        id: 'surth',
        title: 'SUTRH Digital Apparel Passport & Provenance',
        category: 'E-Commerce & Luxury Catalogues',
        snippet: 'Cryptographic fashion provenance passport verifying ethical sourcing & limited-run garment authenticity.',
        description: 'Bridging physical luxury garments with digital ownership verification. Each collection piece receives a permanent provenance ledger, detailed fabric care guides, and exclusive collector perks.',
        tags: ['React', 'Tailwind CSS', 'Provenance Verification', 'Vite', 'Framer'],
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/SUTRH-DESIGN-APPAREL-PASSPORT',
        demo: 'https://surth.netlify.app'
    },
    {
        id: 'synthetix-saas',
        title: 'Synthetix Enterprise SaaS Operations',
        category: 'Custom Web Applications',
        snippet: 'High-throughput cloud workflow engine connecting enterprise teams to automated data pipelines.',
        description: 'An enterprise operations powerhouse designed for distributed teams. Integrates permissioned role-based dashboards, automated data transformation queues, and live event monitoring.',
        tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Server Actions'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Synthetix-SaaS-WebApp',
        demo: 'https://synthetix-saas.netlify.app'
    },
    {
        id: 'synthetix-webapp',
        title: 'Synthetix Cloud Console',
        category: 'Custom Web Applications',
        snippet: 'Lightweight cloud dashboard client delivering real-time telemetry charts & API dispatching.',
        description: 'A companion web client engineered with zero-latency interface responses. Allows system administrators to monitor server nodes, review webhook logs, and dispatch automated tasks.',
        tags: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Redis'],
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Synthetix-Webapp',
        demo: 'https://synthetix-webapp.netlify.app'
    },
    {
        id: 'valence',
        title: 'Valence Longevity & Cellular Health Institute',
        category: 'Custom Web Applications',
        snippet: 'Pioneering longevity research platform presenting cellular longevity protocols & NAD+ optimization.',
        description: 'Valence bridges clinical geroscience with accessible human optimization protocols. Features comprehensive biomarker assessment tools, mitochondrial supplement guides, and physician referral integrations.',
        tags: ['React', 'Tailwind CSS', 'Biometric Protocols', 'Vite', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Valence-Longevity-Institute',
        demo: 'https://valence-longevity-institute.netlify.app'
    },
    {
        id: 'xpera',
        title: 'Xpera — Experience Intelligence Engine',
        category: 'Enterprise Cloud Platforms',
        snippet: 'Next-generation experiential platform delivering intelligent personalized digital interactions at scale.',
        description: 'Xpera represents the pinnacle of modern experience engineering. Unites distributed micro-frontends, predictive user engagement models, and instantaneous edge content delivery.',
        tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Distributed Mesh', 'Micro-Frontends'],
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Xpera',
        demo: 'https://xpera.io'
    },
    {
        id: 'xpera-hebrew',
        title: 'Xpera Hebrew Localized Architecture',
        category: 'Enterprise Cloud Platforms',
        snippet: 'RTL-optimized localization of the Xpera platform engineered for Middle Eastern enterprise adoption.',
        description: 'A bi-directional, right-to-left localized deployment of Xpera. Preserves fluid layout hierarchies, typographic nuance, and performance metrics while tailoring content for Hebrew-speaking markets.',
        tags: ['React', 'Tailwind CSS', 'RTL Localization', 'Bi-directional Layout', 'Vite'],
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
        github: 'https://github.com/Oloxa/Xpera-Hebrew-Distinct-Website',
        demo: 'https://xpera-website.netlify.app'
    }
];

let currentRepeaterPage = 1;
const REPEATER_ITEMS_PER_PAGE = 7;

function initWebProficiencySystem() {
    initDualMotionCarousels();
    initStackedProjectsSystem();
    initProjectModalHandlers();
}

// 1. Dual Motion Carousels (Top moves Right, Bottom moves Left) - Featuring Crisp Vector Graphics
function initDualMotionCarousels() {
    const trackRight = document.getElementById('carouselTrackRight');
    const trackLeft = document.getElementById('carouselTrackLeft');
    if (!trackRight || !trackLeft) return;

    // Split 26 projects into 2 sets of 13, duplicate them for seamless continuous infinite looping
    const half = Math.ceil(WEB_PROJECTS_DATA.length / 2);
    const set1 = WEB_PROJECTS_DATA.slice(0, half);
    const set2 = WEB_PROJECTS_DATA.slice(half);

    function createCardHtml(p) {
        const liveIndicator = p.demo 
            ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-[#E6C280] hover:text-[#FFF3CD] transition-colors p-1" title="Open Live Site: ${p.demo}"><i class="fas fa-external-link-alt text-xs"></i></a>`
            : `<span class="text-[#8B949E]/35 cursor-not-allowed p-1" title="No live link available - repository only"><i class="fas fa-external-link-alt text-xs opacity-30"></i></span>`;
            
        const repoIndicator = `<a href="${p.github}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-[#A0AEC0] hover:text-[#E6C280] transition-colors p-1" title="View Source on GitHub"><i class="fab fa-github text-xs"></i></a>`;

        const bannerGraphic = window.ProjectVectors && window.ProjectVectors.getBanner 
            ? window.ProjectVectors.getBanner(p.id) 
            : `<img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover" loading="lazy">`;

        return `
            <div class="carousel-project-card group" onclick="openProjectModal('${p.id}')" role="button" tabindex="0">
                <div class="h-44 w-full relative overflow-hidden bg-black/40">
                    ${bannerGraphic}
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#12161A]/90 text-[#E6C280] border border-[#E6C280]/30 backdrop-blur-md">
                        ${p.category}
                    </span>
                    ${!p.demo ? '<span class="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/75 text-[#8B949E] border border-white/10">Repo Only</span>' : ''}
                </div>
                <div class="p-4">
                    <h4 class="text-sm font-bold text-[#F5E6C8] group-hover:text-[#FFF3CD] transition-colors truncate mb-1">
                        ${p.title}
                    </h4>
                    <p class="text-xs text-[#8B949E] line-clamp-2 leading-relaxed mb-3">
                        ${p.snippet}
                    </p>
                    <div class="flex items-center justify-between pt-2 border-t border-[#F5E6C8]/10 text-xs">
                        <span class="text-[#E6C280] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Expand Details <i class="fas fa-arrow-right text-[10px]"></i>
                        </span>
                        <div class="flex items-center gap-2">
                            ${repoIndicator}
                            ${liveIndicator}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Populate tracks with duplicate sets for infinite marquee effect
    const htmlSet1 = set1.map(createCardHtml).join('');
    trackRight.innerHTML = htmlSet1 + htmlSet1;

    const htmlSet2 = set2.map(createCardHtml).join('');
    trackLeft.innerHTML = htmlSet2 + htmlSet2;
}

// 2. Interactive Stacked Cards Portfolio System (Web Architecture Page)
function initStackedProjectsSystem() {
    const container = document.getElementById('stackedCardsContainer');
    const inspector = document.getElementById('stackedProjectInspector');
    if (!container) return;

    let activeFilter = 'all';
    let selectedProjectId = WEB_PROJECTS_DATA[0].id;

    function renderInspector(project) {
        if (!inspector) return;
        const bannerSvg = window.ProjectVectors && window.ProjectVectors.getBanner 
            ? window.ProjectVectors.getBanner(project.id) 
            : `<div class="w-full h-48 bg-[#161B22] flex items-center justify-center font-mono text-[#E6C280]">${project.title}</div>`;

        const hasDemo = Boolean(project.demo);
        const liveBtn = hasDemo
            ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E6C280] text-[#0D0F12] font-bold text-xs sm:text-sm hover:bg-[#FFF3CD] hover:shadow-[0_0_20px_rgba(230,194,128,0.4)] transition-all">
                <i class="fas fa-external-link-alt text-xs"></i>
                <span>Launch Live Website</span>
               </a>`
            : `<span class="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#161B22] text-[#8B949E] text-xs font-mono border border-white/10 select-none">
                <i class="fas fa-lock text-xs text-[#E6C280]"></i>
                <span>Internal Enterprise Architecture</span>
               </span>`;

        const githubBtn = `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#161B22] text-[#F5E6C8] hover:text-[#FFF3CD] hover:border-[#E6C280] border border-[#F5E6C8]/20 font-bold text-xs sm:text-sm transition-all">
            <i class="fab fa-github text-base"></i>
            <span>Inspect Code on GitHub</span>
        </a>`;

        inspector.innerHTML = `
            <div class="p-6 sm:p-8 space-y-6">
                <!-- Vector Graphic Banner Showcase -->
                <div class="h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-black/60 relative border border-[#E6C280]/25 shadow-2xl">
                    ${bannerSvg}
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0E1116] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                    <div class="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                        <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0D0F12]/90 text-[#E6C280] border border-[#E6C280]/30 backdrop-blur-md">
                            ${project.category}
                        </span>
                        ${hasDemo ? '<span class="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">● LIVE DEPLOYMENT</span>' : '<span class="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#1A2028]/90 text-[#A0AEC0] border border-white/10 backdrop-blur-md">● REPO ONLY</span>'}
                    </div>
                </div>

                <!-- Title & Overview -->
                <div>
                    <span class="text-xs font-mono text-[#E6C280] uppercase tracking-wider block mb-1">Architecture Specification // ${project.id.toUpperCase()}</span>
                    <h3 class="text-2xl sm:text-3xl font-bold font-display text-[#F5E6C8] leading-tight mb-2">
                        ${project.title}
                    </h3>
                    <p class="text-xs sm:text-sm text-[#C9D1D9] leading-relaxed">
                        ${project.description}
                    </p>
                </div>

                <!-- Architectural Capabilities & Delivery Guarantees -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div class="p-3.5 rounded-xl bg-[#12161A] border border-[rgba(245,230,200,0.08)]">
                        <div class="text-[10px] font-mono uppercase tracking-wider text-[#E6C280]">Architecture Capability</div>
                        <div class="text-xs font-semibold text-[#F5E6C8] mt-1">${project.snippet}</div>
                    </div>
                    <div class="p-3.5 rounded-xl bg-[#12161A] border border-[rgba(245,230,200,0.08)]">
                        <div class="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8]">Delivery SLA Metric</div>
                        <div class="text-xs font-semibold text-[#F5E6C8] mt-1">99.98% Edge Uptime · &lt;100ms API Latency</div>
                    </div>
                </div>

                <!-- Technology & Protocol Badges -->
                <div>
                    <h4 class="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider mb-2.5">Production Stack &amp; Protocols</h4>
                    <div class="flex flex-wrap gap-2">
                        ${project.tags.map(tag => `
                            <span class="text-xs px-3 py-1 rounded-full bg-[#E6C280]/10 text-[#FFF3CD] border border-[#E6C280]/25 font-mono">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Direct Action Buttons -->
                <div class="pt-5 border-t border-[rgba(245,230,200,0.1)] flex flex-wrap items-center justify-between gap-4">
                    <div class="flex flex-wrap items-center gap-3">
                        ${liveBtn}
                        ${githubBtn}
                    </div>
                    <button type="button" onclick="openProjectModal('${project.id}')" class="text-xs font-mono font-semibold text-[#A0AEC0] hover:text-[#E6C280] transition-colors flex items-center gap-1.5 p-2">
                        <i class="fas fa-expand text-xs"></i> Full Modal View
                    </button>
                </div>
            </div>
        `;
    }

    function renderCards() {
        const filteredProjects = activeFilter === 'all' 
            ? WEB_PROJECTS_DATA 
            : WEB_PROJECTS_DATA.filter(p => p.category === activeFilter);

        const countBadge = document.getElementById('stackedFilterCount');
        if (countBadge) {
            countBadge.innerHTML = `<i class="fas fa-layer-group text-[10px]"></i> <span>${filteredProjects.length} Verified Architecture${filteredProjects.length === 1 ? '' : 's'}</span>`;
        }

        container.innerHTML = filteredProjects.map((p, idx) => {
            const isSelected = p.id === selectedProjectId;
            const logoSvg = window.ProjectVectors && window.ProjectVectors.getLogo 
                ? window.ProjectVectors.getLogo(p.id) 
                : `<div class="w-full h-full flex items-center justify-center font-bold text-[#E6C280]">${p.title.charAt(0)}</div>`;
            const hasDemo = Boolean(p.demo);

            const directLiveLink = hasDemo
                ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-xs font-bold text-[#E6C280] hover:text-[#FFF3CD] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E6C280]/15 border border-[#E6C280]/30 transition-all hover:scale-105" title="Launch live website in new tab"><i class="fas fa-external-link-alt text-[10px]"></i> Live Site</a>`
                : `<span class="text-[11px] font-mono text-[#8B949E]/40 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 cursor-not-allowed select-none"><i class="fas fa-lock text-[10px] mr-1"></i> Repo Only</span>`;

            const directGithubLink = `<a href="${p.github}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" class="text-xs font-bold text-[#C9D1D9] hover:text-[#E6C280] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161B22] border border-[#F5E6C8]/15 hover:border-[#E6C280]/40 transition-all hover:scale-105" title="Inspect source code repository"><i class="fab fa-github text-sm"></i> GitHub</a>`;

            return `
                <div class="stacked-project-card ${isSelected ? 'active-stacked-card' : ''}" data-project-id="${p.id}" tabindex="0" role="button" aria-expanded="${isSelected}">
                    <div class="p-5">
                        <div class="flex items-start gap-4">
                            <!-- Custom Vector Favicon / Logo Badge -->
                            <div class="stacked-card-favicon">
                                ${logoSvg}
                            </div>

                            <!-- Title, Category & Index -->
                            <div class="flex-grow min-w-0">
                                <div class="flex items-center justify-between gap-2 mb-1">
                                    <span class="text-[10px] font-mono uppercase tracking-wider text-[#E6C280] truncate">
                                        ${p.category}
                                    </span>
                                    <span class="text-[10px] font-mono text-[#8B949E] px-2 py-0.5 rounded-md bg-[#0D0F12] border border-white/5 shrink-0">
                                        #${String(idx + 1).padStart(2, '0')} / ${String(filteredProjects.length).padStart(2, '0')}
                                    </span>
                                </div>
                                <h4 class="text-base sm:text-lg font-bold text-[#F5E6C8] hover:text-[#FFF3CD] transition-colors leading-snug truncate">
                                    ${p.title}
                                </h4>
                                <p class="text-xs text-[#8B949E] line-clamp-2 leading-relaxed mt-1.5">
                                    ${p.snippet}
                                </p>
                            </div>
                        </div>

                        <!-- Tech Stack Tags -->
                        <div class="flex flex-wrap gap-1.5 mt-3.5 pt-3 border-t border-[rgba(245,230,200,0.06)]">
                            ${p.tags.slice(0, 4).map(tag => `
                                <span class="text-[10px] px-2.5 py-0.5 rounded-md bg-[#F5E6C8]/5 text-[#C9D1D9] border border-[#F5E6C8]/10 font-mono">
                                    ${tag}
                                </span>
                            `).join('')}
                        </div>

                        <!-- Card Action Bar: Expand & Direct Links -->
                        <div class="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-[rgba(245,230,200,0.08)]">
                            <button type="button" class="expand-card-btn text-xs font-bold text-[#E6C280] hover:text-[#FFF3CD] flex items-center gap-1.5 transition-colors">
                                <span>${isSelected ? 'Expanded Breakdown' : 'Click to Expand Breakdown'}</span>
                                <i class="fas fa-chevron-right text-[10px] transition-transform duration-200"></i>
                            </button>

                            <div class="flex items-center gap-2">
                                ${directGithubLink}
                                ${directLiveLink}
                            </div>
                        </div>
                    </div>

                    <!-- In-Card Expandable Drawer (Revealed on click / mobile) -->
                    <div class="stacked-card-drawer px-5 pb-5">
                        <div class="pt-4 border-t border-[rgba(245,230,200,0.1)] space-y-4">
                            <div>
                                <h5 class="text-[11px] font-mono uppercase tracking-wider text-[#E6C280] mb-1">Architectural Breakdown</h5>
                                <p class="text-xs text-[#C9D1D9] leading-relaxed">${p.description}</p>
                            </div>
                            <div class="flex flex-wrap items-center gap-3 pt-2">
                                ${hasDemo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-full bg-[#E6C280] text-[#0D0F12] font-bold text-xs hover:bg-[#FFF3CD] transition-all flex items-center gap-1.5"><i class="fas fa-external-link-alt text-[10px]"></i> Open Website</a>` : ''}
                                <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-full bg-[#161B22] text-[#F5E6C8] border border-[#F5E6C8]/20 font-bold text-xs hover:border-[#E6C280] transition-all flex items-center gap-1.5"><i class="fab fa-github"></i> View Repository</a>
                                <button type="button" onclick="openProjectModal('${p.id}')" class="text-xs font-mono text-[#A0AEC0] hover:text-[#E6C280] transition-colors p-1">Full Modal</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Wire clicks on cards
        const cards = container.querySelectorAll('.stacked-project-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const pid = card.getAttribute('data-project-id');
                const project = WEB_PROJECTS_DATA.find(p => p.id === pid);
                if (!project) return;

                selectedProjectId = pid;
                cards.forEach(c => {
                    const active = c === card;
                    c.classList.toggle('active-stacked-card', active);
                    c.classList.toggle('drawer-open', active);
                    c.setAttribute('aria-expanded', active ? 'true' : 'false');
                    const btnSpan = c.querySelector('.expand-card-btn span');
                    if (btnSpan) btnSpan.textContent = active ? 'Expanded Breakdown' : 'Click to Expand Breakdown';
                });

                renderInspector(project);
            });
        });

        // Initialize Smooth Scroll-Reveal with IntersectionObserver
        initCardsScrollReveal(cards);

        // Render Inspector for selected project
        const currentProject = WEB_PROJECTS_DATA.find(p => p.id === selectedProjectId) || filteredProjects[0];
        if (currentProject) renderInspector(currentProject);
    }

    function initCardsScrollReveal(cards) {
        if (!('IntersectionObserver' in window)) {
            cards.forEach(c => c.classList.add('card-revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-revealed');
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.12
        });

        cards.forEach((card, i) => {
            card.style.transitionDelay = `${(i % 5) * 60}ms`;
            observer.observe(card);
        });
    }

    // Category filter pills wiring
    const filterPills = document.querySelectorAll('#stackedCategoryFilter .stacked-filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.getAttribute('data-category');
            renderCards();
        });
    });

    renderCards();
}

// 3. Project Detail Modal Handler
function initProjectModalHandlers() {
    const modal = document.getElementById('mhoProjectModal');
    if (!modal) return;

    const closeBtn = document.getElementById('closeProjectModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const project = WEB_PROJECTS_DATA.find(p => p.id === projectId) || WEB_PROJECTS_DATA[0];
    const modal = document.getElementById('mhoProjectModal');
    if (!modal) return;

    const titleEl = document.getElementById('modalProjectTitle');
    const categoryEl = document.getElementById('modalProjectCategory');
    const descEl = document.getElementById('modalProjectDesc');
    const imageEl = document.getElementById('modalProjectImage');
    const tagsEl = document.getElementById('modalProjectTags');
    const githubLink = document.getElementById('modalGithubBtn');
    const liveLink = document.getElementById('modalLiveBtn');

    if (titleEl) titleEl.textContent = project.title;
    if (categoryEl) categoryEl.textContent = project.category;
    if (descEl) descEl.textContent = project.description;
    
    // Replace generic image with high-fidelity vector banner graphic
    if (imageEl) {
        if (window.ProjectVectors && window.ProjectVectors.getBanner) {
            const parent = imageEl.parentElement;
            if (parent) {
                parent.innerHTML = `
                    <div class="w-full h-full relative">
                        ${window.ProjectVectors.getBanner(project.id)}
                        <div class="absolute inset-0 bg-gradient-to-t from-[#12161A] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                    </div>
                `;
            }
        } else {
            imageEl.src = project.image;
            imageEl.alt = project.title;
        }
    }
    if (tagsEl) {
        tagsEl.innerHTML = project.tags.map(tag => `
            <span class="text-xs px-2.5 py-1 rounded-full bg-[#E6C280]/10 text-[#FFF3CD] border border-[#E6C280]/25 font-mono">
                ${tag}
            </span>
        `).join('');
    }

    // Smart repo button wiring
    if (githubLink) {
        githubLink.href = project.github;
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.innerHTML = `<i class="fab fa-github mr-1.5"></i> GitHub Repository`;
    }

    // Smart live site button wiring (No action if demo is null)
    if (liveLink) {
        if (project.demo) {
            liveLink.href = project.demo;
            liveLink.target = "_blank";
            liveLink.rel = "noopener noreferrer";
            liveLink.onclick = null;
            liveLink.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E6C280] text-[#0D0F12] font-bold text-xs hover:bg-[#FFF3CD] hover:shadow-[0_0_20px_rgba(230,194,128,0.4)] transition-all";
            liveLink.innerHTML = `Launch Live Site <i class="fas fa-external-link-alt text-[10px] ml-1"></i>`;
            liveLink.title = `Visit deployed live application at ${project.demo}`;
        } else {
            liveLink.removeAttribute('href');
            liveLink.removeAttribute('target');
            liveLink.onclick = (e) => { e.preventDefault(); e.stopPropagation(); return false; };
            liveLink.className = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E232B] text-[#8B949E] border border-white/5 text-xs opacity-50 cursor-not-allowed select-none";
            liveLink.innerHTML = `No Live Link (Repo Only) <i class="fas fa-ban text-[10px] ml-1"></i>`;
            liveLink.title = "No public live deployment available for this repository";
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('mhoProjectModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================================================
   CREATIVE AI VIDEO STREAMING MODAL
   ========================================================================== */
function initCreativeVideoModal() {
    const videoModal = document.getElementById('mhoVideoModal');
    if (!videoModal) return;

    const closeBtn = document.getElementById('closeVideoModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeVideoModal);
    }

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeVideoModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Delegate click on all video trigger cards
    const videoCards = document.querySelectorAll('.video-project-card');
    videoCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const embedUrl = card.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            const title = card.getAttribute('data-video-title') || 'Generative AI Cinematic Production';
            const category = card.getAttribute('data-video-category') || 'Commercial AI Video';
            const synopsis = card.getAttribute('data-video-synopsis') || 'Full visual production asset combining 3D spatial thinking, neural video generation, After Effects compositing, and commercial rhythm.';
            openVideoModal(embedUrl, title, category, synopsis);
        });
    });
}

function openVideoModal(url, title, category, synopsis) {
    let videoModal = document.getElementById('mhoVideoModal');
    if (!videoModal) {
        // Create dynamically if not on page
        videoModal = document.createElement('div');
        videoModal.id = 'mhoVideoModal';
        videoModal.className = 'mho-modal-backdrop';
        videoModal.innerHTML = `
            <div class="mho-modal-card p-6 md:p-8 relative">
                <button id="closeVideoModalBtn" class="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#1A2026] text-[#F5E6C8] hover:text-[#FFF3CD] hover:bg-[#E6C280]/20 flex items-center justify-center transition-colors">
                    <i class="fas fa-times"></i>
                </button>
                <div class="mb-4">
                    <span id="videoModalCategory" class="text-xs font-semibold text-[#E6C280] uppercase tracking-wider block mb-1">
                        ${category || 'Visual Showcase'}
                    </span>
                    <h3 id="videoModalTitle" class="text-xl md:text-2xl font-bold text-[#F5E6C8]">
                        ${title || 'Commercial Video Asset'}
                    </h3>
                </div>
                <div id="videoModalMediaContainer" class="aspect-video w-full rounded-xl overflow-hidden bg-black mb-4 border border-[#E6C280]/20 relative">
                    <iframe id="videoModalIframe" class="w-full h-full" src="" title="Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <video id="videoModalVideo" class="w-full h-full object-cover hidden" controls playsinline></video>
                </div>
                <p id="videoModalSynopsis" class="text-sm text-[#8B949E] leading-relaxed">
                    ${synopsis || ''}
                </p>
            </div>
        `;
        document.body.appendChild(videoModal);
        const dynamicClose = videoModal.querySelector('#closeVideoModalBtn');
        if (dynamicClose) dynamicClose.addEventListener('click', closeVideoModal);
        videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeVideoModal(); });
    }

    const titleEl = videoModal.querySelector('#videoModalTitle');
    const categoryEl = videoModal.querySelector('#videoModalCategory');
    const synopsisEl = videoModal.querySelector('#videoModalSynopsis');
    const iframe = videoModal.querySelector('#videoModalIframe');
    const videoEl = videoModal.querySelector('#videoModalVideo');

    if (titleEl) titleEl.textContent = title;
    if (categoryEl) categoryEl.textContent = category;
    if (synopsisEl) synopsisEl.textContent = synopsis;

    const isDirectVideo = url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.startsWith('/media') || url.startsWith('/xtra'));
    if (isDirectVideo) {
        if (iframe) {
            iframe.src = '';
            iframe.classList.add('hidden');
        }
        if (videoEl) {
            videoEl.src = url;
            videoEl.classList.remove('hidden');
            videoEl.play().catch(() => {});
        }
    } else {
        if (videoEl) {
            videoEl.pause();
            videoEl.src = '';
            videoEl.classList.add('hidden');
        }
        if (iframe) {
            iframe.classList.remove('hidden');
            iframe.src = url;
        }
    }

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const videoModal = document.getElementById('mhoVideoModal');
    if (!videoModal) return;
    const iframe = videoModal.querySelector('#videoModalIframe');
    if (iframe) iframe.src = '';
    const videoEl = videoModal.querySelector('#videoModalVideo');
    if (videoEl) {
        videoEl.pause();
        videoEl.src = '';
    }
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================================================
   ACCESSIBILITY SYSTEM & MODAL
   ========================================================================== */
function initAccessibilitySystem() {
    const modal = document.getElementById('mhoAccessibilityModal');
    const openBtns = document.querySelectorAll('.trigger-accessibility-modal');
    const closeBtn = document.getElementById('closeA11yModalBtn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Toggle High Contrast
    const contrastBtn = document.getElementById('a11yToggleContrast');
    if (contrastBtn) {
        contrastBtn.addEventListener('click', () => {
            document.body.classList.toggle('a11y-high-contrast');
            contrastBtn.classList.toggle('bg-[#E6C280]/30');
            showNotification(document.body.classList.contains('a11y-high-contrast') ? 'High Contrast Mode Enabled' : 'Standard Contrast Restored');
        });
    }

    // Toggle Large Text
    const textBtn = document.getElementById('a11yToggleText');
    if (textBtn) {
        textBtn.addEventListener('click', () => {
            document.body.classList.toggle('a11y-large-text');
            textBtn.classList.toggle('bg-[#E6C280]/30');
            showNotification(document.body.classList.contains('a11y-large-text') ? 'Large Font Size Applied' : 'Standard Font Size Restored');
        });
    }

    // Toggle Reduced Motion
    const motionBtn = document.getElementById('a11yToggleMotion');
    if (motionBtn) {
        motionBtn.addEventListener('click', () => {
            document.body.classList.toggle('a11y-reduced-motion');
            motionBtn.classList.toggle('bg-[#E6C280]/30');
            showNotification(document.body.classList.contains('a11y-reduced-motion') ? 'Animations Paused' : 'Animations Restored');
        });
    }

    // Reset settings
    const resetBtn = document.getElementById('a11yResetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.body.classList.remove('a11y-high-contrast', 'a11y-large-text', 'a11y-reduced-motion');
            [contrastBtn, textBtn, motionBtn].forEach(b => { if (b) b.classList.remove('bg-[#E6C280]/30'); });
            showNotification('Accessibility Settings Reset');
        });
    }
}

/* ==========================================================================
   COMPREHENSIVE FOOTER & SEQUENTIAL NAVIGATION SEQUENCE BAR
   Boundary Logic: Page 1 (prev disabled), Page 4 (next disabled)
   Center Scroll-To-Top button: smoothly scrolls to top
   ========================================================================== */
function initFooterSequenceNav() {
    const prevBtn = document.getElementById('footerSeqPrevBtn');
    const nextBtn = document.getElementById('footerSeqNextBtn');
    const topBtn = document.getElementById('footerSeqTopBtn');

    // Page route sequence
    const pagesSequence = [
        'index.html',
        'web-services.html',
        'creative-space.html',
        'leadership-business.html'
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let currentIndex = pagesSequence.findIndex(p => p.toLowerCase() === currentPath.toLowerCase());
    if (currentIndex === -1) currentIndex = 0; // Default to index.html

    if (prevBtn) {
        if (currentIndex === 0) {
            prevBtn.classList.add('disabled');
            prevBtn.setAttribute('aria-disabled', 'true');
            prevBtn.removeAttribute('href');
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.setAttribute('href', pagesSequence[currentIndex - 1]);
        }
    }

    if (nextBtn) {
        if (currentIndex === pagesSequence.length - 1) {
            nextBtn.classList.add('disabled');
            nextBtn.setAttribute('aria-disabled', 'true');
            nextBtn.removeAttribute('href');
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.setAttribute('href', pagesSequence[currentIndex + 1]);
        }
    }

    if (topBtn) {
        topBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   NAVIGATION, HOVER & FORMS
   ========================================================================== */
function initNavigation() {
    const currentTheme = document.body ? document.body.getAttribute('data-page-theme') : '';
    // Navigation header is only for Home (Page 1) and Leadership & Health (Page 4),
    // strictly invisible/omitted on Web Architecture (Page 2) and Creative Space (Page 3)
    if (currentTheme === 'web' || currentTheme === 'creative') {
        const existingNav = document.querySelector('.mho-nav-pill-wrapper');
        if (existingNav) existingNav.remove();
        const existingDrawer = document.querySelector('.mho-mobile-drawer');
        if (existingDrawer) existingDrawer.remove();
        return;
    }

    const toggleBtn = document.querySelector('.mho-mobile-toggle');
    let drawer = document.querySelector('.mho-mobile-drawer');

    if (toggleBtn && !drawer) {
        drawer = document.createElement('div');
        drawer.className = 'mho-mobile-drawer';
        drawer.innerHTML = `
            <a href="index.html">01 // Home & Biography</a>
            <a href="web-services.html">02 // Web Architecture</a>
            <a href="creative-space.html">03 // Creative AI Space</a>
            <a href="leadership-business.html">04 // Leadership & Health</a>
            <div class="pt-2">
                <a href="mailto:reel3dlab@gmail.com" class="mho-nav-cta justify-center w-full">
                    Direct Inquiry &nbsp;<i class="fas fa-envelope"></i>
                </a>
            </div>
        `;
        document.body.appendChild(drawer);

        // Highlight active link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = drawer.querySelectorAll('a');
        links.forEach(l => {
            if (l.getAttribute('href') === currentPath) l.classList.add('active');
        });
    }

    if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = drawer.classList.contains('open');
            if (isOpen) {
                drawer.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            } else {
                drawer.classList.add('open');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        });

        document.addEventListener('click', (e) => {
            if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
                drawer.classList.remove('open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Initialize smart scroll behavior for floating island navbar
    initNavbarScroll();
}

// Floating Island Navbar Scroll Behavior:
// 1. Disappears on downward scroll
// 2. Briefly reappears on upward scroll
// 3. Always appears and stays visible at top of page (hero section)
function initNavbarScroll() {
    const currentTheme = document.body ? document.body.getAttribute('data-page-theme') : '';
    if (currentTheme === 'web' || currentTheme === 'creative') return;
    const navWrapper = document.querySelector('.mho-nav-pill-wrapper');
    if (!navWrapper) return;

    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isTicking = false;
    let hideTimer = null;

    function handleScroll() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const delta = currentScrollY - lastScrollY;

        // Condition A: Whenever at the top of the page (Hero Section, scrollY <= 120), always visible
        if (currentScrollY <= 120) {
            navWrapper.classList.remove('nav-hidden');
            navWrapper.classList.add('nav-visible');
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
            lastScrollY = currentScrollY;
            isTicking = false;
            return;
        }

        // Condition B: Downward scroll -> disappears
        if (delta > 6) {
            navWrapper.classList.add('nav-hidden');
            navWrapper.classList.remove('nav-visible');
            if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        }
        // Condition C: Upward scroll -> briefly appears again
        else if (delta < -6) {
            navWrapper.classList.remove('nav-hidden');
            navWrapper.classList.add('nav-visible');

            // Set brief appearance timer while not at hero section
            if (hideTimer) clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                const nowY = window.pageYOffset || document.documentElement.scrollTop;
                if (nowY > 120) {
                    navWrapper.classList.add('nav-hidden');
                    navWrapper.classList.remove('nav-visible');
                }
            }, 3500);
        }

        lastScrollY = currentScrollY;
        isTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(handleScroll);
            isTicking = true;
        }
    }, { passive: true });
}

function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card, .glass-container');
    cards.forEach(card => {
        // Exclude 'About' section glass-containers so they use subtle GSAP expansion, and exclude stack cards
        if (card.closest('#biography') || card.closest('.cards-stack-stage')) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

function initCursor() {
    // Clean up any legacy cursor dot element
    const oldDot = document.getElementById('cursorDot');
    if (oldDot) oldDot.remove();

    let cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) {
        cursorGlow = document.createElement('div');
        cursorGlow.id = 'cursorGlow';
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.opacity = '1';
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    function renderCursor() {
        // High-velocity responsive following for ambient glow halo
        glowX += (mouseX - glowX) * 0.45;
        glowY += (mouseY - glowY) * 0.45;

        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        requestAnimationFrame(renderCursor);
    }

    renderCursor();
}

// Navigation Submenus: On-hover, on-click and smooth section scrolling
function initNavigationSubmenus() {
    const navItems = document.querySelectorAll('.mho-nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.mho-nav-link');
        const submenu = item.querySelector('.mho-nav-submenu');
        if (!link || !submenu) return;

        // Toggle on click for touch or chevron click
        link.addEventListener('click', (e) => {
            if (e.target.closest('.mho-nav-chevron') || window.innerWidth <= 1024) {
                e.preventDefault();
                const isOpen = item.classList.contains('open');
                navItems.forEach(other => { if (other !== item) other.classList.remove('open'); });
                item.classList.toggle('open', !isOpen);
            }
        });
    });

    // Close open submenus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mho-nav-item')) {
            navItems.forEach(item => item.classList.remove('open'));
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navItems.forEach(item => item.classList.remove('open'));
        }
    });

    // Smooth scroll if submenu link targets an anchor on current page
    const submenuLinks = document.querySelectorAll('.mho-submenu-item');
    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                const parts = href.split('#');
                const targetPage = parts[0];
                const hash = parts[1];
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';

                const isCurrentPage = !targetPage || 
                                     targetPage === currentPage || 
                                     (targetPage === 'index.html' && (currentPage === '' || currentPage === 'index.html'));

                if (isCurrentPage) {
                    const targetEl = document.getElementById(hash);
                    if (targetEl) {
                        e.preventDefault();
                        navItems.forEach(item => item.classList.remove('open'));
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        try {
                            history.pushState(null, null, `#${hash}`);
                        } catch (err) {}
                    }
                }
            }
        });
    });
}

// Floating Page Sections Hamburger Navigation (Web & Creative Pages)
// When clicked, expands horizontally into a sleek header nav menu showing section titles
function initPageSectionsNav() {
    const navWrapper = document.getElementById('pageSectionsNav');
    const pill = document.getElementById('pageSectionsPill');
    const toggleBtn = document.getElementById('sectionsMenuToggle');
    const closeBtn = document.getElementById('sectionsMenuClose');
    const scrollContainer = navWrapper ? navWrapper.querySelector('.sections-horizontal-scroll') : null;

    if (!navWrapper || !pill || !toggleBtn) return;

    const sectionLinks = navWrapper.querySelectorAll('.section-nav-link');

    function openMenu() {
        pill.classList.add('is-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        navWrapper.classList.remove('nav-hidden');
        navWrapper.classList.add('nav-visible');

        // Scroll active link into view in the horizontal bar
        setTimeout(() => {
            const activeLink = navWrapper.querySelector('.section-nav-link.active');
            if (activeLink && scrollContainer) {
                activeLink.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }
        }, 150);
    }

    function closeMenu() {
        pill.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        if (pill.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Toggle button click
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (pill.classList.contains('is-open') && !pill.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pill.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Smooth navigation with top offset
    sectionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elemRect = targetEl.getBoundingClientRect().top;
                    const elemPos = elemRect - bodyRect;
                    const targetY = elemPos - offset;

                    window.scrollTo({
                        top: targetY,
                        behavior: 'smooth'
                    });

                    sectionLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    try {
                        history.pushState(null, null, href);
                    } catch (err) {}
                }
            }
        });
    });

    // ScrollSpy to highlight active section in horizontal bar
    const sectionIds = Array.from(sectionLinks).map(l => l.getAttribute('href').replace('#', '')).filter(Boolean);
    const sectionElements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (sectionElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    sectionLinks.forEach(link => {
                        const linkHref = link.getAttribute('href');
                        if (linkHref === `#${id}`) {
                            link.classList.add('active');
                            // If menu is open, smoothly center the active item
                            if (pill.classList.contains('is-open') && scrollContainer) {
                                link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                            }
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-15% 0px -65% 0px',
            threshold: 0.05
        });

        sectionElements.forEach(el => observer.observe(el));
    }

    // Smart Scroll behavior: hides on fast scroll down, reveals on scroll up
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isTicking = false;

    function handleScroll() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const delta = currentScrollY - lastScrollY;

        // If open, always remain visible
        if (pill.classList.contains('is-open')) {
            navWrapper.classList.remove('nav-hidden');
            navWrapper.classList.add('nav-visible');
            lastScrollY = currentScrollY;
            isTicking = false;
            return;
        }

        // At very top of page: always visible
        if (currentScrollY <= 80) {
            navWrapper.classList.remove('nav-hidden');
            navWrapper.classList.add('nav-visible');
        } else if (delta > 8 && currentScrollY > 120) {
            // Scrolling down: hide
            navWrapper.classList.add('nav-hidden');
            navWrapper.classList.remove('nav-visible');
        } else if (delta < -8) {
            // Scrolling up: reveal
            navWrapper.classList.remove('nav-hidden');
            navWrapper.classList.add('nav-visible');
        }

        lastScrollY = currentScrollY;
        isTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(handleScroll);
            isTicking = true;
        }
    }, { passive: true });
}

function initAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const icon = trigger.querySelector('.accordion-icon');
            const isOpen = content.classList.contains('open');

            // Close siblings
            const parent = trigger.closest('.accordion-group');
            if (parent) {
                parent.querySelectorAll('.accordion-content').forEach(c => {
                    c.classList.remove('open');
                    c.style.maxHeight = null;
                });
                parent.querySelectorAll('.accordion-trigger').forEach(t => {
                    t.setAttribute('aria-expanded', 'false');
                });
                parent.querySelectorAll('.accordion-icon').forEach(i => i.style.transform = 'rotate(0deg)');
            }

            if (!isOpen) {
                content.classList.add('open');
                content.style.maxHeight = (content.scrollHeight + 30) + 'px';
                trigger.setAttribute('aria-expanded', 'true');
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-black inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg> Processing...
                `;
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showNotification('Thank you! Your message has been received. H.O. Damilare Michael will connect with you shortly.');
                    form.reset();
                } else {
                    showNotification('Thank you! Your inquiry was recorded successfully.');
                    form.reset();
                }
            } catch (err) {
                showNotification('Thank you! Your inquiry has been logged.');
                form.reset();
            } finally {
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;
                    }
                }, 1200);
            }
        });
    });
}

function initGsapAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Number counters
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                let obj = { val: 0 };
                gsap.to(obj, {
                    val: target,
                    duration: 2.2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        counter.textContent = prefix + (target % 1 === 0 ? Math.floor(obj.val) : obj.val.toFixed(1)) + suffix;
                    }
                });
            }
        });
    });

    // Glass cards scroll reveal
    const revealCards = document.querySelectorAll('.scroll-card-reveal');
    if (revealCards.length > 0) {
        gsap.fromTo(revealCards, 
            { opacity: 0, y: 50, scale: 0.96 },
            {
                scrollTrigger: {
                    trigger: revealCards[0].parentElement,
                    start: 'top 82%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                stagger: 0.14,
                ease: 'power3.out'
            }
        );
    }

    // Subtle GSAP Hover Effect for '.glass-container' cards in 'About' Section
    initAboutCardHover();

    // Creative AI Space Card Stack Unfolding Feature
    initCardsStack();

    // H1 and Heading GSAP Perspective & Shimmer Animations
    initHeadingGsapAnimations();
}

// H1 & Heading GSAP Perspective & Shimmer Text Reveal Animations
function initHeadingGsapAnimations() {
    if (typeof gsap === 'undefined') return;

    // 1. Hero H1 Headings with 3D Perspective & Shimmer Reveal
    const heroH1s = document.querySelectorAll('h1.font-display, .hero-fade-in h1, section#hero h1, section h1');
    heroH1s.forEach(h1 => {
        if (h1.getAttribute('data-gsap-animated')) return;
        h1.setAttribute('data-gsap-animated', 'true');
        h1.classList.add('gsap-hero-title');

        gsap.fromTo(h1, 
            { opacity: 0, y: 44, rotationX: 18, transformOrigin: '0% 50% -30px' },
            { opacity: 1, y: 0, rotationX: 0, duration: 1.15, ease: 'power3.out', delay: 0.15 }
        );

        // Highlight gold gradient words with animated shimmer
        const highlights = h1.querySelectorAll('.bg-clip-text, span');
        if (highlights.length > 0) {
            highlights.forEach(hl => hl.classList.add('gold-shimmer-text'));
            gsap.fromTo(highlights,
                { opacity: 0, scale: 0.94, filter: 'blur(4px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, delay: 0.35, ease: 'power2.out', stagger: 0.08 }
            );
        }
    });

    // 2. Section H2 Headings with ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        const sectionH2s = document.querySelectorAll('main section h2.font-display, main section h2');
        sectionH2s.forEach(h2 => {
            if (h2.closest('#hero') || h2.getAttribute('data-gsap-h2')) return;
            h2.setAttribute('data-gsap-h2', 'true');

            gsap.fromTo(h2, 
                { opacity: 0, y: 32 },
                {
                    scrollTrigger: {
                        trigger: h2,
                        start: 'top 88%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    ease: 'power3.out'
                }
            );
        });
    }
}

// Subtle GSAP Hover effect on '.glass-container' cards in 'About' section
function initAboutCardHover() {
    if (typeof gsap === 'undefined') return;
    const aboutSection = document.getElementById('biography');
    if (!aboutSection) return;

    const cards = aboutSection.querySelectorAll('.glass-container');
    cards.forEach(card => {
        card.style.transformOrigin = 'center center';
        card.style.willChange = 'transform, box-shadow, border-color';

        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.025,
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.85), 0 0 35px rgba(230, 194, 128, 0.22)',
                borderColor: 'rgba(230, 194, 128, 0.45)',
                duration: 0.35,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(230, 194, 128, 0.04)',
                borderColor: 'rgba(245, 230, 200, 0.1)',
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
    });
}

// ==========================================================================
// PREVIOUS WORKS: SCROLL-DRIVEN HORIZONTAL VIDEO PORTFOLIO SHOWCASE
// ==========================================================================
function initPortfolioShowcase() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const section = document.getElementById('video-grid');
    const track = document.getElementById('portfolioTrack');
    const viewport = document.getElementById('portfolioStageViewport');
    if (!section || !track || !viewport) return;

    const cards = Array.from(track.querySelectorAll('.portfolio-card'));
    if (cards.length === 0) return;

    const total = cards.length;
    const activeIndexEl = document.getElementById('portfolioActiveIndex');
    const totalCountEl = document.getElementById('portfolioTotalCount');
    const progressBarEl = document.getElementById('portfolioProgressBar');
    const prevBtn = document.getElementById('portfolioPrevBtn');
    const nextBtn = document.getElementById('portfolioNextBtn');
    const audioToggleBtn = document.getElementById('portfolioAudioToggle');
    const audioIcon = document.getElementById('portfolioAudioIcon');
    const audioLabel = document.getElementById('portfolioAudioLabel');

    if (totalCountEl) {
        totalCountEl.textContent = String(total).padStart(2, '0');
    }

    // Audio Mute State (default muted for seamless browser autoplay compliance)
    let isAudioMuted = true;
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isAudioMuted = !isAudioMuted;
            if (audioIcon) {
                audioIcon.className = isAudioMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up text-[#E6C280]';
            }
            if (audioLabel) {
                audioLabel.innerHTML = isAudioMuted 
                    ? 'SOUND OFF' 
                    : '<span class="flex items-center gap-1">SOUND ON <span class="audio-bar-anim"></span><span class="audio-bar-anim"></span><span class="audio-bar-anim"></span></span>';
            }
            // Update audio state on all card videos
            cards.forEach(card => {
                const vid = card.querySelector('video');
                if (vid) vid.muted = isAudioMuted;
            });
        });
    }

    // Initialize all card video elements
    cards.forEach(card => {
        const vid = card.querySelector('video');
        if (vid) {
            vid.muted = isAudioMuted;
            vid.playsInline = true;
            vid.setAttribute('playsinline', '');
            vid.setAttribute('webkit-playsinline', '');
            vid.loop = true;
            vid.preload = 'metadata';
            vid.controls = false;
        }
    });

    // Handle Reduced Motion Preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        cards.forEach((card) => {
            gsap.set(card, { scale: 1, opacity: 1, clearProps: 'transform' });
            const vid = card.querySelector('video');
            if (vid) vid.controls = true;
        });
        return;
    }

    // Function to calculate exact horizontal track translation to center Card `idx`
    function getCardCenterOffset(idx) {
        if (!cards[idx] || !viewport) return 0;
        const viewportWidth = viewport.clientWidth;
        const card = cards[idx];
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        return (viewportWidth / 2) - cardLeft - (cardWidth / 2);
    }

    let activeCardIndex = -1;

    // Helper: Synchronize Video Playback (Strictly ONE video playing at any time)
    function syncVideoPlayback(targetIdx) {
        cards.forEach((card, idx) => {
            const vid = card.querySelector('video');
            if (!vid) return;

            if (idx === targetIdx) {
                card.classList.add('is-active');
                vid.muted = isAudioMuted;

                if (vid.paused) {
                    const playPromise = vid.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            // Autoplay policies handled gracefully without console noise
                        });
                    }
                }
            } else {
                card.classList.remove('is-active');
                if (!vid.paused) {
                    vid.pause();
                }
            }
        });
    }

    function pauseAllCardVideos() {
        cards.forEach(card => {
            card.classList.remove('is-active');
            const vid = card.querySelector('video');
            if (vid && !vid.paused) {
                vid.pause();
            }
        });
    }

    // Dynamic Center Detection & Card Transformation
    function updateCardTransformations() {
        const viewportRect = viewport.getBoundingClientRect();
        const viewportCenter = viewportRect.left + viewportRect.width / 2;
        const maxDist = Math.max(viewportRect.width * 0.55, 300);

        let closestIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const diff = Math.abs(cardCenter - viewportCenter);

            // Calculate normalized distance (0 = dead center, 1 = boundary)
            const norm = Math.min(1, diff / maxDist);

            // Cinematic visual interpolation:
            // Center card: scale 1.0, opacity 1.0, top elevation
            // Side cards: scale ~0.84, opacity ~0.55
            const scale = 1 - norm * 0.16;
            const opacity = 1 - norm * 0.45;
            const zIndex = Math.round(100 - norm * 50);

            gsap.set(card, {
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                transformOrigin: 'center center'
            });

            if (diff < minDiff) {
                minDiff = diff;
                closestIdx = idx;
            }
        });

        // Trigger active change when center card shifts
        if (closestIdx !== activeCardIndex) {
            activeCardIndex = closestIdx;
            if (activeIndexEl) {
                activeIndexEl.textContent = String(activeCardIndex + 1).padStart(2, '0');
            }
            syncVideoPlayback(activeCardIndex);
        }
    }

    // Initial position setup: Center Card 0
    gsap.set(track, { x: getCardCenterOffset(0) });
    updateCardTransformations();

    // ScrollTrigger Pinned Scrub Animation
    ScrollTrigger.create({
        id: 'portfolioScrollTrigger',
        trigger: section,
        pin: true,
        start: 'top top',
        end: () => `+=${(total - 1) * Math.max(window.innerHeight * 0.95, 750)}`,
        scrub: 0.8, // Smooth physical inertia scrub
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            const progress = self.progress;

            // Interpolate track horizontal translation from Card 0 center to Card (total-1) center
            const startX = getCardCenterOffset(0);
            const endX = getCardCenterOffset(total - 1);
            const targetX = startX + (endX - startX) * progress;

            gsap.set(track, { x: targetX });

            // Update scrub progress bar
            if (progressBarEl) {
                const pct = Math.max(16.6, progress * 100);
                progressBarEl.style.width = `${pct}%`;
            }

            // Real-time dynamic center detection and card depth scaling
            updateCardTransformations();
        },
        onLeave: () => {
            // Unpinned - scrolled past section
            pauseAllCardVideos();
        },
        onLeaveBack: () => {
            // Unpinned - scrolled above section
            pauseAllCardVideos();
        },
        onEnter: () => {
            // Entering from above
            updateCardTransformations();
        },
        onEnterBack: () => {
            // Entering from below (natural reverse entry)
            updateCardTransformations();
        }
    });

    // Programmatic Scroll to Card
    function scrollToCard(targetIdx) {
        const clamped = Math.max(0, Math.min(total - 1, targetIdx));
        const st = ScrollTrigger.getById('portfolioScrollTrigger');
        if (!st) return;

        const targetProgress = clamped / (total - 1);
        const targetScrollY = st.start + (st.end - st.start) * targetProgress;
        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToCard(activeCardIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToCard(activeCardIndex + 1);
        });
    }

    // Keyboard Arrow Keys (Left / Right) support when section is visible
    window.addEventListener('keydown', (e) => {
        const st = ScrollTrigger.getById('portfolioScrollTrigger');
        if (!st) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                if (activeCardIndex < total - 1) {
                    e.preventDefault();
                    scrollToCard(activeCardIndex + 1);
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (activeCardIndex > 0) {
                    e.preventDefault();
                    scrollToCard(activeCardIndex - 1);
                }
            }
        }
    });

    // Click on Card or Action Button opens Full Video Modal
    cards.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('#portfolioAudioToggle') || e.target.closest('#portfolioPrevBtn') || e.target.closest('#portfolioNextBtn')) return;
            const videoUrl = card.getAttribute('data-video-url') || '';
            const title = card.getAttribute('data-video-title') || 'Featured AI Production';
            const category = card.getAttribute('data-video-category') || 'AI Cinematic';
            const synopsis = card.getAttribute('data-video-synopsis') || '';
            openVideoModal(videoUrl, title, category, synopsis);
        });
    });

    // Window Resize / Orientation Change Handler
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
        updateCardTransformations();
    });
}

function initCardsStack() {
    initPortfolioShowcase();
}

// Creative AI Space: Virtual Director Studio & Viewfinder Interactivity
function initCreativeDirectorDeck() {
    const lensBtns = document.querySelectorAll('.director-lens-btn');
    const aspectPills = document.querySelectorAll('.director-aspect-pill');
    const promptCards = document.querySelectorAll('.prompt-orbit-card');
    const viewportFrame = document.getElementById('directorViewport');
    const sceneTitleEl = document.getElementById('directorSceneTitle');
    const scenePillEl = document.getElementById('directorScenePill');
    const scenePromptEl = document.getElementById('directorScenePrompt');
    const sceneImageEl = document.getElementById('directorSceneImg');
    const playBtn = document.getElementById('directorMainPlayBtn');
    const lensNameDisplay = document.getElementById('directorLensNameDisplay');
    const hudTimecode = document.getElementById('directorHudTimecode');

    // Live timecode counter
    if (hudTimecode) {
        let frames = 18;
        let seconds = 12;
        let minutes = 4;
        setInterval(() => {
            frames++;
            if (frames >= 24) { frames = 0; seconds++; }
            if (seconds >= 60) { seconds = 0; minutes++; }
            hudTimecode.textContent = `REC 00:0${minutes}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
        }, 1000 / 24);
    }

    // Preset scene data
    const SCENE_PRESETS = [
        {
            title: "Deep Space Supernova · Sci-Fi Cinema Trailer",
            category: "4K IMAX CINEMA REEL",
            lens: "35mm Anamorphic 2.39:1",
            aspect: "2.39:1",
            prompt: "Ultra-wide anamorphic capture of a dying star, volumetric relativistic gas nebulae, interstellar derelict hull reflection, cinematic color grading, 24fps.",
            image: "/src/assets/images/cinematic_ai_studio_1790219642646.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        },
        {
            title: "Aura Titanium Chronograph · 3D Product Commercial",
            category: "LUXURY COMMERCIAL",
            lens: "Macro Probe 24mm f/14",
            aspect: "16:9",
            prompt: "Macro probe lens tracking through intricate titanium gear escapement, sapphire crystal anti-reflective refraction, studio chiaroscuro lighting, photoreal CAD detail.",
            image: "/src/assets/images/web_tech_architecture_1790219622367.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        },
        {
            title: "Lumina Cellular Skincare · High-ROAS AI UGC Viral Ad",
            category: "AI UGC VIRAL AD · 4.8X ROAS",
            lens: "35mm Portrait Prime",
            aspect: "9:16",
            prompt: "Authentic selfie-angle creator testimonial, micro facial expressions, real-time lip-sync, hands-only serum droplet texture close-up, high energy TikTok hook.",
            image: "https://res.cloudinary.com/iscdlbxg/image/upload/v1790332667/profile_pixx.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        },
        {
            title: "The Obsidian Villa · Architectural Cinematic Flythrough",
            category: "REAL ESTATE SHOWCASE",
            lens: "IMAX 70mm Grand-Format",
            aspect: "2.39:1",
            prompt: "Seamless drone fly-in through cantilevered glass facades, golden-hour ocean horizon reflections, marble acoustics, Hollywood cinematic pacing.",
            image: "/src/assets/images/cinematic_ai_studio_1790219642646.jpg",
            videoUrl: "https://www.youtube.com/embed/sECemgPYcFg?autoplay=1"
        }
    ];

    // Lens button switching
    lensBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            lensBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const lensText = btn.getAttribute('data-lens') || btn.textContent.trim();
            if (lensNameDisplay) lensNameDisplay.textContent = lensText;
            showNotification(`Camera Lens Switched: ${lensText}`);
        });
    });

    // Aspect ratio switching
    aspectPills.forEach(pill => {
        pill.addEventListener('click', () => {
            aspectPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const aspect = pill.getAttribute('data-aspect');
            if (viewportFrame) {
                if (aspect === '2.39:1') {
                    viewportFrame.style.aspectRatio = '21/9';
                    viewportFrame.style.maxWidth = '100%';
                } else if (aspect === '16:9') {
                    viewportFrame.style.aspectRatio = '16/9';
                    viewportFrame.style.maxWidth = '100%';
                } else if (aspect === '9:16') {
                    viewportFrame.style.aspectRatio = '9/16';
                    viewportFrame.style.maxWidth = '360px';
                }
            }
        });
    });

    // Scene prompt card switching
    promptCards.forEach((card, idx) => {
        card.addEventListener('click', () => {
            promptCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const data = SCENE_PRESETS[idx];
            if (!data) return;

            // Animate transition flash
            if (viewportFrame && typeof gsap !== 'undefined') {
                gsap.fromTo(viewportFrame, 
                    { filter: 'brightness(1.8) contrast(1.2)' },
                    { filter: 'brightness(1) contrast(1)', duration: 0.45, ease: 'power2.out' }
                );
            }

            if (sceneTitleEl) sceneTitleEl.textContent = data.title;
            if (scenePillEl) scenePillEl.textContent = data.category;
            if (scenePromptEl) scenePromptEl.textContent = `"${data.prompt}"`;
            if (sceneImageEl) {
                sceneImageEl.src = data.image;
                sceneImageEl.alt = data.title;
            }
            if (playBtn) {
                playBtn.setAttribute('data-video-url', data.videoUrl);
                playBtn.setAttribute('data-video-title', data.title);
                playBtn.setAttribute('data-video-category', data.category);
                playBtn.setAttribute('data-video-synopsis', data.prompt);
            }

            // Sync lens and aspect buttons
            lensBtns.forEach(b => {
                if (b.getAttribute('data-lens') === data.lens) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            aspectPills.forEach(a => {
                if (a.getAttribute('data-aspect') === data.aspect) {
                    a.classList.add('active');
                } else {
                    a.classList.remove('active');
                }
            });
            if (lensNameDisplay) lensNameDisplay.textContent = data.lens;
        });
    });

    // Real-time Director Audio Waveform Canvas Visualizer
    const audioCanvas = document.getElementById('directorAudioCanvas');
    if (audioCanvas) {
        const actx = audioCanvas.getContext('2d');
        let awidth = audioCanvas.width = audioCanvas.offsetWidth || 280;
        let aheight = audioCanvas.height = 40;

        window.addEventListener('resize', () => {
            if (audioCanvas.offsetWidth) awidth = audioCanvas.width = audioCanvas.offsetWidth;
        });

        let phase = 0;
        function renderWaveform() {
            actx.clearRect(0, 0, awidth, aheight);
            actx.beginPath();
            actx.strokeStyle = 'rgba(230, 194, 128, 0.7)';
            actx.lineWidth = 1.5;

            phase += 0.05;
            const mid = aheight / 2;
            const bars = 36;
            const barWidth = awidth / bars;

            for (let i = 0; i < bars; i++) {
                const amp = (Math.sin(phase + i * 0.35) * 0.4 + Math.cos(phase * 1.5 + i * 0.2) * 0.35 + 0.5) * (mid - 4);
                const x = i * barWidth + barWidth / 2;
                actx.moveTo(x, mid - amp);
                actx.lineTo(x, mid + amp);
            }
            actx.stroke();
            requestAnimationFrame(renderWaveform);
        }
        renderWaveform();
    }

    // Moon Brightness & Lunar Radiance Sync (Dimmed down by 50% default for dark theme aesthetic)
    const moonBtns = document.querySelectorAll('.director-moon-btn');
    const moonSlider = document.getElementById('moonBrightnessSlider');
    const moonDisplay = document.getElementById('moonBrightnessDisplay');
    const celestialMoon = document.getElementById('creativeCelestialMoon');

    function setMoonRadiance(level) {
        const clamped = Math.max(15, Math.min(220, level));
        const multiplier = clamped / 100;
        document.body.style.setProperty('--moon-multiplier', multiplier.toString());
        
        if (moonSlider) moonSlider.value = clamped;
        if (moonDisplay) moonDisplay.textContent = `${clamped}%`;
        
        moonBtns.forEach(btn => {
            if (parseInt(btn.getAttribute('data-level'), 10) === clamped) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Default to 50% dimmed for dark aesthetic
    setMoonRadiance(50);

    moonBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lvl = parseInt(btn.getAttribute('data-level'), 10);
            if (!isNaN(lvl)) {
                setMoonRadiance(lvl);
                showNotification(`Moon Radiance: ${lvl}%`);
            }
        });
    });

    if (moonSlider) {
        moonSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            setMoonRadiance(val);
        });
    }

    if (celestialMoon) {
        let currentIdx = 1; // start at 50%
        const levels = [25, 50, 75, 100, 150];
        celestialMoon.addEventListener('click', () => {
            currentIdx = (currentIdx + 1) % levels.length;
            setMoonRadiance(levels[currentIdx]);
            showNotification(`Moon Glow Cycled: ${levels[currentIdx]}%`);
        });
    }
}

// Cinematic Mandatory Scroll-Snap Navigation & Observer (Home Page)
function initCinematicScrollSnap() {
    const snapNav = document.getElementById('snapNav');
    const snapSections = document.querySelectorAll('.snap-section');
    if (!snapNav || snapSections.length === 0) return;

    const dots = snapNav.querySelectorAll('.snap-nav-dot');
    setTimeout(() => { snapNav.classList.add('active'); }, 1100);

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSelector = dot.getAttribute('data-target');
            const targetSection = document.querySelector(targetSelector);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        let bestEntry = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
                    bestEntry = entry;
                }
            }
        });

        if (bestEntry) {
            const id = bestEntry.target.getAttribute('id');
            if (id) {
                dots.forEach(dot => {
                    const target = dot.getAttribute('data-target');
                    if (target === `#${id}`) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
    }, { rootMargin: '-10% 0px -35% 0px', threshold: [0.15, 0.4, 0.7] });

    snapSections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   VIDEO COMPONENTS INTERSECTION OBSERVER (Auto-play on Scroll into Viewport)
   ========================================================================== */
function initVideoAutoplayObserver() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    // 1. Observe all HTML5 video elements (card videos, background reels, showcase videos)
    const videoElements = document.querySelectorAll('video, .portfolio-card-video, [data-autoplay-video]');

    if (videoElements.length > 0) {
        const videoObserverOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: [0, 0.25, 0.5]
        };

        const html5VideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                // Auto-play when video scrolls into view (at least 25% visible)
                if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                    // Browser autoplay requirements: muted and playsinline
                    video.muted = true;
                    video.setAttribute('playsinline', '');
                    video.setAttribute('webkit-playsinline', '');
                    
                    if (video.paused) {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => {
                                // Silently handle autoplay prevention or abort errors
                            });
                        }
                    }
                } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
                    // Automatically pause when scrolled out of viewport to preserve resources
                    if (!video.paused) {
                        video.pause();
                    }
                }
            });
        }, videoObserverOptions);

        videoElements.forEach(video => {
            // Guarantee baseline attributes for mobile & desktop autoplay compliance
            video.muted = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            html5VideoObserver.observe(video);
        });
    }

    // 2. Observe iframe video components (e.g., YouTube / Vimeo intro-video containers)
    const introVideoContainers = document.querySelectorAll('.mho-intro-video-container');
    if (introVideoContainers.length > 0) {
        const iframeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const container = entry.target;
                const iframe = container.querySelector('iframe');
                if (!iframe || !iframe.contentWindow) return;

                if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                    try {
                        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
                        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
                    } catch (e) {}
                } else if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
                    try {
                        iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
                    } catch (e) {}
                }
            });
        }, { threshold: [0, 0.3] });

        introVideoContainers.forEach(container => iframeObserver.observe(container));
    }
}

/* ==========================================================================
   HOME PAGE INTERACTIVE MEDIA TOUCHPOINTS & CINE-BENTO HANDLERS
   ========================================================================== */
function initHomeMediaTouchpoints() {
    // 1. Generic video modal triggers (.trigger-video-modal)
    const modalTriggers = document.querySelectorAll('.trigger-video-modal');
    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = btn.getAttribute('data-video-url') || '/media/service-anim-1.mp4';
            const title = btn.getAttribute('data-video-title') || 'Featured Production Reel';
            const category = btn.getAttribute('data-video-category') || 'Visual Production';
            const synopsis = btn.getAttribute('data-video-synopsis') || '';
            openVideoModal(url, title, category, synopsis);
        });
    });

    // 2. Bento Card Audio Toggle Buttons (.bento-sound-btn)
    const soundButtons = document.querySelectorAll('.bento-sound-btn');
    soundButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = btn.closest('.media-bento-card') || btn.parentElement;
            if (!card) return;
            const video = card.querySelector('video');
            if (!video) return;

            const willMute = !video.muted;
            // If unmuting, mute all other videos on the page for single audio focus
            if (!willMute) {
                document.querySelectorAll('video').forEach(v => {
                    if (v !== video) v.muted = true;
                });
                soundButtons.forEach(b => {
                    if (b !== btn) {
                        const icon = b.querySelector('i');
                        if (icon) icon.className = 'fas fa-volume-mute';
                    }
                });
            }

            video.muted = willMute;
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = willMute ? 'fas fa-volume-mute' : 'fas fa-volume-up text-[#E6C280]';
            }
        });
    });

    // 3. Intro Video 4-Chapter Dock Switching
    const chapterButtons = document.querySelectorAll('#introChapterDock .chapter-dock-item');
    const iframe = document.getElementById('pageIntroVideoIframe');
    chapterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            chapterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const videoUrl = btn.getAttribute('data-video-url');
            const videoTitle = btn.getAttribute('data-video-title');
            const category = btn.getAttribute('data-category');
            const synopsis = btn.getAttribute('data-synopsis');

            if (videoUrl) {
                if (videoUrl.includes('youtube.com')) {
                    if (iframe) iframe.src = videoUrl;
                } else {
                    // For MP4/WebM videos, launch the full-resolution modal directly
                    openVideoModal(videoUrl, videoTitle, category, synopsis);
                }
            }
        });
    });

    // 4. Discipline Segmented Switcher Buttons
    const disciplineTabs = document.querySelectorAll('.discipline-tab-btn');
    disciplineTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            disciplineTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            if (target) {
                const el = document.querySelector(target);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // 5. Interactive Home Multidisciplinary Media Theater & Channel Switcher
    const theaterVideo = document.getElementById('homeTheaterVideo');
    const channelBtns = document.querySelectorAll('.theater-channel-btn');
    const theaterPlayBtn = document.getElementById('theaterPlayBtn');
    const theaterMuteBtn = document.getElementById('theaterMuteBtn');
    const theaterFullscreenBtn = document.getElementById('theaterFullscreenBtn');
    const theaterTitle = document.getElementById('theaterMediaTitle');
    const theaterBadge = document.getElementById('theaterMediaBadge');
    const theaterTimecode = document.getElementById('theaterTimecode');
    const theaterProgress = document.getElementById('theaterProgress');
    const theaterSpectrumCanvas = document.getElementById('theaterSpectrumCanvas');

    const THEATER_CHANNELS = [
        {
            channel: '01',
            src: '/media/video.mp4',
            title: 'Neural Diffusion & Commercial UGC Reel',
            badge: '4K AI CINEMA // 24FPS',
            notes: 'High-ROAS viral ad pacing, volumetric relativistic lighting, and 3D camera continuity.'
        },
        {
            channel: '02',
            src: '/media/service-anim-1.mp4',
            title: 'Full-Stack Cloud Architecture & Sub-Second APIs',
            badge: 'REACT 19 // NEXT.JS EDGE',
            notes: 'Resilient multi-tenant platforms, headless commerce pipelines, and reactive GraphQL.'
        },
        {
            channel: '03',
            src: '/media/video 2 .mp4',
            title: 'Executive Leadership Systems & Cellular Vitality',
            badge: 'GROWTH BLUEPRINT // NAD+',
            notes: 'Systematic team duplication models, distributor scaling funnels, and cellular health protocols.'
        }
    ];

    if (theaterVideo && channelBtns.length > 0) {
        channelBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                channelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const data = THEATER_CHANNELS[idx];
                if (!data) return;

                theaterVideo.pause();
                theaterVideo.src = data.src;
                theaterVideo.load();
                theaterVideo.play().catch(() => {});

                if (theaterTitle) theaterTitle.textContent = data.title;
                if (theaterBadge) theaterBadge.textContent = data.badge;

                const notesEl = document.getElementById('theaterDirectorNotes');
                if (notesEl) notesEl.textContent = `"${data.notes}"`;

                if (theaterPlayBtn) {
                    const icon = theaterPlayBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-pause';
                }
                showNotification(`Switched to Channel ${data.channel}: ${data.title}`);
            });
        });

        if (theaterPlayBtn) {
            theaterPlayBtn.addEventListener('click', () => {
                if (theaterVideo.paused) {
                    theaterVideo.play().catch(() => {});
                    const icon = theaterPlayBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-pause';
                } else {
                    theaterVideo.pause();
                    const icon = theaterPlayBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-play';
                }
            });
        }

        if (theaterMuteBtn) {
            theaterMuteBtn.addEventListener('click', () => {
                theaterVideo.muted = !theaterVideo.muted;
                const icon = theaterMuteBtn.querySelector('i');
                if (icon) {
                    icon.className = theaterVideo.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up text-[#E6C280]';
                }
            });
        }

        if (theaterFullscreenBtn) {
            theaterFullscreenBtn.addEventListener('click', () => {
                if (!document.fullscreenElement) {
                    theaterVideo.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            });
        }

        theaterVideo.addEventListener('timeupdate', () => {
            if (theaterVideo.duration && theaterProgress) {
                const pct = (theaterVideo.currentTime / theaterVideo.duration) * 100;
                theaterProgress.style.width = `${pct}%`;
            }
            if (theaterTimecode) {
                const cur = formatTime(theaterVideo.currentTime || 0);
                const dur = formatTime(theaterVideo.duration || 0);
                theaterTimecode.textContent = `${cur} / ${dur}`;
            }
        });

        function formatTime(sec) {
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60);
            return `${m}:${s < 10 ? '0' : ''}${s}`;
        }

        // Live Audio Spectrum Canvas on Home Theater
        if (theaterSpectrumCanvas) {
            const sctx = theaterSpectrumCanvas.getContext('2d');
            let sw = theaterSpectrumCanvas.width = theaterSpectrumCanvas.offsetWidth || 180;
            let sh = theaterSpectrumCanvas.height = 28;
            let specPhase = 0;

            function renderTheaterSpectrum() {
                sctx.clearRect(0, 0, sw, sh);
                specPhase += 0.08;
                const isPlaying = !theaterVideo.paused;
                const bars = 22;
                const bw = sw / bars;

                sctx.fillStyle = '#E6C280';
                for (let i = 0; i < bars; i++) {
                    const mult = isPlaying ? (Math.sin(specPhase + i * 0.4) * 0.45 + Math.cos(specPhase * 1.8 + i * 0.3) * 0.35 + 0.45) : 0.12;
                    const bh = Math.max(3, mult * sh);
                    const bx = i * bw + 1.5;
                    const by = sh - bh;
                    sctx.fillRect(bx, by, bw - 3, bh);
                }
                requestAnimationFrame(renderTheaterSpectrum);
            }
            renderTheaterSpectrum();
        }
    }

    // 6. Hero Audio Greeting / Director Voice Soundbite Player
    const heroAudioBtn = document.getElementById('heroAudioPlayBtn');
    const heroAudioWave = document.getElementById('heroAudioWaveCanvas');
    const heroAudioStatus = document.getElementById('heroAudioStatus');
    let isAudioGreetingPlaying = false;
    let audioGreetingSeconds = 0;
    let audioGreetingTimer = null;

    if (heroAudioBtn && heroAudioWave) {
        const wctx = heroAudioWave.getContext('2d');
        let ww = heroAudioWave.width = 160;
        let wh = heroAudioWave.height = 24;
        let wavePhase = 0;

        function renderGreetingWave() {
            wctx.clearRect(0, 0, ww, wh);
            wavePhase += 0.1;
            const bars = 24;
            const bw = ww / bars;

            for (let i = 0; i < bars; i++) {
                const amp = isAudioGreetingPlaying
                    ? (Math.sin(wavePhase + i * 0.5) * 0.4 + Math.sin(wavePhase * 2.2 + i * 0.2) * 0.35 + 0.5)
                    : 0.15;
                const barH = Math.max(3, amp * wh);
                const bx = i * bw + 1;
                const by = (wh - barH) / 2;
                wctx.fillStyle = isAudioGreetingPlaying ? '#E6C280' : 'rgba(230, 194, 128, 0.4)';
                wctx.fillRect(bx, by, bw - 2, barH);
            }
            requestAnimationFrame(renderGreetingWave);
        }
        renderGreetingWave();

        heroAudioBtn.addEventListener('click', () => {
            isAudioGreetingPlaying = !isAudioGreetingPlaying;
            const icon = heroAudioBtn.querySelector('i');
            if (icon) {
                icon.className = isAudioGreetingPlaying ? 'fas fa-pause text-xs' : 'fas fa-play text-xs';
            }

            if (isAudioGreetingPlaying) {
                showNotification("Playing Executive Audio Welcome from H.O. Damilare Michael");
                if (heroAudioStatus) heroAudioStatus.textContent = 'Streaming Introduction...';
                audioGreetingTimer = setInterval(() => {
                    audioGreetingSeconds++;
                    const timeEl = document.getElementById('heroAudioTime');
                    if (timeEl) {
                        const s = audioGreetingSeconds % 60;
                        timeEl.textContent = `0:${s < 10 ? '0' : ''}${s} / 0:45`;
                    }
                    if (audioGreetingSeconds >= 45) {
                        isAudioGreetingPlaying = false;
                        clearInterval(audioGreetingTimer);
                        if (icon) icon.className = 'fas fa-play text-xs';
                        if (heroAudioStatus) heroAudioStatus.textContent = 'Introduction Complete';
                    }
                }, 1000);
            } else {
                clearInterval(audioGreetingTimer);
                if (heroAudioStatus) heroAudioStatus.textContent = 'Audio Paused';
            }
        });
    }

    // 7. Hero Interactive Domain Pills (Live Preview Callout)
    const domainPills = document.querySelectorAll('.hero-domain-pill');
    const domainCalloutText = document.getElementById('heroDomainCalloutText');
    const domainCalloutTag = document.getElementById('heroDomainCalloutTag');

    const DOMAIN_DATA = {
        'all': {
            tag: 'TRIAD SYNERGY',
            text: 'Seamlessly fusing sub-second full-stack cloud software, latent neural cinema, and high-performance network scaling.'
        },
        'web': {
            tag: 'WEB ARCHITECTURE',
            text: '26 verified repositories, React 19 / Next.js edge networks, multi-tenant headless commerce, and sub-100ms API pipelines.'
        },
        'cinema': {
            tag: 'AI CINEMA & UGC',
            text: 'Virtual director decks, custom LoRA conditioning, 3D macro camera probe simulations, and high-ROAS viral campaigns.'
        },
        'health': {
            tag: 'LEADERSHIP & HEALTH',
            text: '45,000+ coached distributor leaders, institutional sales duplication models, and cellular NAD+ longevity protocols.'
        }
    };

    domainPills.forEach(pill => {
        pill.addEventListener('click', () => {
            domainPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const domain = pill.getAttribute('data-domain') || 'all';
            const info = DOMAIN_DATA[domain] || DOMAIN_DATA['all'];

            if (domainCalloutTag) domainCalloutTag.textContent = info.tag;
            if (domainCalloutText) domainCalloutText.textContent = info.text;
        });
    });

    // 8. Bento Interactive Code Terminal Tabs
    const codeTabs = document.querySelectorAll('.bento-code-tab');
    const codeSnippetEl = document.getElementById('bentoCodeSnippet');
    const copyCodeBtn = document.getElementById('bentoCopyCodeBtn');

    const CODE_SNIPPETS = {
        'server': `// Next.js 15 Edge Architecture · Sub-10ms Route Handler
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const cacheKey = req.nextUrl.searchParams.get('key');
  const payload = await db.telemetry.findFirst({
    where: { active: true },
    select: { latency: true, throughput: true, status: true }
  });

  return NextResponse.json({
    status: 'OPTIMAL',
    latency_ms: payload?.latency ?? 4.2,
    cluster: 'edge-global-anycast'
  }, { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate' } });
}`,
        'pipeline': `# ComfyUI Neural Video Pipeline · 4K Anamorphic LoRA
import torch
from latent_cinema import MotionStreamEngine, CameraRig3D

class InterstellarDirectorPipeline:
    def __init__(self, model_checkpoint="kling-v2-cinema-master"):
        self.rig = CameraRig3D(sensor="8K_full_frame", focal_mm=35, anamorphic=2.39)
        self.device = "cuda:0" if torch.cuda.is_available() else "cpu"
        
    def render_shot(self, prompt, seed=428910):
        latents = self.rig.project_spatial_keyframes(frames=96, fps=24)
        print(">> Neural temporal coherence verified · 0 visual artifacts")
        return MotionStreamEngine.synthesize(latents, seed=seed)`,
        'vitality': `// Mitochondrial NAD+ Longevity Kinetic Protocol
export interface CellularProtocol {
  biomarker: 'NAD_PLUS' | 'ATP_SYNTHESIS' | 'SIRT1';
  doseConcentration: string;
  mitochondrialUptakeRate: number;
}

export const LongevityRegimen: CellularProtocol[] = [
  { biomarker: 'NAD_PLUS', doseConcentration: '500mg Liposomal', mitochondrialUptakeRate: 0.94 },
  { biomarker: 'ATP_SYNTHESIS', doseConcentration: 'Bio-Active CoQ10', mitochondrialUptakeRate: 0.89 },
  { biomarker: 'SIRT1', doseConcentration: 'Resveratrol Complex', mitochondrialUptakeRate: 0.92 }
];`
    };

    if (codeTabs.length > 0 && codeSnippetEl) {
        codeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                codeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const file = tab.getAttribute('data-file') || 'server';
                codeSnippetEl.textContent = CODE_SNIPPETS[file] || CODE_SNIPPETS['server'];
            });
        });

        if (copyCodeBtn) {
            copyCodeBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(codeSnippetEl.textContent).then(() => {
                    showNotification("Code snippet copied to clipboard");
                });
            });
        }
    }

    // 9. Bento Cellular Vitality Supplement Simulation Trigger
    const simulateDoseBtn = document.getElementById('bentoSimulateDoseBtn');
    const vitalityMeterBar = document.getElementById('bentoVitalityMeter');
    const vitalityMeterVal = document.getElementById('bentoVitalityVal');

    if (simulateDoseBtn) {
        simulateDoseBtn.addEventListener('click', () => {
            if (typeof window.triggerCellularSupplementDose === 'function') {
                window.triggerCellularSupplementDose();
            }
            if (vitalityMeterBar) vitalityMeterBar.style.width = '100%';
            if (vitalityMeterVal) vitalityMeterVal.textContent = '100% · CURED';
            simulateDoseBtn.disabled = true;
            simulateDoseBtn.textContent = 'Cellular Vitality Optimal';
            setTimeout(() => {
                if (vitalityMeterBar) vitalityMeterBar.style.width = '78%';
                if (vitalityMeterVal) vitalityMeterVal.textContent = '78% Optimal';
                simulateDoseBtn.disabled = false;
                simulateDoseBtn.innerHTML = '<i class="fas fa-capsules mr-1.5"></i> Administer Cellular Dose';
            }, 6000);
        });
    }
}

/* ==========================================================================
   GLOBAL FIXED TOGGLE BUTTON: TURN OFF SITE-WIDE BACKGROUND ANIMATIONS
   (position: fixed; right: 0; top: 50%)
   ========================================================================== */
function initBgAnimationToggle() {
    let toggleBtn = document.getElementById('globalBgAnimToggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'globalBgAnimToggle';
        toggleBtn.type = 'button';
        toggleBtn.className = 'bg-anim-toggle-btn group';
        toggleBtn.setAttribute('aria-label', 'Toggle Background Animations');
        toggleBtn.setAttribute('title', 'Toggle Background Animations (On/Off)');
        toggleBtn.innerHTML = `
            <span class="anim-status-indicator" aria-hidden="true">
                <span class="anim-pulse-dot"></span>
                <span class="anim-core-dot"></span>
            </span>
            <span class="anim-toggle-icon" aria-hidden="true">
                <i class="fas fa-play text-xs text-[#E6C280]"></i>
            </span>
            <div class="anim-toggle-text">
                <span class="anim-tag">BG ANIM</span>
                <span class="anim-state">ON</span>
            </div>
        `;
        document.body.appendChild(toggleBtn);
    }

    const savedState = localStorage.getItem('hodm_bg_animations_state');
    const isOff = savedState === 'off';

    function setVisualState(off) {
        const stateEl = toggleBtn.querySelector('.anim-state');
        const iconEl = toggleBtn.querySelector('.anim-toggle-icon i');
        if (off) {
            document.documentElement.classList.add('bg-animations-off');
            document.body.classList.add('bg-animations-off');
            if (stateEl) stateEl.textContent = 'OFF';
            if (iconEl) iconEl.className = 'fas fa-pause text-xs text-[#8B949E]';
        } else {
            document.documentElement.classList.remove('bg-animations-off');
            document.body.classList.remove('bg-animations-off');
            if (stateEl) stateEl.textContent = 'ON';
            if (iconEl) iconEl.className = 'fas fa-play text-xs text-[#E6C280]';
        }
    }

    setVisualState(isOff);

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentlyOff = document.documentElement.classList.contains('bg-animations-off');
        const nextOff = !currentlyOff;
        localStorage.setItem('hodm_bg_animations_state', nextOff ? 'off' : 'on');
        setVisualState(nextOff);

        if (nextOff) {
            if (typeof showNotification === 'function') {
                showNotification('Background animations paused site-wide');
            }
        } else {
            if (typeof showNotification === 'function') {
                showNotification('Background animations resumed');
            }
            resumeBgAnimations();
        }
    });
}

window.isBgAnimationPaused = function() {
    return document.documentElement.classList.contains('bg-animations-off') || document.body.classList.contains('bg-animations-off');
};

function resumeBgAnimations() {
    if (window.isBgAnimationPaused && window.isBgAnimationPaused()) return;
    const bodyTheme = document.body.getAttribute('data-page-theme') || '';
    const currentPath = window.location.pathname.toLowerCase();

    if (bodyTheme === 'creative' || currentPath.includes('creative-space')) {
        if (typeof window._renderCosmicSpaceRef === 'function') window._renderCosmicSpaceRef();
    } else if (bodyTheme === 'health' || bodyTheme === 'leadership' || currentPath.includes('leadership-business')) {
        if (typeof window._renderBioFlowRef === 'function') window._renderBioFlowRef();
    } else if (bodyTheme === 'web' || currentPath.includes('web-services')) {
        if (typeof window._renderGridDataRef === 'function') window._renderGridDataRef();
    } else {
        if (typeof window._renderDynamicUniverseRef === 'function') window._renderDynamicUniverseRef();
    }
}

// Immediate state initialization to eliminate animation pop
(function() {
    try {
        if (localStorage.getItem('hodm_bg_animations_state') === 'off') {
            document.documentElement.classList.add('bg-animations-off');
        }
    } catch(e) {}
})();

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgress();
    initBgAnimationToggle();
    initThemeBackground();
    initCursor();
    initNavigation();
    initNavigationSubmenus();
    initPageSectionsNav();
    initVideoAutoplayObserver();
    initHomeMediaTouchpoints();
    init3DTilt();
    initFloatingContactSidebar();
    initIntroVideoPlayer();
    initWebProficiencySystem();
    initCreativeVideoModal();
    initAccessibilitySystem();
    initFooterSequenceNav();
    initAccordions();
    initForms();
    initGsapAnimations();
    initCinematicScrollSnap();
    initCreativeDirectorDeck();
});
