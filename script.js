// Initialize Supabase client
const supabaseUrl = 'https://jjklixscjiimqghragfk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqa2xpeHNjamlpbXFnaHJhZ2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2OTU3NDIsImV4cCI6MjA3MjI3MTc0Mn0.gCh1dkgQjddF1b_ezFc3YJ5XEygXrrrYZsYFAsylJrc'
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey)

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
    
    // Initialize visitor counter functionality
    initVisitorCounter();
});

// Visitor counter functions
async function initVisitorCounter() {
    await loadVisitorCount();
    await loadRecentVisitors();
    setupVisitorButton();
}

async function loadVisitorCount() {
    try {
        const { data, error } = await supabase
            .from('visitors')
            .select('*');
        
        if (error) {
            console.error('Error loading visitor count:', error);
            document.getElementById('visitorCount').textContent = 'Error loading';
            return;
        }
        
        const count = data ? data.length : 0;
        document.getElementById('visitorCount').textContent = count;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('visitorCount').textContent = 'Error';
    }
}

async function loadRecentVisitors() {
    try {
        const { data, error } = await supabase
            .from('visitors')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
        
        if (error) {
            console.error('Error loading recent visitors:', error);
            document.getElementById('visitorsList').innerHTML = '<li>Error loading visitors</li>';
            return;
        }
        
        const visitorsList = document.getElementById('visitorsList');
        if (data && data.length > 0) {
            visitorsList.innerHTML = data.map(visitor => {
                const date = new Date(visitor.created_at).toLocaleString();
                return `<li>Visitor from ${visitor.location || 'Unknown'} - ${date}</li>`;
            }).join('');
        } else {
            visitorsList.innerHTML = '<li>No visitors yet - be the first!</li>';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('visitorsList').innerHTML = '<li>Error loading visitors</li>';
    }
}

async function addVisitor() {
    try {
        // Get user's approximate location (you can enhance this with a geolocation API)
        const location = 'Web Visitor';
        
        const { data, error } = await supabase
            .from('visitors')
            .insert([
                { location: location }
            ]);
        
        if (error) {
            console.error('Error adding visitor:', error);
            alert('Error adding visitor: ' + error.message);
            return;
        }
        
        // Refresh the display
        await loadVisitorCount();
        await loadRecentVisitors();
        
        // Show success message
        const btn = document.getElementById('incrementBtn');
        const originalText = btn.textContent;
        btn.textContent = 'Thanks for visiting! 🎉';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding visitor');
    }
}

function setupVisitorButton() {
    const incrementBtn = document.getElementById('incrementBtn');
    incrementBtn.addEventListener('click', addVisitor);
}