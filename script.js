const cursor = document.querySelector('.cursor');
const cards = document.querySelectorAll('.card');

// 1. Precise Cursor Tracking
document.addEventListener('mousemove', (e) => {
    // 使用 requestAnimationFrame 或直接更新位置
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. 3D Tilt & Interaction (3D 倾斜与交互)
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // 旋转系数：数值越小，旋转幅度越大
        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        
        // 鼠标跟随球变大
        cursor.style.transform = 'scale(6)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        cursor.style.transform = 'scale(1)';
    });
});

// 3. Navigation
function navigate(dest) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed; inset: 0; background: white; z-index: 9999;
        opacity: 0; transition: opacity 0.5s ease;
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => overlay.style.opacity = '1', 10);
    setTimeout(() => window.location.href = dest + ".html", 500);
}