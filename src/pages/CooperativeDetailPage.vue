<template>
  <div class="detail-page">
    <router-link to="/dashboard/cooperatives" class="back-link">
      <span class="material-icons-outlined">arrow_back</span>
      Back to Cooperatives
    </router-link>

    <div class="hero-banner">
      <img src="@/assets/images/Image (Green Valley Farmers Association).png" alt="Cooperative" class="hero-img" />
      <div class="hero-overlay">
        <h1 class="hero-title">{{ coop.name }}</h1>
        <p class="hero-id">Cooperative ID: {{ coop.id }}</p>
      </div>
    </div>

    <div class="detail-card">
      <div class="detail-top-row">
        <div class="detail-badges">
          <span class="badge" :class="coop.status === 'Active' ? 'badge-active' : 'badge-deactivated'">
            {{ coop.status }}
          </span>
          <span class="established">
            <span class="material-icons-outlined">calendar_today</span>
            Established {{ coop.established }}
          </span>
        </div>
        <router-link :to="`/dashboard/cooperatives/${coop.id}/edit`" class="btn-edit">
          <span class="material-icons-outlined">edit</span>
          Edit Cooperative
        </router-link>
      </div>

      <div class="stat-cards">
        <div class="stat-card">
          <span class="material-icons-outlined stat-icon blue">groups</span>
          <span class="stat-label blue">Total Members</span>
          <span class="stat-value">{{ coop.members }}</span>
        </div>
        <div class="stat-card">
          <span class="material-icons-outlined stat-icon red">eco</span>
          <span class="stat-label red">Total Land Area</span>
          <span class="stat-value">{{ coop.totalLandArea }}</span>
          <span class="stat-unit">hectares</span>
        </div>
        <div class="stat-card">
          <span class="material-icons-outlined stat-icon orange">trending_up</span>
          <span class="stat-label orange">Average Yield</span>
          <span class="stat-value">{{ coop.averageYield }}</span>
          <span class="stat-unit">tons/harvest</span>
        </div>
        <div class="stat-card">
          <span class="material-icons-outlined stat-icon green">description</span>
          <span class="stat-label green">Active Farmers</span>
          <span class="stat-value">{{ coop.activeFarmers }}</span>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-section">
          <h3 class="section-title">Basic Information</h3>
          <div class="info-row">
            <span class="info-label">Registration Number</span>
            <span class="info-value">{{ coop.registrationNumber }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Region</span>
            <span class="info-value">{{ coop.region }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">District</span>
            <span class="info-value">{{ coop.district }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Primary Crops</span>
            <span class="info-value">{{ coop.primaryCrops }}</span>
          </div>
        </div>

        <div class="info-section">
          <h3 class="section-title">Contact Information</h3>
          <div class="info-row">
            <span class="info-label">Address</span>
            <span class="info-value">{{ coop.address }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Phone</span>
            <span class="info-value">{{ coop.phone }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value">{{ coop.email }}</span>
          </div>
        </div>

        <div class="info-section">
          <h3 class="section-title">Leadership</h3>
          <div class="info-row">
            <span class="info-label">Chairperson</span>
            <span class="info-value">{{ coop.chairperson }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Secretary</span>
            <span class="info-value">{{ coop.secretary }}</span>
          </div>
        </div>

        <div class="info-section">
          <h3 class="section-title">Financial Information</h3>
          <div class="info-row">
            <span class="info-label">Bank</span>
            <span class="info-value">{{ coop.bank }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Account Number</span>
            <span class="info-value">{{ coop.accountNumber }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="members-section detail-card">
      <h2 class="members-title">Members ({{ coopFarmers.length }})</h2>
      <table class="members-table">
        <thead>
          <tr>
            <th>Farmer ID</th>
            <th>Name</th>
            <th>Farm Size</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="farmer in coopFarmers" :key="farmer.id">
            <td>{{ farmer.id }}</td>
            <td>{{ farmer.name }}</td>
            <td>{{ farmer.farmSize }}</td>
            <td>
              <span class="badge" :class="farmer.status === 'Active' ? 'badge-active' : 'badge-pending'">
                {{ farmer.status }}
              </span>
            </td>
            <td>
              <router-link :to="`/dashboard/farmers/${farmer.id}`" class="view-link">View Details</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { cooperatives, farmers } from '@/data/mockData'

const route = useRoute()

const coop = computed(() => {
  return cooperatives.find((c) => c.id === route.params.id) || cooperatives[0]
})

const coopFarmers = computed(() => {
  return farmers.filter((f) => f.cooperativeId === coop.value.id)
})
</script>

<style scoped>
.detail-page {
  max-width: 800px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-dark);
  font-weight: 500;
  margin-bottom: 20px;
}
.back-link:hover {
  color: var(--primary);
}

.hero-banner {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  height: 200px;
  margin-bottom: 0;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 28px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
}

.hero-title {
  font-size: 28px;
  font-weight: 800;
}

.hero-id {
  font-size: 14px;
  opacity: 0.85;
  margin-top: 4px;
}

.detail-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1px solid var(--border);
  margin-top: 20px;
}

.detail-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.detail-badges {
  display: flex;
  align-items: center;
  gap: 14px;
}

.badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}
.badge-active {
  background: #D1FAE5;
  color: #065F46;
}
.badge-deactivated {
  background: #FEE2E2;
  color: #991B1B;
}
.badge-pending {
  background: #FEF3C7;
  color: #92400E;
}

.established {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
}
.established .material-icons-outlined {
  font-size: 18px;
}

.btn-edit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: var(--sidebar-bg);
  color: #fff;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s;
}
.btn-edit:hover {
  background: #243040;
}
.btn-edit .material-icons-outlined {
  font-size: 18px;
}

.stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.stat-icon {
  font-size: 28px;
  margin-bottom: 8px;
}
.stat-icon.blue { color: #3B82F6; }
.stat-icon.red { color: #EF4444; }
.stat-icon.orange { color: #F59E0B; }
.stat-icon.green { color: var(--primary); }

.stat-label {
  font-size: 13px;
  font-weight: 500;
}
.stat-label.blue { color: #3B82F6; }
.stat-label.red { color: #EF4444; }
.stat-label.orange { color: #F59E0B; }
.stat-label.green { color: var(--primary); }

.stat-value {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-dark);
  margin-top: 4px;
}

.stat-unit {
  font-size: 13px;
  color: var(--text-secondary);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 16px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-dark);
  text-align: right;
}

.members-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.members-table thead tr {
  background: var(--sidebar-bg);
}
.members-table thead th {
  padding: 12px 18px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
}
.members-table tbody tr {
  border-bottom: 1px solid var(--border);
}
.members-table td {
  padding: 14px 18px;
  font-size: 14px;
}

.view-link {
  color: var(--primary);
  font-weight: 600;
  font-size: 14px;
}
.view-link:hover {
  text-decoration: underline;
}
</style>
