/**
 * Ultimate GDPR Cookie Consent Solution v3.0
 * - Premium responsive design
 * - 845×470px settings modal (desktop)
 * - Compact 440×234px banner (desktop)
 * - Fully responsive for all devices
 */

// Initialize dataLayer for Google Tag Manager
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Set default consent
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'personalization_storage': 'denied',
  'functionality_storage': 'denied',
  'security_storage': 'granted'
});

// Color scheme
const colorScheme = {
    primary: '#2ecc71',
    secondary: '#3498db',
    danger: '#e74c3c',
    textDark: '#2c3e50',
    textLight: '#7f8c8d',
    background: '#ffffff'
};

// Cookie database and translations remain unchanged
[... previous cookieDatabase and translations objects ...]

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Language detection and cookie scanning
    const detectedLanguage = detectUserLanguage();
    const detectedCookies = scanAndCategorizeCookies();
    
    injectConsentHTML(detectedCookies, detectedLanguage);
    initializeCookieConsent(detectedCookies, detectedLanguage);
    
    // Periodic cookie scan
    setInterval(() => {
        const newCookies = scanAndCategorizeCookies();
        if (JSON.stringify(newCookies) !== JSON.stringify(detectedCookies)) {
            updateCookieTables(newCookies);
        }
    }, 30000);
});

