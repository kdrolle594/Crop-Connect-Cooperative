<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <img src="@/assets/images/Logo.png" alt="Dimitra" />
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        class="nav-item"
        :class="{ active: isActive(item) }"
      >
        <span class="material-icons-outlined nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
        <span v-if="item.children" class="material-icons-outlined nav-arrow">chevron_right</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { label: 'Cooperatives', icon: 'groups', to: '/dashboard/cooperatives' },
  { label: 'Admin Roles', icon: 'admin_panel_settings', to: '#' },
  { label: 'Membership Plan', icon: 'card_membership', to: '#' },
  { label: 'Permissions', icon: 'security', to: '#' },
  { label: 'Activation Keys', icon: 'vpn_key', to: '#' },
  { label: 'Crops Overview', icon: 'eco', to: '#', children: true },
  { label: 'Survey Builder', icon: 'poll', to: '#' },
  { label: 'Role Requests', icon: 'description', to: '#' },
  { label: 'Tickets', icon: 'confirmation_number', to: '#' },
  { label: 'Payments', icon: 'payments', to: '#' },
  { label: 'Activity Log', icon: 'history', to: '#' },
  { label: 'Settings', icon: 'settings', to: '#' },
]

function isActive(item) {
  if (item.to === '/dashboard/cooperatives') {
    return route.path.startsWith('/dashboard/cooperatives')
  }
  return route.path === item.to
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-logo {
  padding: 20px 24px 28px;
}
.sidebar-logo img {
  height: 32px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius);
  color: #94A3B8;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
  text-decoration: none;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}

.nav-item.active {
  background: var(--sidebar-active);
  color: #fff;
}

.nav-icon {
  font-size: 20px;
}

.nav-label {
  flex: 1;
}

.nav-arrow {
  font-size: 18px;
  opacity: 0.6;
}
</style>
