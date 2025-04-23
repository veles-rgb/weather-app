function partlyCloudy() {
    const sky = document.getElementById('sky');
    const cloudImages = [
        'https://pngimg.com/d/cloud_PNG112234.png',
        'https://www.freeiconspng.com/thumbs/rain-png/rain-clouds-png-27.png'
    ];

    const cloud = document.createElement('div');
    cloud.classList.add('cloud-partly');

    const image = cloudImages[Math.floor(Math.random() * cloudImages.length)];
    cloud.style.backgroundImage = `url('${image}')`;

    const width = Math.random() * 200 + 300;
    cloud.style.width = `${width}px`;
    cloud.style.height = `${width * 0.6}px`;
    cloud.style.top = `${Math.random() * 120}px`;
    cloud.style.left = `-${width}px`;

    const duration = Math.random() * 20 + 30;
    cloud.style.animationDuration = `${duration}s`;
    sky.appendChild(cloud);

    cloud.addEventListener('animationend', () => {
        sky.removeChild(cloud);
        setTimeout(partlyCloudy, Math.random() * 3000);
    });
}

function sun() {
    const clearSun = document.createElement("div");
    clearSun.classList.add("sun");

    const sky = document.getElementById('sky');
    sky.appendChild(clearSun);
}

function moon() {
    const clearMoon = document.createElement("div");
    clearMoon.classList.add("moon");

    const sky = document.getElementById('sky');
    sky.appendChild(clearMoon);
}

function cloudy(count = 12) {
    const sky = document.getElementById('sky');
    const cloudImages = [
        'https://pngimg.com/d/cloud_PNG112234.png',
        'https://www.freeiconspng.com/thumbs/rain-png/rain-clouds-png-27.png'
    ];

    const total = count + 2;

    for (let i = -1; i <= count; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud-cloudy');

        const img = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        cloud.style.backgroundImage = `url('${img}')`;

        const width = Math.random() * 200 + 600;
        cloud.style.width = `${width}px`;
        cloud.style.height = `${width * 0.6}px`;

        const spacing = 100 / (count - 1);
        const leftPercent = spacing * i;
        const wiggle = Math.random() * 1.5 - 0.75;

        cloud.style.left = `calc(${leftPercent}% + ${wiggle}vw)`;
        cloud.style.top = `${Math.random() * 40 - 150}px`;

        const delay = Math.random() * 3;
        cloud.style.animationDelay = `0s, ${delay}s`;

        sky.appendChild(cloud);
    }
}

