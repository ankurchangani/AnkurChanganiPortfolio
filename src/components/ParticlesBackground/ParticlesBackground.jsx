import { useEffect, useRef } from "react";

const ParticlesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#635985", "#443C68", "#393053", "#18122B"];

    const particles = Array.from({ length: 30 }, () => {
      const isSquare = Math.random() > 0.5; // 50% Square, 50% Circle
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isSquare ? 50 : Math.random() * 5 + 5, // Square = 50px, Circle = 5-10px
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: isSquare ? "square" : "circle",
      };
    });

    function draw3DSquare(ctx, x, y, size, color) {
      const shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.fillStyle = color;
      
      // Draw the main square
      ctx.fillRect(x, y, size, size);
      
      // Right shadow
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size + 10, y + 10);
      ctx.lineTo(x + size + 10, y + size + 10);
      ctx.lineTo(x + size, y + size);
      ctx.fill();
      
      // Bottom shadow
      ctx.fillStyle = shadowColor;
      ctx.beginPath();
      ctx.moveTo(x, y + size);
      ctx.lineTo(x + 10, y + size + 10);
      ctx.lineTo(x + size + 10, y + size + 10);
      ctx.lineTo(x + size, y + size);
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        if (p.shape === "circle") {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          draw3DSquare(ctx, p.x, p.y, p.size, p.color);
        }

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default ParticlesCanvas;
