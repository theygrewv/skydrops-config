export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;

    // 1. IDENTITY RESOLUTION
    if (url.pathname.startsWith('/.well-known/atproto-did')) {
      return new Response("did:plc:your_did_here", { 
        headers: { "content-type": "text/plain" },
      });
    }

    // 2. THE ETHER UI
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Skydrops | ${host}</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: 'Inter', system-ui, sans-serif;
                background-color: #050508;
                background-image: 
                    radial-gradient(circle at 15% 25%, rgba(65, 105, 225, 0.12) 0%, transparent 45%),
                    radial-gradient(circle at 85% 75%, rgba(138, 43, 226, 0.12) 0%, transparent 45%);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                overflow: hidden;
            }

            .glass-sheet {
                position: relative;
                width: 90%;
                max-width: 380px;
                padding: 40px;
                background: rgba(255, 255, 255, 0.04);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                border-radius: 28px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                text-align: center;
                z-index: 1;
            }

            .glass-sheet::after {
                content: "";
                position: absolute;
                inset: -2px;
                background: linear-gradient(135deg, rgba(65, 105, 225, 0.3), transparent, rgba(138, 43, 226, 0.3));
                border-radius: 30px;
                z-index: -1;
                filter: blur(8px);
            }

            .app-icon {
                width: 96px;
                height: 96px;
                margin: 0 auto 24px;
                background: url('https://skydrops.app/logo.png'); 
                background-size: cover;
                image-rendering: pixelated;
                border-radius: 18px;
                box-shadow: 0 0 20px rgba(65, 105, 225, 0.4);
            }

            h1 { font-size: 1.6rem; margin: 12px 0; font-weight: 700; letter-spacing: -0.03em; }
            p { color: rgba(255, 255, 255, 0.65); line-height: 1.6; font-size: 0.95rem; margin-bottom: 30px; }

            .tagline {
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.25em;
                color: #5d83f7;
                margin-bottom: 12px;
                font-weight: 500;
            }

            .button-group {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .btn {
                display: block;
                padding: 14px;
                text-decoration: none;
                border-radius: 14px;
                font-weight: 600;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }

            /* Main Login Button */
            .btn-primary {
                background: white;
                color: black;
                box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
            }

            /* Secondary Profile Button */
            .btn-secondary {
                background: rgba(255, 255, 255, 0.08);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .btn:hover { 
                transform: translateY(-3px);
                filter: brightness(1.1);
            }
        </style>
    </head>
    <body>
        <div class="glass-sheet">
            <div class="tagline">Welcome Home, Luminary</div>
            <div class="app-icon"></div>
            <h1>${host}</h1>
            <p>Where the Skies touch Grass.<br>Your corner of the cosmos.</p>
            
            <div class="button-group">
                <a href="#" class="btn btn-primary">Sign in with Skydrops</a>
                <a href="https://bsky.app/profile/${host}" class="btn btn-secondary">View on Bluesky</a>
            </div>
        </div>
    </body>
    </html>
    `;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },
};
