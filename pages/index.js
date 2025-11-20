import Head from "next/head";
import { useEffect, useState } from "react";

const funnyWords = [
  "Traitor!", "Betrayer!", "How dare you!", "Unforgivable!", "Shame!",
  "Never forget!", "Backstabber!", "Deserter!", "Disgrace!", "Fake friend!",
  "Liar!", "Coward!", "No goodbye?!", "Heartless!", "Abandoned!",
  "Selfish!", "Cruel!", "Disloyal!", "Unbelievable!", "Ruthless!",
  "Zero respect!", "Pathetic!", "Stone cold!", "Dishonor!", "Outrageous!",
  "Shameless!", "Ungrateful!", "Never again!", "Untrustworthy!", "Disappointing!"
];

export default function Home() {
  const [count, setCount] = useState(0);

  // Fetch counter initially + refresh every 1.5s so it stays in sync with others
  useEffect(() => {
    const fetchCounter = async () => {
      try {
        const res = await fetch("/api/counter");
        const data = await res.json();
        setCount(data.value);
      } catch (e) {
        console.error("Failed to fetch counter", e);
      }
    };

    fetchCounter();
    const interval = setInterval(fetchCounter, 1500);

    return () => clearInterval(interval);
  }, []);

  const spawnFlyingText = () => {
    const text = document.createElement("div");
    text.className = "flying-text";
    text.innerText = funnyWords[Math.floor(Math.random() * funnyWords.length)];

    const button = document.getElementById("sunny-button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    // Random horizontal direction (left or right)
    const randomAngle = (Math.random() - 0.5) * 120; // -60 to +60 degrees
    const randomDistance = Math.random() * 150 + 100; // 100-250px horizontal spread

    text.style.left = startX + "px";
    text.style.top = startY + "px";
    text.style.setProperty("--random-x", `${Math.sin(randomAngle * Math.PI / 180) * randomDistance}px`);
    text.style.setProperty("--random-rotation", `${(Math.random() - 0.5) * 360}deg`);

    document.body.appendChild(text);

    setTimeout(() => text.remove(), 3000);
  };

  const handleClick = async () => {
    // Spawn multiple particles for firing effect
    for (let i = 0; i < 3; i++) {
      setTimeout(() => spawnFlyingText(), i * 50);
    }
    
    try {
      const res = await fetch("/api/counter", { method: "POST" });
      const data = await res.json();
      setCount(data.value);
    } catch (e) {
      console.error("Failed to increment counter", e);
    }
  };

  return (
    <>
      <Head>
        <title>Sunny Global Cuda Counter - The Legend of the Traitor</title>
        <meta name="description" content="A digital memorial counting the betrayals of Saimon Hasan Sunny, who left without saying goodbye. Click to add your disappointment to the global counter!" />
        <meta name="keywords" content="Sunny, Cuda Counter, Global Counter, Saimon Hasan Sunny, Interactive Counter" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sunny Global Cuda Counter - The Legend of the Traitor" />
        <meta property="og:description" content="A digital memorial counting the betrayals of Saimon Hasan Sunny. Join thousands in expressing disappointment!" />
        <meta property="og:image" content="https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSnbW6gxw_KYktQiM21buA8q5FdGej0RclCT0BGZZAlfNTye9VG2gS6MK81EZk2anX7-QtF_hca8JEMxYgs-M8aKcECAelpWQPcY-nGuNORWvwxsL49TQT85N2PKrRH-wzYeMIXDTmy5eru98jWJyFMw6VcmYQZH45Uo5OHpdry7jMkzVbuFABAeJuW8bT1CW6ougeuDvs6pW3FcH_w0_3i2JCF3r8zIjzN8-YTuiyS9W-9oDaufOaT_SL3C8Mp2h4klE0UBNa9xfgMeH-NHLcsZ8yI5zKSjrmjmnQhw9j2NCVjzncGkdo28DOU4tF3jGiI29gnHXvAkuncDmzOpVFEDiBWun1FdNcLamMw3_IY47t6Qt_3YnkyJ8AI12Cl9NLLihihlwV28c0z7Poi-uY0xkaugPD_F_eBYvnTqP4YWXe0jiX5TN8QlGS6R68F9-0-Ib5NovafqJU9zfpjW9umhojyo03BTF-8AT5CLZ90_FEgj11Kf1vNU-0WikFhPkZsU_u9XTCzjG5Y0UWvm2NVpmhtKmV4XcfXkCHUBLzk9HTz2lk6PnABevmTNQTbCe2iQEVHooalNJQa_GqUhlZIMwt5mn8ZG_ywKQolHspoqxnhaQxnYbc72LgEAuICkiIx9G7ZSdmyk9F4RxxHGVF8nfVK5Fs4DYsjcCfdtfUM7i4ed6IqBjtc1O3bo6d-UyJ8RYSq6DX5V8A5V8Gc2wi_C-JKfp24Vo6GNVvt5oiPbAXUsV3vD8-etUXlGU9b38ocT1PfBKqyXMN_JaIMn_Sds25U-tYkCA0sRqzKQlkrhIqmzJra4kJzrwQJG_dAvetaJ2FpzAylxUVvI6bNMcQkd2ELb4YV1cSXES4XHWsdvyh3NSeXYUSEyNwMaRKahqXt8UTOlK1JB-sIwfpEFLhoHZdjtIs8JfvBWqhU-4dH2cYTB8HLdlL5dHx8bRDz1nGbuI60KEpLTG0HUcRChFwoyPT4ZrMcKokHSK7_ZF2KYZFXdcxhmRwScxK7bvugotTFulY4J9oiQC52C5wqJoxKJtvQ2TA43uUHBOpON8aeNZFex2bdwHcRDoaDOFIH2zVozKJixJmY_cXTVH7rN-y03yQIbOWrv8VROYo_YQjeplfY_RH7jk5G9RYg1npTS1F2fte4gax6DbFwPFYgnGUYKa4-WCxOZ7Un6llUdV6udyGiQtE1YzNpbNnRXvPQoHPHwHE1n1XL-yl-_vTP9TTHghsMWJoCCKhYjMOcoXTi188hwfYmDqriq56lU1VzA2CtL_WuwoItt93aGDoPXF1PcTimQ3jEwFjWmaX_GFDYWp4y_ILmfw4c3mG3DRYs=s1024-rj" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sunny Global Cuda Counter" />
        <meta name="twitter:description" content="A digital memorial counting the betrayals of Saimon Hasan Sunny. Click to add yours!" />
        <meta name="twitter:image" content="https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSnbW6gxw_KYktQiM21buA8q5FdGej0RclCT0BGZZAlfNTye9VG2gS6MK81EZk2anX7-QtF_hca8JEMxYgs-M8aKcECAelpWQPcY-nGuNORWvwxsL49TQT85N2PKrRH-wzYeMIXDTmy5eru98jWJyFMw6VcmYQZH45Uo5OHpdry7jMkzVbuFABAeJuW8bT1CW6ougeuDvs6pW3FcH_w0_3i2JCF3r8zIjzN8-YTuiyS9W-9oDaufOaT_SL3C8Mp2h4klE0UBNa9xfgMeH-NHLcsZ8yI5zKSjrmjmnQhw9j2NCVjzncGkdo28DOU4tF3jGiI29gnHXvAkuncDmzOpVFEDiBWun1FdNcLamMw3_IY47t6Qt_3YnkyJ8AI12Cl9NLLihihlwV28c0z7Poi-uY0xkaugPD_F_eBYvnTqP4YWXe0jiX5TN8QlGS6R68F9-0-Ib5NovafqJU9zfpjW9umhojyo03BTF-8AT5CLZ90_FEgj11Kf1vNU-0WikFhPkZsU_u9XTCzjG5Y0UWvm2NVpmhtKmV4XcfXkCHUBLzk9HTz2lk6PnABevmTNQTbCe2iQEVHooalNJQa_GqUhlZIMwt5mn8ZG_ywKQolHspoqxnhaQxnYbc72LgEAuICkiIx9G7ZSdmyk9F4RxxHGVF8nfVK5Fs4DYsjcCfdtfUM7i4ed6IqBjtc1O3bo6d-UyJ8RYSq6DX5V8A5V8Gc2wi_C-JKfp24Vo6GNVvt5oiPbAXUsV3vD8-etUXlGU9b38ocT1PfBKqyXMN_JaIMn_Sds25U-tYkCA0sRqzKQlkrhIqmzJra4kJzrwQJG_dAvetaJ2FpzAylxUVvI6bNMcQkd2ELb4YV1cSXES4XHWsdvyh3NSeXYUSEyNwMaRKahqXt8UTOlK1JB-sIwfpEFLhoHZdjtIs8JfvBWqhU-4dH2cYTB8HLdlL5dHx8bRDz1nGbuI60KEpLTG0HUcRChFwoyPT4ZrMcKokHSK7_ZF2KYZFXdcxhmRwScxK7bvugotTFulY4J9oiQC52C5wqJoxKJtvQ2TA43uUHBOpON8aeNZFex2bdwHcRDoaDOFIH2zVozKJixJmY_cXTVH7rN-y03yQIbOWrv8VROYo_YQjeplfY_RH7jk5G9RYg1npTS1F2fte4gax6DbFwPFYgnGUYKa4-WCxOZ7Un6llUdV6udyGiQtE1YzNpbNnRXvPQoHPHwHE1n1XL-yl-_vTP9TTHghsMWJoCCKhYjMOcoXTi188hwfYmDqriq56lU1VzA2CtL_WuwoItt93aGDoPXF1PcTimQ3jEwFjWmaX_GFDYWp4y_ILmfw4c3mG3DRYs=s1024-rj" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="page">
        <div className="stars"></div>
        <div className="stars2"></div>
        
        <div className="content-wrapper">
          <h1 className="title">
            <span className="neon-text">SUNNY</span> CUDA COUNTER 🌞
          </h1>
          
          <div className="counter-display">
            <p className="subtitle">Total Global Cuda he Got Till Now</p>
            <div className="counter-number">{count}</div>
          </div>

          <button
            id="sunny-button"
            className="boost-button"
            onClick={handleClick}
          >
            <span className="button-glow"></span>
            ⚡ FIRE THE COUNTER ⚡
          </button>

          <div className="story-section">
            <h2 className="story-title">📖 The Legend of Sunny</h2>
            <div className="story-content">
              <p>
                In the annals of friendship and departure, there exists a tale that has become 
                legendary among a close-knit group. This is the story of <strong>Saimon Hasan Sunny</strong>, 
                a name that now echoes with both nostalgia and a tinge of betrayal.
              </p>
              <p>
                When the time came for Sunny to embark on his journey abroad to pursue his studies, 
                something unexpected happened—or rather, didn't happen. Despite years of camaraderie, 
                shared memories, and countless moments together, Sunny made a choice that left his 
                friends in disbelief: <em>he left the country without meeting them one last time</em>.
              </p>
              <p>
                No farewell gathering. No final hangout. No heartfelt goodbyes. Just... silence. 
                The group, who had stood by him through thick and thin, were left wondering if all 
                those years meant anything at all. And thus, the moniker was born: <strong>"The Traitor"</strong>.
              </p>
              <p>
                But friends have a way of turning pain into playfulness, sorrow into satire. This 
                button you see before you? It's not just a counter—it's a monument. A digital memorial 
                to remember that fateful decision. Every click is a reminder, every number a testament 
                to the collective bewilderment of those left behind.
              </p>
              <p className="story-highlight">
                So click away, dear visitor. Let the world know. Let the numbers rise. 
                And may Sunny, wherever he is, feel the weight of each and every tap. 🌞⚡
              </p>
            </div>
          </div>

          <div className="social-section">
            <h3 className="social-title">🔗 Sunny's Social Media</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61582784674022" className="social-link" target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
              <a href="https://www.linkedin.com/in/saimonhasansunny" className="social-link" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/saimonhs_/" className="social-link" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a href="https://www.youtube.com/@saimonhasansunny1655/videos" className="social-link" target="_blank" rel="noopener noreferrer" title="YouTube">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <footer className="credits">
            <p>
              From <a href="http://codebumble.net/" target="_blank" rel="noopener noreferrer" className="credit-link">
                <strong className="neon-text-small">Codebumble</strong>
              </a>
            </p>
            <p>
              Made with ⚡ by <a href="https://www.facebook.com/shakil.inframe" target="_blank" rel="noopener noreferrer" className="credit-link">
                <strong>Shakil Ahmed</strong>
              </a>
            </p>
            <p>
              <a href="https://github.com/shakilofficial0/sunnys-cuda" target="_blank" rel="noopener noreferrer" className="credit-link repo-link">
                <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Source Code
              </a>
            </p>
          </footer>
        </div>

        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            background: #0f0f23;
            color: #e4e4e7;
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            overflow-x: hidden;
          }

          .page {
            min-height: 100vh;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            background: 
              radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
              #0f0f23;
          }

          .stars, .stars2 {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .stars {
            background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"><circle cx="1" cy="1" r="1" fill="%23a855f7" opacity="0.2"/></svg>') repeat;
          }

          .stars2 {
            background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="3" height="3"><circle cx="1.5" cy="1.5" r="1" fill="%236366f1" opacity="0.15"/></svg>') repeat;
          }



          .content-wrapper {
            max-width: 900px;
            width: 100%;
            z-index: 1;
          }

          .title {
            font-size: clamp(36px, 8vw, 72px);
            font-weight: 900;
            text-align: center;
            margin-bottom: 40px;
            letter-spacing: 2px;
            text-transform: uppercase;
            animation: glow-pulse 2s ease-in-out infinite;
          }

          .neon-text {
            color: #818cf8;
            text-shadow: 
              0 0 10px rgba(129, 140, 248, 0.5),
              0 0 20px rgba(129, 140, 248, 0.3),
              0 0 30px rgba(168, 85, 247, 0.3);
          }

          .neon-text-small {
            color: #818cf8;
            text-shadow: 
              0 0 5px rgba(129, 140, 248, 0.3);
          }

          @keyframes glow-pulse {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
          }



          .counter-display {
            text-align: center;
            margin-bottom: 50px;
            padding: 30px;
            background: rgba(99, 102, 241, 0.05);
            border-radius: 20px;
            border: 1px solid rgba(99, 102, 241, 0.2);
            box-shadow: 
              0 4px 24px rgba(99, 102, 241, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
          }

          .subtitle {
            font-size: 18px;
            color: #a78bfa;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-weight: 600;
          }

          .counter-number {
            font-size: clamp(48px, 10vw, 96px);
            font-weight: 900;
            background: linear-gradient(135deg, #818cf8 0%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: number-pulse 1s ease-in-out infinite;
          }

          @keyframes number-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          .boost-button {
            display: block;
            margin: 0 auto 60px;
            position: relative;
            font-size: clamp(18px, 3vw, 26px);
            padding: 20px 50px;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: #ffffff;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 
              0 8px 32px rgba(99, 102, 241, 0.35),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            transition: all 0.3s ease;
            overflow: hidden;
          }

          .boost-button:hover {
            transform: translateY(-2px);
            box-shadow: 
              0 12px 48px rgba(99, 102, 241, 0.45),
              0 0 0 1px rgba(255, 255, 255, 0.15) inset;
          }

          .boost-button:active {
            transform: scale(0.98);
          }

          .button-glow {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent 30%,
              rgba(255, 255, 255, 0.3) 50%,
              transparent 70%
            );
            animation: button-shine 3s infinite;
          }

          @keyframes button-shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }

          .story-section {
            margin: 60px 0;
            padding: 40px;
            background: rgba(168, 85, 247, 0.05);
            border-radius: 20px;
            border: 1px solid rgba(168, 85, 247, 0.15);
            box-shadow: 0 4px 24px rgba(168, 85, 247, 0.08);
          }

          .story-title {
            font-size: clamp(24px, 4vw, 36px);
            color: #c084fc;
            text-align: center;
            margin-bottom: 30px;
            font-weight: 800;
          }

          .story-content {
            font-size: 16px;
            line-height: 1.8;
            color: #e0e0e0;
          }

          .story-content p {
            margin-bottom: 20px;
          }

          .story-content strong {
            color: #818cf8;
            font-weight: 700;
          }

          .story-content em {
            color: #a855f7;
            font-style: italic;
          }

          .story-highlight {
            background: rgba(99, 102, 241, 0.08);
            padding: 20px;
            border-left: 4px solid #818cf8;
            border-radius: 8px;
            margin-top: 30px !important;
            font-size: 18px;
            font-weight: 600;
          }

          .social-section {
            margin: 40px 0;
            padding: 30px;
            text-align: center;
            background: rgba(99, 102, 241, 0.05);
            border-radius: 20px;
            border: 1px solid rgba(99, 102, 241, 0.15);
          }

          .social-title {
            font-size: clamp(20px, 3vw, 28px);
            color: #818cf8;
            margin-bottom: 20px;
            font-weight: 700;
          }

          .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }

          .social-link {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 12px;
            color: #818cf8;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .social-link:hover {
            background: rgba(99, 102, 241, 0.2);
            border-color: rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
          }

          .social-icon {
            width: 24px;
            height: 24px;
          }

          .social-placeholder {
            color: #888;
            font-style: italic;
          }

          .credits {
            text-align: center;
            margin-top: 80px;
            padding: 30px 0;
            border-top: 1px solid rgba(99, 102, 241, 0.15);
            color: #71717a;
          }

          .credits p {
            margin: 8px 0;
            font-size: 14px;
          }

          .credits strong {
            color: #fff;
          }

          .credit-link {
            color: inherit;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .credit-link:hover {
            color: #818cf8;
          }

          .credit-link strong {
            transition: color 0.3s ease;
          }

          .credit-link:hover strong {
            color: #818cf8;
          }

          .repo-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;
            padding: 8px 16px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 8px;
            color: #818cf8;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .repo-link:hover {
            background: rgba(99, 102, 241, 0.2);
            border-color: rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
          }

          .github-icon {
            width: 20px;
            height: 20px;
          }

          .flying-text {
            position: fixed;
            font-size: 28px;
            font-weight: 900;
            animation: fireUp 3s ease-out forwards;
            background: linear-gradient(135deg, #818cf8 0%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 8px rgba(129, 140, 248, 0.5));
            pointer-events: none;
            transform: translateX(-50%);
            z-index: 9999;
          }

          @keyframes fireUp {
            0% {
              transform: translate(-50%, 0) rotate(0deg) scale(1);
              opacity: 1;
            }
            30% {
              transform: translate(
                calc(-50% + var(--random-x)),
                -80px
              ) rotate(var(--random-rotation)) scale(1.2);
              opacity: 1;
            }
            100% {
              transform: translate(
                calc(-50% + var(--random-x)),
                -400px
              ) rotate(var(--random-rotation)) scale(0.5);
              opacity: 0;
            }
          }

          @media (max-width: 768px) {
            .story-section, .counter-display, .social-section {
              padding: 25px;
            }

            .story-content {
              font-size: 14px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