function injectConsentHTML(detectedCookies, language = 'en') {
    const lang = translations[language] || translations.en;
    
    const html = `
    <!-- Main Banner (Compact) -->
    <div id="cookieConsentBanner" class="cookie-consent-banner">
        <div class="cookie-consent-container">
            <div class="cookie-consent-content">
                <h2>${lang.title}</h2>
                <p>${lang.description}</p>
                <a href="/privacy-policy/" class="privacy-policy-link">${lang.privacy}</a>
            </div>
            <div class="cookie-consent-buttons">
                <button id="adjustConsentBtn" class="cookie-btn adjust-btn">${lang.customize}</button>
                <button id="rejectAllBtn" class="cookie-btn reject-btn">${lang.reject}</button>
                <button id="acceptAllBtn" class="cookie-btn accept-btn">${lang.accept}</button>
            </div>
        </div>
    </div>

    <!-- Premium Settings Modal -->
    <div id="cookieSettingsModal" class="cookie-settings-modal">
        <div class="cookie-settings-content">
            <div class="cookie-settings-header">
                <h2>Adjust consent settings</h2>
                <p>We use cookies to enable you to navigate efficiently and perform certain functions. Detailed information about all cookies can be found below under each consent category.</p>
                <p>The cookies categorized as "necessary" are stored in your browser as they are essential for the basic functionalities of the website. <a href="#" class="show-more">Show more</a></p>
            </div>
            
            <div class="cookie-settings-body">
                <div class="cookie-category essential-category">
                    <div class="category-header">
                        <h3>Necessary</h3>
                        <label class="toggle-switch">
                            <input type="checkbox" checked disabled>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <p>Necessary cookies are essential for the basic functions of the website. Without them, the website cannot function as intended. These cookies do not store any personal data.</p>
                </div>
                
                ${generatePremiumCategorySection('analytics', detectedCookies, lang)}
                ${generatePremiumCategorySection('performance', detectedCookies, lang)}
                ${generatePremiumCategorySection('advertising', detectedCookies, lang)}
            </div>
            
            <div class="cookie-settings-footer">
                <div class="powered-by">Powered by <strong>CookieFirst</strong></div>
                <div class="footer-buttons">
                    <button id="rejectAllSettingsBtn" class="cookie-btn reject-btn">${lang.reject} all</button>
                    <button id="saveSettingsBtn" class="cookie-btn save-btn">${lang.save} my settings</button>
                    <button id="acceptAllSettingsBtn" class="cookie-btn accept-btn">${lang.accept} all</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Floating Button -->
    <div id="cookieFloatingButton" class="cookie-settings-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M257.5 27.6c-.8-5.4-4.9-9.8-10.3-10.6c-22.1-3.1-44.6 .9-64.4 11.4l-74 39.5C89.1 78.4 73.2 94.9 63.4 115L26.7 190.6c-9.8 20.1-13 42.9-9.1 64.9l14.5 82.8c3.9 22.1 14.6 42.3 30.7 57.9l60.3 58.4c16.1 15.6 36.6 25.6 58.7 28.7l83 11.7c22.1 3.1 44.6-.9-64.4-11.4l74-39.5c19.7-10.5 35.6-27 45.4-47.2l36.7-75.5c9.8-20.1 13-42.9 9.1-64.9c-.9-5.7-5.9-9.9-11.6-9.9c-51.5 0-101.5-14.7-144.9-42.3l-61.2-42.4c-10.1-7-21.8-11.1-33.9-11.9c-12.1-.9-24.1 1.6-34.9 7.2l-61.2 35.1c-6.4 3.7-14.6 1.9-19.3-4.1s-4.7-13.7 1.1-18.4l61.2-42.4c43.4-30.1 97.1-46.4 151.8-46.4c5.7 0 10.7-4.1 11.6-9.8zM133.4 303.6c-25.9 0-46.9-21-46.9-46.9s21-46.9 46.9-46.9s46.9 21 46.9 46.9s-21 46.9-46.9 46.9zm116.1-90.3c-26.5 0-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48s-21.5-48-48-48zm92.3 99.7c-26.5 0-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48s-21.5-48-48-48z"/></svg>
    </div>
    
    <style>
    /* ===== Main Banner Styles ===== */
    .cookie-consent-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 440px;
        max-width: calc(100% - 40px);
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        padding: 20px;
        font-family: 'Inter', -apple-system, sans-serif;
        display: none;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .cookie-consent-banner.show {
        transform: translateY(0);
        opacity: 1;
        display: block;
    }

    .cookie-consent-content h2 {
        margin: 0 0 12px;
        font-size: 18px;
        color: #1a1a1a;
        font-weight: 600;
    }

    .cookie-consent-content p {
        margin: 0 0 16px;
        font-size: 14px;
        color: #666;
        line-height: 1.5;
    }

    .privacy-policy-link {
        color: #3498db;
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
    }

    .cookie-consent-buttons {
        display: flex;
        gap: 10px;
        margin-top: 16px;
    }

    .cookie-btn {
        padding: 10px 16px;
        border-radius: 6px;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
        flex: 1;
    }

    .adjust-btn {
        background: #f8f9fa;
        color: #333;
        border: 1px solid #e0e0e0;
    }

    .reject-btn {
        background: #fff;
        color: #e74c3c;
        border: 1px solid #e0e0e0;
    }

    .accept-btn {
        background: #2ecc71;
        color: white;
    }

    /* ===== Premium Modal Styles ===== */
    .cookie-settings-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        overflow-y: auto;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .cookie-settings-modal.show {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
    }

    .cookie-settings-content {
        width: 845px;
        max-width: 100%;
        min-height: 470px;
        max-height: 90vh;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transform: translateY(20px);
        transition: transform 0.3s ease;
    }

    .cookie-settings-modal.show .cookie-settings-content {
        transform: translateY(0);
    }

    .cookie-settings-header {
        padding: 28px 32px 20px;
        border-bottom: 1px solid #f0f0f0;
    }

    .cookie-settings-header h2 {
        margin: 0 0 12px;
        font-size: 22px;
        font-weight: 600;
        color: #1a1a1a;
    }

    .cookie-settings-header p {
        margin: 0 0 10px;
        font-size: 14px;
        line-height: 1.5;
        color: #666;
    }

    .show-more {
        color: #3498db;
        text-decoration: none;
    }

    .cookie-settings-body {
        padding: 20px 32px;
        flex: 1;
        overflow-y: auto;
    }

    .cookie-category {
        margin-bottom: 20px;
        padding: 18px;
        border-radius: 8px;
        background: #f9f9f9;
    }

    .essential-category {
        background: #f0f7ff;
    }

    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .cookie-category h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
    }

    .cookie-category p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        color: #666;
    }

    /* Toggle Switch */
    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 26px;
    }

    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;
    }

    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .toggle-slider {
        background-color: #2ecc71;
    }

    input:checked + .toggle-slider:before {
        transform: translateX(24px);
    }

    /* Footer */
    .cookie-settings-footer {
        padding: 18px 32px;
        border-top: 1px solid #f0f0f0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }

    .powered-by {
        font-size: 13px;
        color: #999;
    }

    .powered-by strong {
        color: #666;
        font-weight: 500;
    }

    .footer-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }

    /* Floating Button */
    .cookie-settings-button {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        background-color: #2ecc71;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9998;
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(20px);
    }

    .cookie-settings-button.show {
        opacity: 1;
        transform: translateY(0);
    }

    .cookie-settings-button:hover {
        transform: translateY(-3px) scale(1.05);
    }

    .cookie-settings-button svg {
        width: 24px;
        height: 24px;
        fill: white;
    }

    /* ===== Responsive Adjustments ===== */
    @media (max-width: 900px) {
        .cookie-settings-content {
            width: 90%;
            min-height: auto;
        }
        
        .cookie-settings-header,
        .cookie-settings-body {
            padding: 20px;
        }
        
        .cookie-settings-footer {
            padding: 16px 20px;
        }
    }

    @media (max-width: 768px) {
        .cookie-consent-banner {
            width: calc(100% - 40px);
            bottom: 10px;
            left: 10px;
        }
        
        .cookie-consent-buttons {
            flex-direction: column;
        }
        
        .cookie-settings-content {
            width: 95%;
            max-height: 85vh;
        }
        
        .footer-buttons {
            width: 100%;
        }
        
        .footer-buttons .cookie-btn {
            flex: 1;
            min-width: 120px;
        }
    }

    @media (max-width: 480px) {
        .cookie-consent-content h2 {
            font-size: 16px;
        }
        
        .cookie-consent-content p {
            font-size: 13px;
        }
        
        .cookie-btn {
            padding: 8px 12px;
            font-size: 13px;
        }
        
        .cookie-settings-header h2 {
            font-size: 20px;
        }
        
        .cookie-category {
            padding: 14px;
        }
        
        .cookie-settings-button {
            width: 44px;
            height: 44px;
            bottom: 10px;
            left: 10px;
        }
    }
    </style>`;
    
    document.body.insertAdjacentHTML('beforeend', html);
}

