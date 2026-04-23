// animations.js

// ClickSpark implementation
function initClickSpark(options = {}) {
    const sparkColor = options.sparkColor || '#C9943A';
    const sparkSize = options.sparkSize || 10;
    const sparkRadius = options.sparkRadius || 15;
    const sparkCount = options.sparkCount || 8;
    const duration = options.duration || 400;
    const easing = options.easing || 'ease-out';
    const extraScale = options.extraScale || 1.0;

    const easeFunc = (t) => {
        switch (easing) {
            case 'linear': return t;
            case 'ease-in': return t * t;
            case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default: return t * (2 - t);
        }
    };

    const container = document.body;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999'; // On top of everything
    
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    let sparks = [];
    let animationId = null;
    
    const resizeCanvas = () => {
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = (timestamp) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeSparks = false;
        
        sparks = sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= duration) return false;
            
            activeSparks = true;
            const progress = elapsed / duration;
            const eased = easeFunc(progress);
            const distance = eased * sparkRadius * extraScale;
            const lineLength = sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            ctx.strokeStyle = sparkColor;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            return true;
        });
        
        if (activeSparks) {
            animationId = requestAnimationFrame(draw);
        } else {
            animationId = null;
        }
    };

    document.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const now = performance.now();
        
        for (let i = 0; i < sparkCount; i++) {
            sparks.push({
                x, y,
                angle: (2 * Math.PI * i) / sparkCount,
                startTime: now
            });
        }
        if (!animationId) {
            animationId = requestAnimationFrame(draw);
        }
    });
}

