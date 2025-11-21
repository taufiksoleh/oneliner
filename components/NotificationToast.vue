<template>
  <div id="notification" class="notification">
    Success!
  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  padding: 1rem 1.5rem;
  background: var(--success);
  color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  opacity: 0;
  transform: translateX(400px) scale(0.9);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1000;
  max-width: 320px;
  font-weight: 500;
  font-size: 0.9375rem;
  backdrop-filter: blur(10px);
}

.notification.show {
  opacity: 1;
  transform: translateX(0) scale(1);
}

@media (max-width: 768px) {
  .notification {
    left: 1rem;
    right: 1rem;
    max-width: calc(100% - 2rem);
  }
}
</style>
