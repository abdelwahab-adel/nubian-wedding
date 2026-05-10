// ════════════════════════════════════════════════════════════════
// RANDOM JOKE GENERATOR - External API Integration
// Using JokeAPI v2: https://jokeapi.dev
// ════════════════════════════════════════════════════════════════

const API_BASE_URL = 'https://v2.jokeapi.dev/joke';
const REQUEST_TIMEOUT = 10000; // 10 seconds
const COOLDOWN_TIME = 1000; // 1 second between requests

let isLoading = false;
let lastRequestTime = 0;
let currentJoke = {
    setup: '',
    delivery: '',
    joke: ''
};

// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const newJokeBtn = document.getElementById('newJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const jokeDisplay = document.getElementById('jokeDisplay');
const jokeText = document.getElementById('jokeText');
const punchline = document.getElementById('punchline');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const jokeCountDisplay = document.getElementById('jokeCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadJokeCount();
    getNewJoke();
    setupEventListeners();
});

// ════════════════════════════════════════════════════════════════
// EVENT LISTENERS
// ════════════════════════════════════════════════════════════════

function setupEventListeners() {
    newJokeBtn.addEventListener('click', getNewJoke);
    copyBtn.addEventListener('click', copyJokeToClipboard);
    shareBtn.addEventListener('click', shareJoke);
    categorySelect.addEventListener('change', getNewJoke);

    // Keyboard shortcut: Ctrl+Enter or Cmd+Enter for new joke
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            getNewJoke();
        }
    });
}

// ════════════════════════════════════════════════════════════════
// FETCH JOKE FROM API
// ════════════════════════════════════════════════════════════════

async function getNewJoke() {
    // Prevent rapid clicks
    const now = Date.now();
    if (now - lastRequestTime < COOLDOWN_TIME) {
        return;
    }
    lastRequestTime = now;

    if (isLoading) return;

    isLoading = true;
    newJokeBtn.disabled = true;
    loading.classList.add('active');
    errorMessage.classList.remove('active');
    jokeDisplay.style.opacity = '0.5';

    try {
        const category = categorySelect.value;
        const joke = await fetchJokeWithTimeout(category);
        
        if (joke) {
            currentJoke = joke;
            displayJoke(joke);
            incrementJokeCount();
        }
    } catch (error) {
        showError(error.message);
    } finally {
        isLoading = false;
        newJokeBtn.disabled = false;
        loading.classList.remove('active');
        jokeDisplay.style.opacity = '1';
    }
}

// ════════════════════════════════════════════════════════════════
// FETCH WITH TIMEOUT
// ════════════════════════════════════════════════════════════════

async function fetchJokeWithTimeout(category) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const url = `${API_BASE_URL}/${category}?safe-mode=true`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
            throw new Error(`خطأ في الاتصال: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error('لم نتمكن من الحصول على نكتة الآن');
        }

        return {
            setup: data.setup || '',
            delivery: data.delivery || '',
            joke: data.joke || ''
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('انتهت مهلة الانتظار - يرجى المحاولة مرة أخرى');
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}

// ════════════════════════════════════════════════════════════════
// DISPLAY JOKE
// ════════════════════════════════════════════════════════════════

function displayJoke(joke) {
    // Clear previous content
    jokeText.textContent = '';
    punchline.textContent = '';
    punchline.style.display = 'none';

    // Two-part joke (setup + delivery)
    if (joke.setup && joke.delivery) {
        jokeText.textContent = escapeHtml(joke.setup);
        punchline.textContent = escapeHtml(joke.delivery);
        punchline.style.display = 'block';
    }
    // Single-line joke
    else if (joke.joke) {
        jokeText.textContent = escapeHtml(joke.joke);
    }
}

// ════════════════════════════════════════════════════════════════
// COPY TO CLIPBOARD
// ════════════════════════════════════════════════════════════════

async function copyJokeToClipboard() {
    let jokeText = '';

    if (currentJoke.setup && currentJoke.delivery) {
        jokeText = `${currentJoke.setup}\n${currentJoke.delivery}`;
    } else if (currentJoke.joke) {
        jokeText = currentJoke.joke;
    }

    if (!jokeText) {
        showError('لا توجد نكتة لنسخها');
        return;
    }

    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(jokeText);
            showSuccess('تم نسخ النكتة! 📋');
        } else {
            // Fallback for older browsers
            fallbackCopyToClipboard(jokeText);
        }
    } catch (error) {
        showError('فشل نسخ النكتة');
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showSuccess('تم نسخ النكتة! 📋');
    } catch (error) {
        showError('فشل نسخ النكتة');
    }
    
    document.body.removeChild(textArea);
}

// ════════════════════════════════════════════════════════════════
// SHARE JOKE
// ════════════════════════════════════════════════════════════════

async function shareJoke() {
    let jokeText = '';

    if (currentJoke.setup && currentJoke.delivery) {
        jokeText = `${currentJoke.setup}\n${currentJoke.delivery}`;
    } else if (currentJoke.joke) {
        jokeText = currentJoke.joke;
    }

    if (!jokeText) {
        showError('لا توجد نكتة لمشاركتها');
        return;
    }

    // Web Share API
    if (navigator.share) {
        try {
            await navigator.share({
                title: '😂 نكتة عشوائية',
                text: jokeText,
                url: window.location.href
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                showError('فشل في المشاركة');
            }
        }
    } else {
        // Fallback: Copy to clipboard
        copyJokeToClipboard();
    }
}

// ════════════════════════════════════════════════════════════════
// STATS MANAGEMENT
// ════════════════════════════════════════════════════════════════

function incrementJokeCount() {
    let count = parseInt(localStorage.getItem('jokeCount') || '0');
    count++;
    localStorage.setItem('jokeCount', count);
    jokeCountDisplay.textContent = count;
}

function loadJokeCount() {
    const count = localStorage.getItem('jokeCount') || '0';
    jokeCountDisplay.textContent = count;
}

// ════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════════

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.classList.add('active');
    
    setTimeout(() => {
        errorMessage.classList.remove('active');
    }, 5000);
}

function showSuccess(message) {
    const originalText = newJokeBtn.textContent;
    newJokeBtn.textContent = message;
    newJokeBtn.style.background = '#4CAF50';
    newJokeBtn.style.color = 'white';
    
    setTimeout(() => {
        newJokeBtn.textContent = originalText;
        newJokeBtn.style.background = '';
        newJokeBtn.style.color = '';
    }, 2000);
}

// ════════════════════════════════════════════════════════════════
// CONSOLE GREETING
// ════════════════════════════════════════════════════════════════

console.log('%c😂 مولّد النكات العشوائية', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cمدعوم بواسطة JokeAPI v2', 'color: #764ba2; font-size: 12px;');
console.log('%cلمزيد من المعلومات: https://jokeapi.dev', 'color: #999; font-size: 11px;');