// GradualBlur implementation
// GradualBlur implementation
function applyGradualBlur(containerSelector, preset = 'subtle', customOptions = {}) {
    const PRESETS = {
        top: { position: 'top', height: '6rem' },
        bottom: { position: 'bottom', height: '6rem' },
        left: { position: 'left', height: '6rem' },
        right: { position: 'right', height: '6rem' },
        subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
        intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
        smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
        sharp: { height: '5rem', curve: 'linear', divCount: 4 },
        header: { position: 'top', height: '8rem', curve: 'ease-out' },
        footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
        sidebar: { position: 'left', height: '6rem', strength: 2.5 },
        'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
        'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
    };

    const DEFAULT_CONFIG = {
        position: 'bottom',
        strength: 2,
        height: '6rem',
        divCount: 5,
        exponential: false,
        zIndex: 1000,
        animated: false,
        duration: '0.3s',
        easing: 'ease-out',
        opacity: 1,
        curve: 'linear',
        responsive: false,
        target: 'parent',
        className: '',
        style: {}
    };

    const config = Object.assign({}, DEFAULT_CONFIG, PRESETS[preset] || {}, customOptions);

    const CURVE_FUNCTIONS = {
        linear: p => p,
        bezier: p => p * p * (3 - 2 * p),
        'ease-in': p => p * p,
        'ease-out': p => 1 - Math.pow(1 - p, 2),
        'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
    };
    
    const getGradientDirection = position => ({
        top: 'to top',
        bottom: 'to bottom',
        left: 'to left',
        right: 'to right'
    })[position] || 'to bottom';

    const containers = containerSelector ? document.querySelectorAll(containerSelector) : [document.body];

    containers.forEach(container => {
        const blurContainer = document.createElement('div');
        let baseClass = `gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className}`;
        blurContainer.className = baseClass.trim();
        
        const isVertical = ['top', 'bottom'].includes(config.position);
        const isHorizontal = ['left', 'right'].includes(config.position);
        const isPageTarget = config.target === 'page';
        
        // Base styles
        blurContainer.style.position = isPageTarget ? 'fixed' : 'absolute';
        blurContainer.style.pointerEvents = config.hoverIntensity ? 'auto' : 'none';
        blurContainer.style.opacity = '1';
        if (config.animated) {
            blurContainer.style.transition = `opacity ${config.duration} ${config.easing}`;
        }
        blurContainer.style.zIndex = isPageTarget ? config.zIndex + 100 : config.zIndex;
        
        // Apply custom styles from config
        Object.assign(blurContainer.style, config.style);
        
        if (isVertical) {
            blurContainer.style.height = config.height; // We skip responsive recalculation logic for pure vanilla simplicity here
            blurContainer.style.width = config.width || '100%';
            blurContainer.style[config.position] = '0';
            blurContainer.style.left = '0';
            blurContainer.style.right = '0';
        } else if (isHorizontal) {
            blurContainer.style.width = config.width || config.height;
            blurContainer.style.height = '100%';
            blurContainer.style[config.position] = '0';
            blurContainer.style.top = '0';
            blurContainer.style.bottom = '0';
        }

        const inner = document.createElement('div');
        inner.className = 'gradual-blur-inner';
        blurContainer.appendChild(inner);

        const currentStrength = config.strength; // Base strength
        const increment = 100 / config.divCount;
        const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

        const updateBlurDivs = (strengthMultiplier = 1) => {
            inner.innerHTML = '';
            const activeStrength = currentStrength * strengthMultiplier;
            for (let i = 1; i <= config.divCount; i++) {
                let progress = i / config.divCount;
                progress = curveFunc(progress);
                
                let blurValue;
                if (config.exponential) {
                    blurValue = Math.pow(2, progress * 4) * 0.0625 * activeStrength;
                } else {
                    blurValue = 0.0625 * (progress * config.divCount + 1) * activeStrength;
                }

                const p1 = Math.round((increment * i - increment) * 10) / 10;
                const p2 = Math.round((increment * i) * 10) / 10;
                const p3 = Math.round((increment * i + increment) * 10) / 10;
                const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

                let gradient = `transparent ${p1}%, black ${p2}%`;
                if (p3 <= 100) gradient += `, black ${p3}%`;
                if (p4 <= 100) gradient += `, transparent ${p4}%`;

                const direction = getGradientDirection(config.position);

                const div = document.createElement('div');
                div.style.position = 'absolute';
                div.style.inset = '0';
                
                div.style.setProperty('-webkit-mask-image', `linear-gradient(${direction}, ${gradient})`);
                div.style.setProperty('mask-image', `linear-gradient(${direction}, ${gradient})`);
                
                // IMPORTANT: inline style overrides the CSS inherit rule
                div.style.setProperty('-webkit-backdrop-filter', `blur(${blurValue.toFixed(3)}rem)`);
                div.style.setProperty('backdrop-filter', `blur(${blurValue.toFixed(3)}rem)`);
                
                div.style.opacity = config.opacity;
                
                if (config.animated && config.animated !== 'scroll') {
                    div.style.transition = `backdrop-filter ${config.duration} ${config.easing}, -webkit-backdrop-filter ${config.duration} ${config.easing}`;
                }
                
                inner.appendChild(div);
            }
        };

        updateBlurDivs();

        if (config.hoverIntensity) {
            blurContainer.addEventListener('mouseenter', () => updateBlurDivs(config.hoverIntensity));
            blurContainer.addEventListener('mouseleave', () => updateBlurDivs(1));
        }

        if (!isPageTarget) {
            if (getComputedStyle(container).position === 'static') {
                container.style.position = 'relative';
            }
            container.style.overflow = 'hidden';
            container.appendChild(blurContainer);
        } else {
            document.body.appendChild(blurContainer);
        }

        // Scroll observer handling
        if (config.animated === 'scroll') {
            blurContainer.style.opacity = '0'; // hide initially
            const observer = new IntersectionObserver(([entry]) => {
                blurContainer.style.opacity = entry.isIntersecting ? '1' : '0';
                if (entry.isIntersecting && config.onAnimationComplete) {
                    setTimeout(() => config.onAnimationComplete(), parseFloat(config.duration) * 1000);
                }
            }, { threshold: 0.1 });
            observer.observe(blurContainer);
        }
    });

    // Inject styles once
    const styleId = 'gradual-blur-styles';
    if (!document.getElementById(styleId)) {
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = `
.gradual-blur-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.gradual-blur-inner > div {
  -webkit-backdrop-filter: inherit;
  backdrop-filter: inherit;
}

.gradual-blur {
  isolation: isolate;
}

@supports not (backdrop-filter: blur(1px)) {
  .gradual-blur-inner > div {
    background: rgba(0, 0, 0, 0.3);
    opacity: 0.5;
  }
}

.gradual-blur-fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
}
        `;
        document.head.appendChild(styleElement);
    }
}

if (!window._blurInitDone) {
    window._blurInitDone = true;
    document.addEventListener('DOMContentLoaded', () => {
        initClickSpark();
        applyGradualBlur('body', 'page-footer', {
            divCount: 16,
            strength: 0.9,
            curve: 'bezier',
            height: '2.5rem'
        });

        const setBlurOpacity = (val) => {
            document.querySelectorAll('.gradual-blur-page').forEach(el => {
                el.style.transition = 'opacity 0.3s ease';
                el.style.opacity = val;
            });
        };

        const updateBlurOpacity = () => {
            const scrolled = window.scrollY + window.innerHeight;
            const total = document.documentElement.scrollHeight;
            const fadeStart = total - 20;
            const fadeEnd = total + 90;
            if (scrolled >= fadeEnd) {
                setBlurOpacity('0');
            } else if (scrolled >= fadeStart) {
                const t = (scrolled - fadeStart) / (fadeEnd - fadeStart);
                setBlurOpacity(String(1 - t));
            } else {
                setBlurOpacity('1');
            }
        };

        window.addEventListener('scroll', updateBlurOpacity, { passive: true });
        updateBlurOpacity();
    });
}
