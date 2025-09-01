// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const clickBtn = document.getElementById('clickBtn');
    let clickCount = 0;
    
    // Array of messages to cycle through
    const messages = [
        'Great job! 🎉',
        'You clicked me again! 😄',
        'JavaScript is working! ⚡',
        'Keep clicking! 🚀',
        'You\'re awesome! ⭐',
        'One more time! 🎯'
    ];
    
    // Array of colors for the button
    const colors = [
        'linear-gradient(45deg, #667eea, #764ba2)',
        'linear-gradient(45deg, #f093fb, #f5576c)',
        'linear-gradient(45deg, #4facfe, #00f2fe)',
        'linear-gradient(45deg, #43e97b, #38f9d7)',
        'linear-gradient(45deg, #fa709a, #fee140)',
        'linear-gradient(45deg, #a8edea, #fed6e3)'
    ];
    
    clickBtn.addEventListener('click', function() {
        clickCount++;
        
        // Change button text
        const messageIndex = (clickCount - 1) % messages.length;
        clickBtn.textContent = messages[messageIndex];
        
        // Change button color
        const colorIndex = (clickCount - 1) % colors.length;
        clickBtn.style.background = colors[colorIndex];
        
        // Add some animation
        clickBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Show click count after 5 clicks
        if (clickCount >= 5) {
            clickBtn.textContent = `Clicked ${clickCount} times! 🎊`;
        }
        
        // Special message for persistent clickers
        if (clickCount === 10) {
            alert('Wow! You really like clicking buttons! 🎉');
        }
    });
    
    // Add smooth scrolling for any future anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add a simple fade-in animation when page loads
    const main = document.querySelector('main');
    main.style.opacity = '0';
    main.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        main.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
    }, 100);
});