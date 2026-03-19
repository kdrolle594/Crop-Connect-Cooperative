<template>
  <div class="cooperatives-page">
    <div class="breadcrumb">Dashboard &gt; Cooperatives</div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Cooperatives</h1>
        <p class="page-subtitle">Manage and view all agricultural cooperatives</p>
      </div>
      <router-link to="/dashboard/cooperatives/create" class="btn-create">
        CREATE COOPERATIVE
      </router-link>
    </div>

    <div class="table-controls">
      <div class="search-box">
        <span class="material-icons-outlined search-icon">search</span>
        <input v-model="searchQuery" type="text" placeholder="Search" />
      </div>
      <button class="btn-export">
        <span class="material-icons-outlined">description</span>
        EXPORT AS CSV
      </button>
      <div class="table-right-controls">
        <button class="btn-filter">
          Filter By
          <span class="material-icons-outlined">filter_alt</span>
        </button>
        <span class="page-info">{{ currentPage * pageSize - pageSize + 1 }} of {{ filteredCooperatives.length }}</span>
        <button class="page-btn" @click="currentPage > 1 && currentPage--">
          <span class="material-icons-outlined">chevron_left</span>
        </button>
        <button class="page-btn" @click="currentPage < totalPages && currentPage++">
          <span class="material-icons-outlined">chevron_right</span>
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Cooperative ID <span class="sort-icon">⇅</span></th>
            <th>Name <span class="sort-icon">⇅</span></th>
            <th>Region <span class="sort-icon">⇅</span></th>
            <th>No. of Members <span class="sort-icon">⇅</span></th>
            <th>Primary Crops <span class="sort-icon">⇅</span></th>
            <th>Status <span class="sort-icon">⇅</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="coop in paginatedCooperatives"
            :key="coop.id"
            class="table-row"
            @mouseenter="hoveredRow = coop.id"
            @mouseleave="hoveredRow = null"
          >
            <td>{{ coop.id }}</td>
            <td>{{ coop.name }}</td>
            <td>{{ coop.region }}</td>
            <td>{{ coop.members }}</td>
            <td>{{ coop.primaryCrops }}</td>
            <td>
              <span v-if="hoveredRow !== coop.id"
                :class="['status-text', coop.status === 'Active' ? 'active' : 'deactivated']"
              >
                {{ coop.status }}
              </span>
              <div v-else class="row-actions">
                <router-link :to="`/dashboard/cooperatives/${coop.id}`" class="action-btn" title="View">
                  <span class="material-icons-outlined">visibility</span>
                </router-link>
                <router-link :to="`/dashboard/cooperatives/${coop.id}/edit`" class="action-btn edit" title="Edit">
                  <span class="material-icons-outlined">edit</span>
                </router-link>
                <button class="action-btn assign" title="Assign Members">
                  <span class="material-icons-outlined">person_add</span>
                </button>
                <button class="action-btn delete" title="Delete">
                  <span class="material-icons-outlined">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="summary-cards">
      <div class="summary-card">
        <div class="summary-text">
          <span class="summary-label">Total Cooperatives</span>
          <span class="summary-value">{{ activeCooperatives.length }}</span>
        </div>
        <span class="material-icons-outlined summary-icon green">description</span>
      </div>
      <div class="summary-card">
        <div class="summary-text">
          <span class="summary-label">Total Members</span>
          <span class="summary-value">{{ totalMembers }}</span>
        </div>
        <span class="material-icons-outlined summary-icon green">groups</span>
      </div>
      <div class="summary-card">
        <div class="summary-text">
          <span class="summary-label">Active Status</span>
          <span class="summary-value">{{ activeCount }}</span>
        </div>
        <span class="material-icons-outlined summary-icon green">trending_up</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { cooperatives } from '@/data/mockData'

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = 10
const hoveredRow = ref(null)

const filteredCooperatives = computed(() => {
  if (!searchQuery.value) return cooperatives
  const q = searchQuery.value.toLowerCase()
  return cooperatives.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q),
  )
})

const totalPages = computed(() => Math.ceil(filteredCooperatives.value.length / pageSize))

const paginatedCooperatives = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredCooperatives.value.slice(start, start + pageSize)
})

const activeCooperatives = computed(() => cooperatives.filter((c) => c.status === 'Active'))
const totalMembers = computed(() => activeCooperatives.value.reduce((sum, c) => sum + c.members, 0))
const activeCount = computed(() => activeCooperatives.value.length)
</script>

<style scoped>
.cooperatives-page {
  max-width: 1280px;
}

.breadcrumb {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-dark);
}

.page-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.btn-create {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  background: var(--primary);
  color: #fff;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: background 0.2s;
}
.btn-create:hover {
  background: var(--primary-dark);
}

.table-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0 12px;
  height: 42px;
  background: #fff;
  min-width: 220px;
}
.search-icon {
  color: var(--text-muted);
  margin-right: 8px;
  font-size: 20px;
}
.search-box input {
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--text-dark);
  width: 100%;
}

.btn-export {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: 1.5px solid var(--primary);
  border-radius: var(--radius);
  color: var(--primary);
  background: transparent;
  font-weight: 600;
  font-size: 13px;
}
.btn-export:hover {
  background: var(--primary-light);
}

.table-right-controls {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-filter {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 14px;
}

.page-info {
  font-size: 13px;
  color: var(--text-secondary);
}

.page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
}
.page-btn:hover {
  background: var(--bg-light);
}

.table-wrapper {
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: 24px;
}

.data-table {
  width: 100%;
}

.data-table thead tr {
  background: var(--primary);
}

.data-table thead th {
  padding: 14px 18px;
  text-align: left;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.sort-icon {
  opacity: 0.7;
  margin-left: 4px;
}

.data-table tbody tr {
  border-bottom: 1px solid var(--border);
  transition: background 0.1s;
}
.data-table tbody tr:hover {
  background: #f9fafb;
}

.data-table td {
  padding: 14px 18px;
  font-size: 14px;
  color: var(--text-dark);
}

.status-text.active {
  color: var(--text-dark);
}
.status-text.deactivated {
  color: var(--danger);
}

.row-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  background: #fff;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
}
.action-btn:hover {
  background: var(--bg-light);
}
.action-btn.edit {
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}
.action-btn.assign {
  background: var(--sidebar-bg);
  color: #fff;
  border-color: var(--sidebar-bg);
}
.action-btn.delete {
  color: var(--text-secondary);
}

.action-btn .material-icons-outlined {
  font-size: 18px;
}

.summary-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  min-width: 200px;
  gap: 24px;
}

.summary-text {
  display: flex;
  flex-direction: column;
}

.summary-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.summary-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-dark);
  margin-top: 4px;
}

.summary-icon {
  font-size: 32px;
}
.summary-icon.green {
  color: var(--primary);
}
</style>