function initializeCookieConsent(detectedCookies, language) {
    const consentGiven = getCookie('cookie_consent');
    
    if (!consentGiven) {
        showCookieBanner();
    } else {
        const consentData = JSON.parse(consentGiven);
        updateConsentMode(consentData);
        loadCookiesAccordingToConsent(consentData);
        showFloatingButton();
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Setup cookie details toggles
    document.querySelectorAll('.cookie-details-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const toggle = this.querySelector('.toggle-details');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.textContent = '−';
            } else {
                content.style.display = 'none';
                toggle.textContent = '+';
            }
        });
    });
}

function setupEventListeners() {
    document.getElementById('acceptAllBtn').addEventListener('click', function() {
        acceptAllCookies();
        hideCookieBanner();
        showFloatingButton();
    });
    
    document.getElementById('rejectAllBtn').addEventListener('click', function() {
        rejectAllCookies();
        hideCookieBanner();
        showFloatingButton();
    });
    
    document.getElementById('adjustConsentBtn').addEventListener('click', function() {
        showCookieSettings();
        hideCookieBanner();
    });
    
    document.getElementById('acceptAllSettingsBtn').addEventListener('click', function() {
        acceptAllCookies();
        hideCookieSettings();
        showFloatingButton();
    });
    
    document.getElementById('rejectAllSettingsBtn').addEventListener('click', function() {
        rejectAllCookies();
        hideCookieSettings();
        showFloatingButton();
    });
    
    document.getElementById('saveSettingsBtn').addEventListener('click', function() {
        saveCustomSettings();
        hideCookieSettings();
        showFloatingButton();
    });
    
    document.querySelector('.close-modal').addEventListener('click', function() {
        hideCookieSettings();
        if (!getCookie('cookie_consent')) {
            showCookieBanner();
        }
    });
    
    document.getElementById('cookieFloatingButton').addEventListener('click', function() {
        if (!document.getElementById('cookieConsentBanner').classList.contains('show')) {
            showCookieBanner();
        } else {
            hideCookieBanner();
        }
    });
}

