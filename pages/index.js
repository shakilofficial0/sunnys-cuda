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
        <title>Sunny Global Cuda Counter</title>
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
              <p className="social-placeholder">Links coming soon...</p>
            </div>
          </div>

          <footer className="credits">
            <p>From <strong className="neon-text-small">Codebumble</strong></p>
            <p>Made with ⚡ by <strong>Shakil Ahmed</strong></p>
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
