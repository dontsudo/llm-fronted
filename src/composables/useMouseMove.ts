import { onMounted, onUnmounted } from "vue";

export default function useMouseMove() {
  const mouseMoveEvent = (e: MouseEvent) => {
    const scale = window.visualViewport?.scale;
    if (scale === 1) {
      const body = document.body;

      const targetX = e.clientX;
      const targetY = e.clientY;

      body.style.setProperty("--x", `${targetX}px`);
      body.style.setProperty("--y", `${targetY}px`);
    }
  };

  onMounted(() => {
    document.addEventListener("mousemove", mouseMoveEvent);
  });

  onUnmounted(() => {
    document.removeEventListener("mousemove", mouseMoveEvent);
  });
}