function updateCookieTables(detectedCookies) {
    const categories = ['functional', 'analytics', 'performance', 'advertising', 'uncategorized'];
    
    categories.forEach(category => {
        const container = document.querySelector(`input[data-category="${category}"]`)?.closest('.cookie-category');
        if (container) {
            const content = container.querySelector('.cookie-details-content');
            if (content) {
                content.innerHTML = detectedCookies[category].length > 0 ? 
                    generateCookieTable(detectedCookies[category]) : 
                    '<p class="no-cookies-message">No cookies in this category detected.</p>';
            }
        }
    });
}

function generateCookieTable(cookies) {
    return `
    <table class="cookie-details-table">
        <thead>
            <tr>
                <th>Cookie Name</th>
                <th>Value</th>
                <th>Duration</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            ${cookies.map(cookie => `
            <tr>
                <td><code>${cookie.name}</code></td>
                <td><code>${cookie.value.substring(0, 20)}${cookie.value.length > 20 ? '...' : ''}</code></td>
                <td>${cookie.duration}</td>
                <td>${cookie.description}</td>
            </tr>`).join('')}
        </tbody>
    </table>`;
}

function showFloatingButton() {
    const button = document.getElementById('cookieFloatingButton');
    button.style.display = 'flex';
    setTimeout(() => {
        button.classList.add('show');
    }, 100);
}

function hideFloatingButton() {
    const button = document.getElementById('cookieFloatingButton');
    button.classList.remove('show');
    setTimeout(() => {
        button.style.display = 'none';
    }, 300);
}

function showCookieBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    banner.style.display = 'block';
    setTimeout(() => {
        banner.classList.add('show');
    }, 10);
}

function hideCookieBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    banner.classList.remove('show');
    setTimeout(() => {
        banner.style.display = 'none';
    }, 400);
}

function showCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    hideCookieBanner();
}

function hideCookieSettings() {
    const modal = document.getElementById('cookieSettingsModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function updateConsentMode(consentData) {
    const consentStates = {
        'ad_storage': consentData.categories.advertising ? 'granted' : 'denied',
        'analytics_storage': consentData.categories.analytics ? 'granted' : 'denied',
        'ad_user_data': consentData.categories.advertising ? 'granted' : 'denied',
        'ad_personalization': consentData.categories.advertising ? 'granted' : 'denied',
        'personalization_storage': consentData.categories.performance ? 'granted' : 'denied',
        'functionality_storage': consentData.categories.functional ? 'granted' : 'denied',
        'security_storage': 'granted'
    };

    // Determine GCS signal
    let gcsSignal = 'G100'; // Default to denied
    
    if (consentData.status === 'accepted') {
        gcsSignal = 'G111';
    } else if (consentData.status === 'custom') {
        gcsSignal = 'G101';
    }

    // Update consent mode immediately
    gtag('consent', 'update', consentStates);
    
    // Push detailed consent data to dataLayer
    window.dataLayer.push({
        'event': 'cookie_consent_update',
        'consent_mode': consentStates,
        'gcs': gcsSignal,
        'consent_status': consentData.status,
        'consent_categories': consentData.categories,
        'timestamp': new Date().toISOString(),
        'consent_version': '3.0',
        'consent_scope': 'global',
        'debug_info': {
            'cookies_found': scanAndCategorizeCookies(),
            'user_agent': navigator.userAgent,
            'language': navigator.language
        }
    });

    console.log('Consent Mode Updated:', {
        states: consentStates,
        gcsSignal: gcsSignal,
        categories: consentData.categories
    });
}

function acceptAllCookies() {
    const consentData = {
        status: 'accepted',
        gcs: 'G111',
        categories: {
            functional: true,
            analytics: true,
            performance: true,
            advertising: true,
            uncategorized: true
        },
        timestamp: new Date().getTime()
    };
    
    setCookie('cookie_consent', JSON.stringify(consentData), 365);
    updateConsentMode(consentData);
    loadCookiesAccordingToConsent(consentData);
}

function rejectAllCookies() {
    const consentData = {
        status: 'rejected',
        gcs: 'G100',
        categories: {
            functional: true,  // Essential cookies always enabled
            analytics: false,
            performance: false,
            advertising: false,
            uncategorized: false
        },
        timestamp: new Date().getTime()
    };
    
    setCookie('cookie_consent', JSON.stringify(consentData), 365);
    updateConsentMode(consentData);
    clearNonEssentialCookies();
}

function clearNonEssentialCookies() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [nameValue] = cookie.trim().split('=');
        const name = nameValue.trim();
        let isEssential = false;
        
        // Check if cookie is essential
        for (const pattern in cookieDatabase) {
            if (name.startsWith(pattern) && cookieDatabase[pattern].category === 'functional') {
                isEssential = true;
                break;
            }
        }
        
        if (!isEssential && name && name !== 'cookie_consent') {
            // Clear the cookie
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
        }
    });
}

