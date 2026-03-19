<template>
  <div class="farmer-detail-page">
    <router-link :to="`/dashboard/cooperatives/${farmer.cooperativeId}`" class="back-link">
      <span class="material-icons-outlined">arrow_back</span>
      Back
    </router-link>

    <div class="profile-card">
      <div class="profile-header">
        <img
          class="profile-avatar"
          :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(farmer.name)}&background=1ABB6E&color=fff&size=80`"
          :alt="farmer.name"
        />
        <div class="profile-info">
          <h1 class="profile-name">{{ farmer.name }}</h1>
          <p class="profile-id">Farmer ID: {{ farmer.id }}</p>
          <div class="profile-meta">
            <span class="badge" :class="farmer.status === 'Active' ? 'badge-active' : 'badge-pending'">
              {{ farmer.status }}
            </span>
            <span class="joined-date">
              <span class="material-icons-outlined">calendar_today</span>
              Joined {{ farmer.joinedDate }}
            </span>
          </div>
        </div>
        <router-link :to="`/dashboard/farmers/${farmer.id}/edit`" class="btn-edit-farmer">
          <span class="material-icons-outlined">edit</span>
          Edit Farmer
        </router-link>
      </div>

      <div class="info-columns">
        <div class="info-col">
          <h4 class="col-title">Contact Information</h4>
          <div class="col-item">
            <span class="material-icons-outlined col-icon">phone</span>
            <div>
              <span class="col-label">Phone</span>
              <span class="col-value">{{ farmer.phone }}</span>
            </div>
          </div>
          <div class="col-item">
            <div>
              <span class="col-label">Email</span>
              <span class="col-value">{{ farmer.email }}</span>
            </div>
          </div>
          <div class="col-item">
            <span class="material-icons-outlined col-icon">location_on</span>
            <div>
              <span class="col-label">Location</span>
              <span class="col-value">{{ farmer.location }}</span>
            </div>
          </div>
        </div>

        <div class="info-col">
          <h4 class="col-title">Personal Information</h4>
          <div class="col-item">
            <div>
              <span class="col-label">Gender</span>
              <span class="col-value">{{ farmer.gender }}</span>
            </div>
          </div>
          <div class="col-item">
            <div>
              <span class="col-label">Age</span>
              <span class="col-value">{{ farmer.age }} years</span>
            </div>
          </div>
          <div class="col-item">
            <div>
              <span class="col-label">Education</span>
              <span class="col-value">{{ farmer.education }}</span>
            </div>
          </div>
          <div class="col-item">
            <div>
              <span class="col-label">Farming Experience</span>
              <span class="col-value">{{ farmer.farmingExperience }}</span>
            </div>
          </div>
        </div>

        <div class="info-col">
          <h4 class="col-title">Cooperative Membership</h4>
          <div class="col-item">
            <div>
              <span class="col-label">Cooperative</span>
              <router-link :to="`/dashboard/cooperatives/${farmer.cooperativeId}`" class="coop-link">
                {{ farmer.cooperativeName }}
              </router-link>
            </div>
          </div>
          <div class="col-item">
            <div>
              <span class="col-label">Member Since</span>
              <span class="col-value">{{ farmer.memberSince }}</span>
            </div>
          </div>
          <div class="col-item">
            <div>
              <span class="col-label">Membership Status</span>
              <span class="col-value">{{ farmer.membershipStatus }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-cards-row">
      <div class="detail-box">
        <h3 class="box-title">
          <span class="material-icons-outlined box-icon green">eco</span>
          Farm Details
        </h3>
        <div class="box-row">
          <span class="box-label">Farm Size</span>
          <span class="box-value">{{ farmer.farmSize }}</span>
        </div>
        <div class="box-row">
          <span class="box-label">Primary Crops</span>
          <span class="box-value">{{ farmer.primaryCrops }}</span>
        </div>
        <div class="box-row">
          <span class="box-label">Land Ownership</span>
          <span class="box-value">{{ farmer.landOwnership }}</span>
        </div>
        <div class="box-row">
          <span class="box-label">Irrigation Access</span>
          <span class="box-value" :class="{ 'text-red': farmer.irrigationAccess === 'No' }">
            {{ farmer.irrigationAccess }}
          </span>
        </div>
      </div>

      <div class="detail-box">
        <h3 class="box-title">
          <span class="material-icons-outlined box-icon blue">trending_up</span>
          Production Data
        </h3>
        <div class="box-row">
          <span class="box-label">Last Harvest Yield</span>
          <span class="box-value">{{ farmer.lastHarvestYield }}</span>
        </div>
        <div class="box-row">
          <span class="box-label">Yield per Hectare</span>
          <span class="box-value">{{ farmer.yieldPerHectare }}</span>
        </div>
        <div class="box-row">
          <span class="box-label">Growing Season</span>
          <span class="box-value">{{ farmer.growingSeason }}</span>
        </div>
        <div class="box-row">
          <span class="box-label">Next Planting Date</span>
          <span class="box-value">{{ farmer.nextPlantingDate }}</span>
        </div>
      </div>
    </div>

    <div class="activity-banner">
      <span class="material-icons-outlined activity-icon">schedule</span>
      <div>
        <h4 class="activity-title">Recent Activity</h4>
        <p class="activity-text">{{ farmer.recentActivity }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { farmers } from '@/data/mockData'

const route = useRoute()

const farmer = computed(() => {
  return farmers.find((f) => f.id === route.params.id) || farmers[0]
})
</script>

<style scoped>
.farmer-detail-page {
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

.profile-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 28px;
  border: 1px solid var(--border);
  margin-bottom: 20px;
}

.profile-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 28px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-dark);
}

.profile-id {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.profile-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 8px;
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
.badge-pending {
  background: #FEF3C7;
  color: #92400E;
}

.joined-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
}
.joined-date .material-icons-outlined {
  font-size: 18px;
}

.btn-edit-farmer {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: var(--sidebar-bg);
  color: #fff;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}
.btn-edit-farmer:hover {
  background: #243040;
}
.btn-edit-farmer .material-icons-outlined {
  font-size: 18px;
}

.info-columns {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
}

.col-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: underline;
  margin-bottom: 14px;
}

.col-item {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.col-icon {
  color: var(--text-secondary);
  font-size: 18px;
  margin-top: 2px;
}

.col-label {
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
}

.col-value {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
}

.coop-link {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
}

.detail-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.detail-box {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 24px;
  border: 1px solid var(--border);
}

.box-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 18px;
}

.box-icon {
  font-size: 22px;
}
.box-icon.green { color: var(--primary); }
.box-icon.blue { color: #3B82F6; }

.box-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
}

.box-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.box-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
}

.text-red {
  color: var(--danger);
}

.activity-banner {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: var(--radius-lg);
  padding: 20px 24px;
}

.activity-icon {
  color: #3B82F6;
  font-size: 22px;
  margin-top: 2px;
}

.activity-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 4px;
}

.activity-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
