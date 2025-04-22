function partlyCloudy() {
    const sky = document.getElementById('sky');
    const cloudImages = [
        'https://pngimg.com/d/cloud_PNG112234.png',
        'https://www.freeiconspng.com/thumbs/rain-png/rain-clouds-png-27.png'
    ];

    const cloud = document.createElement('div');
    cloud.classList.add('cloud');

    // Random image
    const image = cloudImages[Math.floor(Math.random() * cloudImages.length)];
    cloud.style.backgroundImage = `url('${image}')`;

    // Random size
    const width = Math.random() * 200 + 300; // 300–500px
    cloud.style.width = `${width}px`;
    cloud.style.height = `${width * 0.6}px`;

    // Random height near top
    cloud.style.top = `${Math.random() * 120}px`; // varies from 0 to 120px
    cloud.style.left = `-${width}px`;

    // Random speed
    const duration = Math.random() * 20 + 30; // 30–50s
    cloud.style.animationDuration = `${duration}s`;
    sky.appendChild(cloud);

    // When animation ends, remove and spawn another cloud to keep it looping
    cloud.addEventListener('animationend', () => {
        sky.removeChild(cloud);
        // Recursively spawn next one after short random delay
        setTimeout(partlyCloudy, Math.random() * 3000); // 0–3 sec gap
    });
}

function clearDay() {
    const clearSun = document.createElement("div");
    clearSun.classList.add("sun");

    const sky = document.getElementById('sky');
    sky.appendChild(clearSun);
}

function clearNight() {
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

    const total = count + 2; // 1 extra cloud before and after

    for (let i = -1; i <= count; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloudy-cloud');

        const img = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        cloud.style.backgroundImage = `url('${img}')`;

        const width = Math.random() * 200 + 600;
        cloud.style.width = `${width}px`;
        cloud.style.height = `${width * 0.6}px`;

        const spacing = 100 / (count - 1);
        const leftPercent = spacing * i;
        const wiggle = Math.random() * 1.5 - 0.75;

        cloud.style.left = `calc(${leftPercent}% + ${wiggle}vw)`;
        cloud.style.top = `${Math.random() * 40 - 150}px`; // between -60px and -20px

        const delay = Math.random() * 3;
        cloud.style.animationDelay = `0s, ${delay}s`;

        sky.appendChild(cloud);
    }
}

// Exports
export { partlyCloudy, clearDay, clearNight, cloudy };