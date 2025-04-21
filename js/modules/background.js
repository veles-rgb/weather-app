function createCloud() {
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
        setTimeout(createCloud, Math.random() * 3000); // 0–3 sec gap
    });
}

// Exports
export { createCloud };