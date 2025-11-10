<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

interface LoginForm {
  email: string
  password: string
}

interface LoginState {
  isLoading: boolean
  error: string | null
  showPassword: boolean
}

const router = useRouter()

const form = reactive<LoginForm>({
  email: '',
  password: ''
})

const state = reactive<LoginState>({
  isLoading: false,
  error: null,
  showPassword: false
})

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isFormValid = (): boolean => {
  return form.email.length > 0 && 
         form.password.length >= 6 && 
         isValidEmail(form.email)
}

const handleLogin = async () => {
  if (!isFormValid()) {
    state.error = 'Please fill in all fields correctly'
    return
  }

  state.isLoading = true
  state.error = null

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (form.email === 'irvan@email.com' && form.password === 'password123') {
      console.log('Login successful:', form.email)
      
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', form.email)
      window.dispatchEvent(new Event('storage'))

      router.push('/profile')
    } else {
      state.error = 'Invalid email or password'
    }
  } catch (error) {
    state.error = 'Login failed. Please try again.'
    console.error('Login error:', error)
  } finally {
    state.isLoading = false
  }
}

const togglePasswordVisibility = () => {
  state.showPassword = !state.showPassword
}

const clearError = () => {
  if (state.error) {
    state.error = null
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>Welcome</h1>
        <p>Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <div class="input-container">
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              :class="{ 
                'invalid': form.email && !isValidEmail(form.email),
                'valid': form.email && isValidEmail(form.email)
              }"
              placeholder="Enter your email"
              required
              @input="clearError"
            />
            <span class="input-icon">📧</span>
          </div>
          <div v-if="form.email && !isValidEmail(form.email)" class="error-text">
            Please enter a valid email address
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <div class="input-container">
            <input
              id="password"
              v-model="form.password"
              :type="state.showPassword ? 'text' : 'password'"
              class="form-input"
              :class="{ 
                'invalid': form.password && form.password.length < 6,
                'valid': form.password && form.password.length >= 6
              }"
              placeholder="Enter your password"
              required
              @input="clearError"
            />
            <button
              type="button"
              class="password-toggle"
              @click="togglePasswordVisibility"
              :title="state.showPassword ? 'Hide password' : 'Show password'"
            >
              {{ state.showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <div v-if="form.password && form.password.length < 6" class="error-text">
            Password must be at least 6 characters
          </div>
        </div>

        <div v-if="state.error" class="error-message">
          <span class="error-icon">⚠️</span>
          {{ state.error }}
        </div>

        <button
          type="submit"
          class="login-button"
          :disabled="!isFormValid() || state.isLoading"
          :class="{ 'loading': state.isLoading }"
        >
          <span v-if="state.isLoading" class="spinner"></span>
          <span v-else>Sign In</span>
        </button>
      </form>

      
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: #1f2937;
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.login-header p {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  padding-right: 2.5rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.valid {
  border-color: #10b981;
  background: #f0fdf4;
}

.form-input.invalid {
  border-color: #ef4444;
  background: #fef2f2;
}

.input-icon {
  position: absolute;
  right: 0.75rem;
  font-size: 1.1rem;
  color: #9ca3af;
  pointer-events: none;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.password-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.error-text {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  padding: 0.75rem;
  color: #dc2626;
  font-size: 0.9rem;
}

.error-icon {
  font-size: 1rem;
}

.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.login-button.loading {
  cursor: wait;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
    margin: 0.5rem;
  }
  
  .login-header h1 {
    font-size: 1.5rem;
  }
  
  .form-input {
    padding: 0.75rem;
    padding-right: 2.25rem;
  }
}
</style>