<template>
  <div class="form-page">
    <router-link :to="`/dashboard/farmers/${route.params.id}`" class="back-link">
      <span class="material-icons-outlined">arrow_back</span>
      Back
    </router-link>

    <div class="form-card">
      <h1 class="form-title">Edit Farmer</h1>

      <form @submit.prevent="handleSubmit">
        <section class="form-section">
          <h2 class="section-heading">Personal Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Full Name *</label>
              <input v-model="form.name" type="text" placeholder="Enter farmer's full name" required />
            </div>
            <div class="form-group">
              <label>Gender *</label>
              <select v-model="form.gender" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Age</label>
              <input v-model="form.age" type="number" placeholder="Enter age" />
            </div>
            <div class="form-group">
              <label>Education Level</label>
              <select v-model="form.education">
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Tertiary">Tertiary</option>
              </select>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Contact Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Phone Number *</label>
              <input v-model="form.phone" type="tel" placeholder="+233 XX XXX XXXX" required />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input v-model="form.email" type="email" placeholder="email@example.com" />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Location Information</h2>
          <div class="form-row three-col">
            <div class="form-group">
              <label>Region *</label>
              <input v-model="form.region" type="text" placeholder="e.g., Eastern Region" required />
            </div>
            <div class="form-group">
              <label>District *</label>
              <input v-model="form.district" type="text" placeholder="e.g., Koforidua" required />
            </div>
            <div class="form-group">
              <label>Village/Town</label>
              <input v-model="form.village" type="text" placeholder="e.g., Aboabo" />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Farm Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Farm Size (hectares) *</label>
              <input v-model="form.farmSize" type="text" placeholder="e.g., 5.2" required />
            </div>
            <div class="form-group">
              <label>Primary Crops *</label>
              <input v-model="form.primaryCrops" type="text" placeholder="e.g., Maize, Cassava" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Land Ownership</label>
              <select v-model="form.landOwnership">
                <option value="">Select</option>
                <option value="Owned">Owned</option>
                <option value="Leased">Leased</option>
                <option value="Communal">Communal</option>
              </select>
            </div>
            <div class="form-group">
              <label>Irrigation Access</label>
              <select v-model="form.irrigationAccess">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Cooperative Membership</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Cooperative *</label>
              <input v-model="form.cooperativeName" type="text" required />
            </div>
            <div class="form-group">
              <label>Membership Status</label>
              <select v-model="form.membershipStatus">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-save">
            <span class="material-icons-outlined">save</span>
            Save Changes
          </button>
          <router-link :to="`/dashboard/farmers/${route.params.id}`" class="btn-cancel">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { farmers } from '@/data/mockData'

const route = useRoute()
const router = useRouter()

const form = ref({
  name: '',
  gender: '',
  age: '',
  education: '',
  phone: '',
  email: '',
  region: '',
  district: '',
  village: '',
  farmSize: '',
  primaryCrops: '',
  landOwnership: '',
  irrigationAccess: '',
  cooperativeName: '',
  membershipStatus: 'Active',
})

onMounted(() => {
  const farmer = farmers.find((f) => f.id === route.params.id)
  if (farmer) {
    const locationParts = farmer.location ? farmer.location.split(', ') : []
    form.value = {
      name: farmer.name,
      gender: farmer.gender,
      age: farmer.age,
      education: farmer.education,
      phone: farmer.phone,
      email: farmer.email,
      region: locationParts[2] || '',
      district: locationParts[1] || '',
      village: locationParts[0] || '',
      farmSize: farmer.farmSize?.replace(' hectares', '') || '',
      primaryCrops: farmer.primaryCrops,
      landOwnership: farmer.landOwnership,
      irrigationAccess: farmer.irrigationAccess,
      cooperativeName: farmer.cooperativeName,
      membershipStatus: farmer.membershipStatus,
    }
  }
})

function handleSubmit() {
  router.push(`/dashboard/farmers/${route.params.id}`)
}
</script>

<style scoped>
.form-page {
  max-width: 780px;
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

.form-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 32px;
  border: 1px solid var(--border);
}

.form-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 28px;
}

.form-section {
  margin-bottom: 28px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f3f4f6;
}

.section-heading {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 16px;
}

.form-row.three-col {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 6px;
}

.form-group input,
.form-group select {
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-size: 14px;
  color: var(--text-dark);
  background: #fff;
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group select:focus {
  border-color: var(--primary);
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: var(--sidebar-bg);
  color: #fff;
  border-radius: 28px;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s;
}
.btn-save:hover {
  background: #243040;
}
.btn-save .material-icons-outlined {
  font-size: 18px;
}

.btn-cancel {
  padding: 12px 28px;
  border: 1.5px solid var(--border);
  border-radius: 28px;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 14px;
  background: transparent;
}
.btn-cancel:hover {
  background: var(--bg-light);
}
</style>
