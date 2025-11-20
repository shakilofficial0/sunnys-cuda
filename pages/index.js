import { useEffect, useState } from "react";

const funnyWords = [
  "Oh yeah!", "AHHH!", "Yeamiti Kadusai!", "Boom!", "Sunny Vibes!",
  "Kira Kira!", "Wooosh!", "Giga Hit!", "Ultra CDI!", "Yeee!",
  "Bang!", "Sky Lift!", "Fly High!", "Zooooom!", "Lift Me!",
  "Top G!", "Overdrive!", "Ayo!", "Hyper Move!", "Flash!",
  "Shiny!", "Brrrr!", "Woo!", "Magnum!", "Energy!",
  "Power Up!", "Hoooo!", "Kadabra!", "Shazam!", "Sunny!!!"
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
    text.innerText =
      funnyWords[Math.floor(Math.random() * funnyWords.length)];

    const button = document.getElementById("sunny-button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    text.style.left = rect.left + rect.width / 2 + "px";
    text.style.top = rect.top + "px";

    document.body.appendChild(text);

    setTimeout(() => text.remove(), 2500);
  };

  const handleClick = async () => {
    spawnFlyingText();
    try {
      const res = await fetch("/api/counter", { method: "POST" });
      const data = await res.json();
      setCount(data.value);
    } catch (e) {
      console.error("Failed to increment counter", e);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Sunny CDI 🌞</h1>
      <p style={styles.subtitle}>
        Total Global CDA: <span style={styles.counterNumber}>{count}</span>
      </p>

      <button
        id="sunny-button"
        style={styles.button}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={handleClick}
      >
        ⚡ Boost the CDI
      </button>

      <p style={styles.note}>
        Tap as many times as you want. Everyone in the world shares this count.
      </p>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: radial-gradient(circle at top, #222 0, #050505 55%);
          color: #fff;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Inter",
            sans-serif;
        }
        .flying-text {
          position: fixed;
          font-size: 22px;
          font-weight: 700;
          animation: flyUp 2.5s ease-out forwards;
          color: #ffdf6b;
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.9);
          pointer-events: none;
          transform: translateX(-50%);
        }
        @keyframes flyUp {
          0% {
            transform: translate(-50%, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -260px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "24px",
  },
  title: {
    fontSize: "42px",
    marginBottom: "8px",
    letterSpacing: "0.04em",
  },
  subtitle: {
    fontSize: "22px",
    marginBottom: "32px",
    opacity: 0.9,
  },
  counterNumber: {
    fontWeight: "800",
    fontSize: "28px",
    marginLeft: "8px",
    color: "#ffdf6b",
  },
  button: {
    fontSize: "22px",
    padding: "16px 40px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    background:
      "linear-gradient(135deg, #ffdf6b 0%, #ffb347 40%, #ff8c42 100%)",
    color: "#222",
    fontWeight: 800,
    boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
    transition: "transform 0.08s ease, box-shadow 0.1s ease",
  },
  note: {
    marginTop: "24px",
    fontSize: "14px",
    opacity: 0.7,
  },
};