function thunder() {
    const sky = document.getElementById('sky');

    let lightning = document.getElementById('lightning');
    if (!lightning) {
        lightning = document.createElement('div');
        lightning.id = 'lightning';
        lightning.classList.add('lightning');
        sky.appendChild(lightning);
    }

    function createBolt() {
        const clouds = [...document.querySelectorAll('.cloud-cloudy')];
        if (clouds.length === 0) return;

        const randomCloud = clouds[Math.floor(Math.random() * clouds.length)];
        const rect = randomCloud.getBoundingClientRect();

        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height - 40;

        const boltContainer = document.createElement('div');
        boltContainer.style.position = 'absolute';
        boltContainer.style.left = `${startX}px`;
        boltContainer.style.top = `${startY}px`;
        boltContainer.style.zIndex = '3';
        boltContainer.style.pointerEvents = 'none';

        const numSegments = Math.floor(Math.random() * 5) + 6;
        let currentX = 0;
        let currentY = 0;

        for (let i = 0; i < numSegments; i++) {
            const segment = document.createElement('div');
            segment.style.position = 'absolute';

            const dx = Math.random() * 20 - 10;
            const dy = Math.random() * 40 + 20;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            segment.style.width = `${length}px`;
            segment.style.height = `2px`;
            segment.style.background = 'linear-gradient(to right, #ffffff, #cc88ff)';
            segment.style.boxShadow = '0 0 8px #cc88ff, 0 0 12px #cc88ff';
            segment.style.opacity = '1';
            segment.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${angle}deg)`;
            segment.style.transformOrigin = 'left';

            boltContainer.appendChild(segment);
            currentX += dx;
            currentY += dy;
        }

        document.body.appendChild(boltContainer);

        setTimeout(() => {
            boltContainer.style.transition = 'opacity 0.4s ease-out';
            boltContainer.style.opacity = '0';
        }, 100);

        setTimeout(() => boltContainer.remove(), 600);
    }

    function flash() {
        lightning.classList.remove('lightning');
        void lightning.offsetWidth;
        lightning.classList.add('lightning');

        createBolt();

        const next = Math.random() * 13000 + 2000;
        setTimeout(flash, next);
    }

    setTimeout(flash, Math.random() * 3000);
}

function rain(rate = 15) {
    const sky = document.getElementById('sky');

    function spawnDrop() {
        const drop = document.createElement('div');
        drop.classList.add('rain-drop');

        const size = Math.random() * 8 + 8;
        const height = size * 3 + 20;

        drop.style.width = `${size}px`;
        drop.style.height = `${height}px`;
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.top = `-${Math.random() * 40}px`;
        drop.style.animationDuration = `${Math.random() * 1.5 + 2}s`;

        sky.appendChild(drop);
        drop.addEventListener('animationend', () => drop.remove());
    }

    setInterval(() => {
        for (let i = 0; i < rate; i++) spawnDrop();
    }, 250);
}

function snow(rate = 5) {
    const sky = document.getElementById('sky');

    function spawnFlake() {
        const flake = document.createElement('div');
        flake.classList.add('snow-flake');

        const size = Math.random() * 6 + 4;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.left = `${Math.random() * 100}vw`;

        const fallDuration = Math.random() * 5 + 8;
        const swayDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 4;

        flake.style.animationName = 'snowFallAnimation, snowSwayAnimation';
        flake.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
        flake.style.animationTimingFunction = 'linear, ease-in-out';
        flake.style.animationIterationCount = '1, infinite';
        flake.style.animationFillMode = 'forwards, none';

        setTimeout(() => {
            sky.appendChild(flake);
            flake.addEventListener('animationend', () => flake.remove());
        }, delay * 1000);
    }

    setInterval(() => {
        for (let i = 0; i < rate; i++) spawnFlake();
    }, 300);
}

function hail(rate = 10) {
    const sky = document.getElementById('sky');

    function spawnStone() {
        const hail = document.createElement('div');
        const size = Math.random() * 14 + 6;
        const left = Math.random() * 100;

        hail.classList.add('hail-stone');
        hail.style.width = `${size}px`;
        hail.style.height = `${size}px`;
        hail.style.left = `${left}vw`;

        const r1 = Math.floor(Math.random() * 40) + 30;
        const r2 = Math.floor(Math.random() * 40) + 30;
        const r3 = Math.floor(Math.random() * 40) + 30;
        const r4 = Math.floor(Math.random() * 40) + 30;
        hail.style.borderRadius = `${r1}% ${r2}% ${r3}% ${r4}%`;

        const landY = window.innerHeight - size - 8;
        const fallDuration = Math.random() * 0.6 + 0.7;
        const delay = Math.random() * 1.5;

        hail.style.top = '-10vh';

        const animationName = `hail-fall-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
          @keyframes ${animationName} {
            0% { top: -10vh; opacity: 0; }
            10% { opacity: 1; }
            100% { top: ${landY}px; opacity: 1; }
          }
        `;
        document.head.appendChild(styleTag);
        hail.style.animation = `${animationName} ${fallDuration}s linear forwards`;

        setTimeout(() => {
            sky.appendChild(hail);

            hail.addEventListener('animationend', () => {
                hail.style.animation = '';
                hail.style.top = `${landY}px`;
                hail.classList.add('hail-bouncing');
                hail.addEventListener('animationend', () => {
                    if (hail.parentNode) hail.remove();
                }, { once: true });
            }, { once: true });
        }, delay * 1000);
    }

    setInterval(() => {
        for (let i = 0; i < rate; i++) spawnStone();
    }, 300);
}

function fog(layerCount = 3) {
    const sky = document.getElementById('sky');

    for (let i = 0; i < layerCount; i++) {
        const fog = document.createElement('div');
        fog.classList.add('fog-strip');

        const offset = i * 50; // vertical offset per layer
        fog.style.top = `${offset}px`;

        const duration = Math.random() * 20 + 60; // 60–80s
        const speed = 0.02 + Math.random() * 0.01;

        let x = -100; // Start at -100vw (off left)

        function drift() {
            x += speed;
            if (x >= 0) x = -100;
            fog.style.transform = `translateX(${x}vw)`;
            requestAnimationFrame(drift);
        }

        sky.appendChild(fog);
        drift();
    }
}

function wind() {
    const sky = document.getElementById('sky');

    function spawnLeaf() {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.textContent = '🍁';

        leaf.style.top = `${Math.random() * 100}vh`;
        const scale = Math.random() * 0.5 + 0.7;
        leaf.style.transform = `scale(${scale})`;

        const id = `windyLeaf-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const path1 = Math.random() * 40 - 20;
        const path2 = Math.random() * 40 - 20;
        const path3 = Math.random() * 40 - 20;

        const style = document.createElement('style');
        style.innerHTML = `
        @keyframes ${id} {
          0% {
            transform: translateX(-10vw) translateY(0vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: translateX(25vw) translateY(${path1}vh) rotate(45deg);
          }
          50% {
            transform: translateX(50vw) translateY(${path2}vh) rotate(-30deg);
          }
          75% {
            transform: translateX(75vw) translateY(${path3}vh) rotate(60deg);
          }
          100% {
            transform: translateX(110vw) translateY(0vh) rotate(90deg);
            opacity: 0.5;
          }
        }
      `;
        document.head.appendChild(style);

        const duration = Math.random() * 4 + 5;
        leaf.style.animation = `${id} ${duration}s ease-in-out forwards`;

        sky.appendChild(leaf);

        leaf.addEventListener('animationend', () => {
            leaf.remove();
            style.remove();
        });
    }

    function gustLoop() {
        const delay = Math.random() * 4000 + 1000; // 1–5s
        const leafCount = Math.floor(Math.random() * 4) + 1; // 1–4 leaves

        for (let i = 0; i < leafCount; i++) {
            const leafDelay = Math.random() * 800;
            setTimeout(spawnLeaf, leafDelay);
        }

        setTimeout(gustLoop, delay);
    }

    gustLoop(); // start it
}

export { partlyCloudy, sun, moon, cloudy, thunder, rain, snow, hail, fog, wind };
