<template>
  <div class="login-wrapper">
    <div class="login-image">
      <img class="login-logo" src="@/assets/images/Logo.png" alt="Dimitra" />
      <img class="login-bg" src="@/assets/images/11 1.png" alt="" />
    </div>
    <div class="login-form-section">
      <div class="login-form-container">
        <h1 class="login-title">Welcome! Log In</h1>
        <p class="login-subtitle">Enter your credentials.</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="input-group">
            <span class="input-icon material-icons-outlined">mail</span>
            <input
              v-model="email"
              type="email"
              placeholder="john@example.com"
              required
              autocomplete="username"
            />
          </div>

          <div class="input-group">
            <span class="input-icon material-icons-outlined">lock</span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              required
              autocomplete="current-password"
            />
            <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
              <span class="material-icons-outlined">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </button>
          </div>

          <a href="#" class="forgot-link">Forgot Password?</a>

          <div class="captcha-placeholder">
            <label class="captcha-label">
              <input type="checkbox" v-model="captchaChecked" />
              <span>I'm not a robot</span>
            </label>
            <span class="captcha-badge">reCAPTCHA</span>
          </div>

          <button type="submit" class="login-btn">LOGIN</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const captchaChecked = ref(false)

function handleLogin() {
  router.push('/dashboard/cooperatives')
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  min-height: 100vh;
}

.login-image {
  position: relative;
  width: 48%;
  min-height: 100vh;
  overflow: hidden;
}

.login-logo {
  position: absolute;
  top: 28px;
  left: 28px;
  height: 36px;
  z-index: 2;
}

.login-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
}

.login-form-container {
  width: 100%;
  max-width: 420px;
}

.login-title {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.login-subtitle {
  color: var(--text-secondary);
  font-size: 15px;
  margin-bottom: 36px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 0 14px;
  height: 52px;
  transition: border-color 0.2s;
}
.input-group:focus-within {
  border-color: var(--primary);
}

.input-icon {
  color: var(--text-muted);
  margin-right: 10px;
  font-size: 20px;
}

.input-group input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: var(--text-dark);
  height: 100%;
}
.input-group input::placeholder {
  color: var(--text-muted);
}

.toggle-pw {
  background: none;
  color: var(--text-muted);
  display: flex;
  align-items: center;
}

.forgot-link {
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
  align-self: flex-start;
  margin-top: -4px;
}

.captcha-placeholder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  background: #fafafa;
}

.captcha-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
}

.captcha-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.captcha-badge {
  color: var(--text-muted);
  font-size: 11px;
}

.login-btn {
  width: 100%;
  height: 52px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-top: 8px;
  transition: background 0.2s;
}
.login-btn:hover {
  background: var(--primary-dark);
}

@media (max-width: 768px) {
  .login-image {
    display: none;
  }
  .login-form-section {
    padding: 24px;
  }
}
</style>
