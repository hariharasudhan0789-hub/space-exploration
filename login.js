function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Demo credentials: hari / 123
    if (username === "hari" && password === "123") {
        // set a short-lived logged-in flag (demo only)
        try {
            localStorage.setItem('space_explorer_logged_in', 'true');
        } catch (e) {}

        // Optional friendly toast instead of alert
        showToast('Login successful! Redirecting...');

        // Redirect to main page after a short delay
        setTimeout(function() {
            window.location.href = 'main.html';
        }, 800);
        return true;
    } else {
        showToast('Invalid username or password', true);
        return false;
    }
}

function showToast(message, isError) {
    var toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.right = '20px';
    toast.style.top = '20px';
    toast.style.padding = '12px 18px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = 9999;
    toast.style.color = isError ? '#fff' : '#0a0e27';
    toast.style.background = isError ? 'rgba(255,0,110,0.9)' : 'rgba(0,212,255,0.95)';
    toast.style.fontWeight = '600';
    document.body.appendChild(toast);
    setTimeout(function() {
        toast.style.transition = 'opacity 0.4s ease';
        toast.style.opacity = '0';
        setTimeout(function(){ toast.remove(); }, 400);
    }, 2000);
}
