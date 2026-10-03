<template>
  <canvas ref="canvasRef" class="herb-atmosphere-canvas" aria-hidden="true"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const canvasRef = ref(null);
let animationFrameId = null;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', onResize);

  // 漂浮草木花粉與微光微粒
  const particles = Array.from({ length: 32 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.2 + 0.8,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: -Math.random() * 0.45 - 0.1, // 緩緩向上飄逸
    opacity: Math.random() * 0.45 + 0.15,
    pulseSpeed: Math.random() * 0.02 + 0.005,
    angle: Math.random() * Math.PI * 2
  }));

  const render = () => {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.pulseSpeed;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentOpacity = p.opacity + Math.sin(p.angle) * 0.15;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(64, 145, 108, ${Math.max(0.05, currentOpacity)})`;
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(render);
  };

  render();

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  });
});
</script>

<style scoped>
.herb-atmosphere-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  opacity: 0.7;
}
</style>
