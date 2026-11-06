const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const CHROME_PATH = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPageWsUrl() {
    for (let i = 0; i < 30; i++) {
        try {
            const data = await new Promise((resolve, reject) => {
                http.get(`http://127.0.0.1:${PORT}/json/list`, res => {
                    let raw = '';
                    res.on('data', chunk => raw += chunk);
                    res.on('end', () => resolve(JSON.parse(raw)));
                }).on('error', reject);
            });
            const page = data.find(p => p.type === 'page');
            if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
        } catch (e) {
            await sleep(200);
        }
    }
    throw new Error("Could not connect to Chrome page CDP");
}

class CDPClient {
    constructor(wsUrl) {
        this.ws = new WebSocket(wsUrl);
        this.id = 1;
        this.callbacks = new Map();
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.id && this.callbacks.has(msg.id)) {
                this.callbacks.get(msg.id)(msg);
                this.callbacks.delete(msg.id);
            }
        };
    }
    async ready() {
        if (this.ws.readyState === WebSocket.OPEN) return;
        return new Promise((resolve, reject) => {
            this.ws.onopen = resolve;
            this.ws.onerror = reject;
        });
    }
    send(method, params = {}) {
        return new Promise((resolve) => {
            const id = this.id++;
            this.callbacks.set(id, resolve);
            this.ws.send(JSON.stringify({ id, method, params }));
        });
    }
    close() {
        this.ws.close();
    }
}

async function run() {
    const chrome = spawn(CHROME_PATH, [
        '--headless=new',
        `--remote-debugging-port=${PORT}`,
        '--disable-gpu',
        '--no-sandbox',
        '--disable-extensions',
        'about:blank'
    ]);

    try {
        const wsUrl = await getPageWsUrl();
        const client = new CDPClient(wsUrl);
        await client.ready();
        await client.send('Page.enable');
        await client.send('Runtime.enable');

        const pages = [
            'index.html',
            'cryptography.html',
            'network-security.html',
            'threat-detection.html',
            'protection.html',
            'risk-management.html',
            'cyber-law.html',
            'cyber-lab.html',
            'quiz.html',
            'dashboard.html',
            'about.html'
        ];

        const viewports = [320, 360, 375, 390, 430, 768, 1024];

        console.log("================ DEEP UNMASKED OVERFLOW AUDIT ================");

        for (const page of pages) {
            const fileUrl = `file://${path.resolve(page).replace(/\\/g, '/')}`;
            await client.send('Page.navigate', { url: fileUrl });
            await sleep(500);

            for (const width of viewports) {
                await client.send('Emulation.setDeviceMetricsOverride', {
                    width: width,
                    height: 800,
                    deviceScaleFactor: 1,
                    mobile: width < 768
                });
                await sleep(150);

                const evalRes = await client.send('Runtime.evaluate', {
                    expression: `(() => {
                        // Unmask overflow-x
                        document.documentElement.style.overflowX = 'visible';
                        document.body.style.overflowX = 'visible';
                        
                        const winWidth = window.innerWidth;
                        const scrollWidth = Math.max(
                            document.documentElement.scrollWidth,
                            document.body.scrollWidth
                        );
                        const hasOverflow = scrollWidth > winWidth + 1;
                        let offenders = [];

                        document.querySelectorAll('*').forEach(el => {
                            if (el.tagName === 'HTML' || el.tagName === 'BODY' || el.tagName === 'CANVAS') return;
                            const r = el.getBoundingClientRect();
                            if (r.right > winWidth + 1.5) {
                                offenders.push({
                                    tag: el.tagName,
                                    cls: (el.className || '').toString().slice(0, 35),
                                    id: el.id || '',
                                    right: Math.round(r.right),
                                    w: Math.round(r.width),
                                    overflowAmt: Math.round(r.right - winWidth)
                                });
                            }
                        });

                        // restore
                        document.documentElement.style.overflowX = '';
                        document.body.style.overflowX = '';

                        return JSON.stringify({ winWidth, scrollWidth, hasOverflow, offenders: offenders.slice(0, 8) });
                    })()`,
                    returnByValue: true
                });

                if (evalRes.result && evalRes.result.result && evalRes.result.result.value) {
                    const data = JSON.parse(evalRes.result.result.value);
                    if (data.hasOverflow || data.offenders.length > 0) {
                        console.log(`❌ [OVERFLOW] ${page} at ${width}px -> scrollWidth: ${data.scrollWidth}px (+${data.scrollWidth - width}px)`);
                        console.log('   Offenders:', data.offenders);
                    } else {
                        console.log(`✅ [OK] ${page} at ${width}px`);
                    }
                }
            }
        }
        client.close();
    } finally {
        chrome.kill();
    }
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
