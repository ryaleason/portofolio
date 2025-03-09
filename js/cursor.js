document.addEventListener('DOMContentLoaded', function () {
    const cursorEffect = document.getElementById('cursor-effect');

    // Warna-warna untuk percikan
    const colors = [
        '#FF5757', '#FFD358', '#57C7FF', '#7B68EE', '#6ECB63',
        '#FF79C6', '#8BE9FD', '#F1FA8C', '#BD93F9'
    ];

    function createSparkle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';

        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;

        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${color}`;

        // Animasi lebih lama (1 - 1.5 detik)
        const duration = Math.random() * 0.5 + 1;
        particle.style.animation = `particle-animation ${duration}s ease-out forwards`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    let lastX = 0;
    let lastY = 0;
    let timeoutId;

    document.addEventListener('mousemove', function (e) {
        cursorEffect.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorEffect.classList.remove('hidden');

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 5) {
            const numParticles = Math.min(Math.floor(distance / 10), 3) + 1;
            for (let i = 0; i < numParticles; i++) {
                createSparkle(e.clientX, e.clientY);
            }
        }

        lastX = e.clientX;
        lastY = e.clientY;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            cursorEffect.classList.add('hidden');
        }, 3000);
    });

    document.addEventListener('mouseout', function () {
        cursorEffect.classList.add('hidden');
    });
});
