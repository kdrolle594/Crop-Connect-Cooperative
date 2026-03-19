<template>
  <div class="dashboard">
    <SidebarNav />
    <div class="dashboard-main">
      <TopBar />
      <div class="dashboard-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarNav from '@/components/SidebarNav.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
}

.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.dashboard-content {
  flex: 1;
  padding: 24px 32px;
  background: var(--bg-light);
}
</style>
