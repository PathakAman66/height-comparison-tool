import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";

export default function App() {
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState("cm");
  const chartRef = useRef(null);

  const doorHeight = 210;
  const containerHeight = 350;

  const convertToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}ft ${inches}in`;
  };

  const heightInCm =
    unit === "cm" ? height : height * 30.48;

  const scaleFactor =
    heightInCm > containerHeight
      ? containerHeight / heightInCm
      : 1;

  const scaledHeight = heightInCm * scaleFactor;
  const scaledDoor = doorHeight * scaleFactor;

  const downloadImage = () => {
    htmlToImage.toPng(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "height-comparison.png";
      link.href = dataUrl;
      link.click();
    });
  };

  const buttonStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef2ff, #f8fafc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          width: "750px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
          textAlign: "center"
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            fontWeight: "600",
            color: "#1e293b"
          }}
        >
          Height Comparison Tool
        </h2>

        {/* Controls */}
        <div style={{ marginBottom: "25px" }}>
          <input
            type="number"
            min="50"
            max="250"
            value={height}
            onChange={(e) =>
              setHeight(Number(e.target.value))
            }
            style={{
              padding: "10px",
              width: "140px",
              marginRight: "12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1"
            }}
          />

          <button
            onClick={() =>
              setUnit(unit === "cm" ? "ft" : "cm")
            }
            style={{
              ...buttonStyle,
              background: "#3b82f6",
              color: "white",
              marginRight: "10px"
            }}
          >
            Toggle to {unit === "cm" ? "ft" : "cm"}
          </button>

          <button
            onClick={downloadImage}
            style={{
              ...buttonStyle,
              background: "#10b981",
              color: "white"
            }}
          >
            Download Image
          </button>
        </div>

        <p
          style={{
            fontSize: "14px",
            color: "#64748b",
            marginBottom: "15px"
          }}
        >
          Comparison is scaled proportionally for
          better visualization.
        </p>

        {/* Chart */}
        <div
          ref={chartRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "80px",
            height: `${containerHeight}px`,
            background: "#f1f5f9",
            padding: "30px",
            borderRadius: "12px"
          }}
        >
          {/* Person */}
          <div
            style={{
              width: "100px",
              height: `${scaledHeight}px`,
              background:
                "linear-gradient(to top, #2563eb, #3b82f6)",
              color: "white",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              borderRadius: "12px",
              transition:
                "height 0.4s ease, transform 0.2s ease",
              fontWeight: "600"
            }}
          >
            {unit === "cm"
              ? `${height} cm`
              : convertToFeetInches(heightInCm)}
          </div>

          {/* Door */}
          <div
            style={{
              width: "100px",
              height: `${scaledDoor}px`,
              background:
                "linear-gradient(to top, #374151, #4b5563)",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              borderRadius: "12px",
              paddingBottom: "8px"
            }}
          >
            <div>Door</div>
            <div style={{ fontSize: "12px" }}>
              210 cm
            </div>
          </div>
        </div>

        <p
          style={{
            marginTop: "25px",
            fontWeight: "600",
            color: "#0f172a"
          }}
        >
          {heightInCm > doorHeight
            ? "You are taller than the door."
            : "You are shorter than the door."}
        </p>
      </div>
    </div>
  );
}