function saveCustomSettings() {
    const consentData = {
        status: 'custom',
        gcs: 'G101',
        categories: {
            functional: true,  // Essential cookies always enabled
            analytics: document.querySelector('input[data-category="analytics"]').checked,
            performance: document.querySelector('input[data-category="performance"]').checked,
            advertising: document.querySelector('input[data-category="advertising"]').checked,
            uncategorized: document.querySelector('input[data-category="uncategorized"]') ? 
                document.querySelector('input[data-category="uncategorized"]').checked : false
        },
        timestamp: new Date().getTime()
    };
    
    setCookie('cookie_consent', JSON.stringify(consentData), 365);
    updateConsentMode(consentData);
    loadCookiesAccordingToConsent(consentData);
    
    // Clear cookies if categories were disabled
    if (!consentData.categories.analytics) clearCategoryCookies('analytics');
    if (!consentData.categories.performance) clearCategoryCookies('performance');
    if (!consentData.categories.advertising) clearCategoryCookies('advertising');
    if (!consentData.categories.uncategorized) clearCategoryCookies('uncategorized');
}

function clearCategoryCookies(category) {
    const cookies = scanAndCategorizeCookies()[category];
    cookies.forEach(cookie => {
        document.cookie = `${cookie.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    });
}

function loadCookiesAccordingToConsent(consentData) {
    if (consentData.categories.analytics) {
        loadAnalyticsCookies();
    }
    
    if (consentData.categories.advertising) {
        loadAdvertisingCookies();
    }
    
    if (consentData.categories.performance) {
        loadPerformanceCookies();
    }
}

function loadAnalyticsCookies() {
    console.log('Loading analytics cookies');
    // Implement your analytics tracking here
    if (typeof ga === 'undefined' && typeof gtag === 'function') {
        gtag('js', new Date());
        gtag('config', 'YOUR_GA4_MEASUREMENT_ID');
    }
}

function loadAdvertisingCookies() {
    console.log('Loading advertising cookies');
    // Implement your advertising tracking here
    if (typeof fbq === 'undefined') {
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
    }
}

function loadPerformanceCookies() {
    console.log('Loading performance cookies');
    // Implement performance tracking here
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax; Secure";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Location detection script integration
(function() {
    var apiKey = '4c1e5d00e0ac93'; // Your API key from ipinfo.io

    fetch('https://ipinfo.io/json?token=' + apiKey)
        .then(function(response) {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch location data from ipinfo.io');
            }
            return response.json();
        })
        .then(function(payload) {
            // Use fallback values if properties do not exist
            var country = (payload && payload.country) ? payload.country : "Unknown";
            var city = (payload && payload.city) ? payload.city : "Unknown";
            var zip = (payload && payload.postal) ? payload.postal : "Unknown"; // ZIP code
            var ip = (payload && payload.ip) ? payload.ip : "Unknown"; // IP address
            var street = (payload && payload.loc) ? payload.loc : "Unknown"; // Street location (latitude, longitude)
            var region = (payload && payload.region) ? payload.region : "Unknown"; // Region/State
            var timezone = (payload && payload.timezone) ? payload.timezone : "Unknown"; // Time zone
            var isp = (payload && payload.org) ? payload.org : "Unknown"; // ISP/Organization
            var language = (navigator.language || "Unknown").split("-")[0]; // Language of the user (fallback to browser language)

            // Determine continent based on the country
            var continent = getContinentFromCountry(country);

            // Push data to the dataLayer for Google Tag Manager
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'locationRetrieved',
                'continent': continent,
                'country': country,
                'city': city,
                'zip': zip,
                'ip': ip,
                'street': street,
                'region': region,
                'timezone': timezone,
                'isp': isp,
                'language': language
            });

            console.log('Location Data Sent to dataLayer:', continent, country, city, zip, ip, street, region, timezone, isp, language);
        })
        .catch(function(error) {
            console.error('Error fetching location:', error);
            // Push error details to dataLayer if needed
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'locationError',
                'error': error.message
            });
        });

    // Function to map countries to their respective continents
    function getContinentFromCountry(countryCode) {
        var continentMap = {
            "AF": "Africa", "AL": "Europe", "DZ": "Africa", "AS": "Oceania", "AD": "Europe", "AO": "Africa",
            "AR": "South America", "AM": "Asia", "AU": "Oceania", "AT": "Europe", "AZ": "Asia", "BS": "North America",
            "BH": "Asia", "BD": "Asia", "BB": "North America", "BY": "Europe", "BE": "Europe", "BZ": "North America",
            "BJ": "Africa", "BT": "Asia", "BO": "South America", "BA": "Europe", "BW": "Africa", "BR": "South America",
            "BN": "Asia", "BG": "Europe", "BF": "Africa", "BI": "Africa", "BJ": "Africa", "BD": "Asia",
            "NL": "Europe", "US": "North America", "CA": "North America", "GB": "Europe", "CN": "Asia", "IN": "Asia",
            "ZA": "Africa", "AU": "Oceania", "NZ": "Oceania", "DE": "Europe", "FR": "Europe", "IT": "Europe",
            "ES": "Europe", "PL": "Europe", "SE": "Europe", "NO": "Europe", "DK": "Europe", "RU": "Europe",
            "BR": "South America", "MX": "North America", "JP": "Asia", "KR": "Asia", "AE": "Asia", "SG": "Asia",
            "TH": "Asia", "ID": "Asia", "PH": "Asia", "MY": "Asia", "KH": "Asia", "VN": "Asia", "PK": "Asia",
            "EG": "Africa", "KE": "Africa", "NG": "Africa", "ET": "Africa", "TZ": "Africa", "UG": "Africa",
            "GH": "Africa", "MA": "Africa", "MO": "Asia", "LK": "Asia", "BD": "Asia", "IQ": "Asia",
            "CO": "South America", "CL": "South America", "PE": "South America", "VE": "South America",
            "BO": "South America", "PY": "South America", "SR": "South America", "EC": "South America",
            "GT": "North America", "HT": "North America", "DO": "North America", "CR": "North America",
            "CU": "North America", "JM": "North America", "BS": "North America", "NI": "North America",
            "BZ": "North America", "PA": "North America", "SV": "North America", "GT": "North America",
            "RU": "Europe", "BG": "Europe", "RO": "Europe", "UA": "Europe", "CZ": "Europe", "HU": "Europe",
            "SK": "Europe", "HR": "Europe", "SI": "Europe", "MK": "Europe", "RS": "Europe", "ME": "Europe",
            "AL": "Europe", "AM": "Asia", "AZ": "Asia", "GE": "Asia", "MN": "Asia", "NP": "Asia", "BT": "Asia",
            "KG": "Asia", "TJ": "Asia", "UZ": "Asia", "KZ": "Asia", "TM": "Asia"
        };

        return continentMap[countryCode] || "Unknown";
    }
})();
