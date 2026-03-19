<template>
  <div class="form-page">
    <router-link to="/dashboard/cooperatives" class="back-link">
      <span class="material-icons-outlined">arrow_back</span>
      Back
    </router-link>

    <div class="form-card">
      <h1 class="form-title">{{ isEdit ? 'Edit Cooperative' : 'Create New Cooperative' }}</h1>

      <form @submit.prevent="handleSubmit">
        <section class="form-section">
          <h2 class="section-heading">Basic Information</h2>
          <div class="form-row">
            <div class="form-group full">
              <label>Cooperative Name *</label>
              <input v-model="form.name" type="text" :placeholder="isEdit ? '' : 'Enter cooperative name'" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Registration Number *</label>
              <input v-model="form.registrationNumber" type="text" :placeholder="isEdit ? '' : 'e.g., REG-2024-XXXX-GH'" required />
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="form.status">
                <option value="Active">Active</option>
                <option value="Deactivated">Deactivated</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group full">
              <label>Primary Crops *</label>
              <input v-model="form.primaryCrops" type="text" :placeholder="isEdit ? '' : 'e.g., Maize, Beans, Rice'" required />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Location Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Region *</label>
              <input v-model="form.region" type="text" placeholder="" required />
            </div>
            <div class="form-group">
              <label>District *</label>
              <input v-model="form.district" type="text" :placeholder="isEdit ? '' : 'e.g., Koforidua District'" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group full">
              <label>Physical Address *</label>
              <textarea v-model="form.address" rows="3" placeholder="Enter complete physical address" required></textarea>
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Contact Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Phone Number *</label>
              <input v-model="form.phone" type="tel" :placeholder="isEdit ? '' : '+233 XX XXX XXXX'" required />
            </div>
            <div class="form-group">
              <label>Email Address *</label>
              <input v-model="form.email" type="email" :placeholder="isEdit ? '' : 'contact@cooperative.org'" required />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Leadership Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Chairperson Name *</label>
              <input v-model="form.chairperson" type="text" :placeholder="isEdit ? '' : 'Enter chairperson\'s name'" required />
            </div>
            <div class="form-group">
              <label>Secretary Name *</label>
              <input v-model="form.secretary" type="text" :placeholder="isEdit ? '' : 'Enter secretary\'s name'" required />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h2 class="section-heading">Financial Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Bank Name *</label>
              <input v-model="form.bank" type="text" :placeholder="isEdit ? '' : 'e.g., Agricultural Development Bank'" required />
            </div>
            <div class="form-group">
              <label>Bank Account Number *</label>
              <input v-model="form.accountNumber" type="text" :placeholder="isEdit ? '' : 'Enter bank account number'" required />
            </div>
          </div>
        </section>

        <div class="form-actions">
          <button type="submit" class="btn-save">
            <span class="material-icons-outlined">save</span>
            {{ isEdit ? 'Save Changes' : 'Create Cooperative' }}
          </button>
          <router-link to="/dashboard/cooperatives" class="btn-cancel">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cooperatives } from '@/data/mockData'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'EditCooperative')

const form = ref({
  name: '',
  registrationNumber: '',
  status: 'Active',
  primaryCrops: '',
  region: '',
  district: '',
  address: '',
  phone: '',
  email: '',
  chairperson: '',
  secretary: '',
  bank: '',
  accountNumber: '',
})

onMounted(() => {
  if (isEdit.value && route.params.id) {
    const coop = cooperatives.find((c) => c.id === route.params.id)
    if (coop) {
      form.value = { ...coop }
    }
  }
})

function handleSubmit() {
  router.push('/dashboard/cooperatives')
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

.form-group {
  display: flex;
  flex-direction: column;
}
.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 6px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-size: 14px;
  color: var(--text-dark);
  background: #fff;
  transition: border-color 0.2s;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary);
}
.form-group textarea {
  resize: vertical;
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
  transition: background 0.15s;
}
.btn-cancel:hover {
  background: var(--bg-light);
}
</style>
