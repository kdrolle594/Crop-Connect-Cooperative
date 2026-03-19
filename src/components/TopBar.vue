<template>
  <header class="topbar">
    <button class="hamburger">
      <span class="material-icons-outlined">menu</span>
    </button>

    <div class="topbar-right">
      <button class="icon-btn">
        <span class="material-icons-outlined">settings</span>
      </button>
      <button class="icon-btn">
        <span class="material-icons-outlined">notifications</span>
      </button>
      <div class="user-info">
        <img
          class="user-avatar"
          src="https://ui-avatars.com/api/?name=John+Doe&background=1ABB6E&color=fff&size=40"
          alt="avatar"
        />
        <div class="user-text">
          <span class="user-name">John Doe</span>
          <span class="user-email">Johndoe@example.com</span>
        </div>
        <span class="material-icons-outlined user-arrow">expand_more</span>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 28px;
  background: #fff;
  border-bottom: 1px solid var(--border);
}

.hamburger {
  background: none;
  color: var(--text-dark);
}
.hamburger .material-icons-outlined {
  font-size: 26px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  background: none;
  color: var(--text-secondary);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.15s;
}
.icon-btn:hover {
  background: var(--bg-light);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 8px;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-text {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
}

.user-email {
  font-size: 12px;
  color: var(--text-secondary);
}

.user-arrow {
  color: var(--text-secondary);
  font-size: 20px;
}
</style>
