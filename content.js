(async function () {
    const result = {
        url: window.location.href,
        isHttps: window.location.protocol === 'https:',
        mixedContent: false,
        scripts: [],
        cookies: [],
        securityHeaders: {},
        privacyPolicyLink: null,
    };

    // Mixed content
    if (result.isHttps) {
        const insecure = Array.from(
            document.querySelectorAll('[src^="http:"]')
        );
        if (insecure.length > 0) {
            result.mixedContent = true;
        }
    }

    // Scripts
    document.querySelectorAll('script[src]').forEach(script => {
        result.scripts.push(script.src);
    });

    // Privacy policy link
    const links = document.querySelectorAll('a[href]');
    for (const a of links) {
        if (/privacy/i.test(a.textContent)) {
            result.privacyPolicyLink = a.href;
            break;
        }
    }

    // Cookies
    result.cookies = document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(Boolean);

    // Security headers
    try {
        const res = await fetch(window.location.href, { method: 'HEAD' });
        result.securityHeaders = {
            csp: res.headers.get('content-security-policy'),
            hsts: res.headers.get('strict-transport-security'),
            xfo: res.headers.get('x-frame-options'),
            xcto: res.headers.get('x-content-type-options'),
        };
    } catch (e) {
        console.log('Could not fetch headers:', e);
    }

    // Send data to React extension UI
    chrome.runtime.sendMessage({
        type: 'SECURITY_SCAN_RESULT',
        payload: result,
    });
})();
