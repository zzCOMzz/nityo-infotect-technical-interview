<script setup lang="ts">
import { store } from '../store'
import { ref, reactive, watch, nextTick } from 'vue'

interface UserProfile {
  name: string | null
  email: string | null
  profilePicture: string
}

interface SaveStatus {
  isSaving: boolean
  showSaved: boolean
  lastSaved: Date | null
}

const profile = reactive<UserProfile>({
  name: store.name,
  email: store.email,
  profilePicture: 'https://placehold.co/150?text=IR'
})

const saveStatus = reactive<SaveStatus>({
  isSaving: false,
  showSaved: false,
  lastSaved: null
})

const fileInput = ref<HTMLInputElement | null>(null)

let saveTimer: number | null = null

const saveProfile = async (): Promise<void> => {
  saveStatus.isSaving = true
  saveStatus.showSaved = false
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Profile saved:', profile)
    
    saveStatus.lastSaved = new Date()
    saveStatus.showSaved = true
    
    setTimeout(() => {
      saveStatus.showSaved = false
    }, 2000)
    
  } catch (error) {
    console.error('Failed to save profile:', error)
  } finally {
    saveStatus.isSaving = false
  }
}

const debouncedSave = () => {
  if (saveTimer) {
    clearTimeout(saveTimer)
  }
  
  saveTimer = setTimeout(() => {
    saveProfile()
  }, 2000)
}

watch(
  () => ({ ...profile }),
  () => {
    debouncedSave()
  },
  { deep: true }
)

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      profile.profilePicture = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
</script>

<template>
  <div class="user-profile">
    <div class="profile-header">
      <h2>User Profile</h2>
      <div class="save-status">
        <div v-if="saveStatus.isSaving" class="status-indicator saving">
          <span class="spinner"></span>
          Saving...
        </div>
        <div v-else-if="saveStatus.showSaved" class="status-indicator saved">
          <span class="checkmark">✓</span>
          Saved!
        </div>
        <div v-else-if="saveStatus.lastSaved" class="status-indicator idle">
          Last saved: {{ saveStatus.lastSaved.toLocaleTimeString() }}
        </div>
      </div>
    </div>

    <form class="profile-form" @submit.prevent>

      <div class="form-group profile-picture-section">
        <label class="form-label">Profile Picture</label>
        <div class="profile-picture-container">
          <div class="profile-picture-wrapper">
            <img 
              :src="profile.profilePicture" 
              :alt="profile.name || 'profile'"
              class="profile-picture"
              @error="profile.profilePicture = 'https://via.placeholder.com/150/666/FFFFFF?text=No+Image'"
            />
            <div class="profile-picture-overlay" @click="triggerFileInput">
              <span class="camera-icon">📷</span>
              <span class="upload-text">Change Photo</span>
            </div>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="file-input"
            @change="handleFileUpload"
          />
        </div>
      </div>

      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input
          id="name"
          v-model="profile.name"
          type="text"
          class="form-input"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="profile.email"
          type="email"
          class="form-input"
          :class="{ 'invalid': profile.email && !isValidEmail(profile.email) }"
          placeholder="Enter your email address"
          required
        />
        <div v-if="profile.email && !isValidEmail(profile.email)" class="error-message">
          Please enter a valid email address
        </div>
      </div>
    </form>

    
  </div>
</template>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.profile-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: 600;
}

.save-status {
  min-width: 120px;
  text-align: right;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-indicator.saving {
  color: #2196F3;
}

.status-indicator.saved {
  color: #4CAF50;
}

.status-indicator.idle {
  color: #666;
  font-size: 0.8rem;
}

.spinner {
  width: 12px;
  height: 12px;
  border: 2px solid #e3f2fd;
  border-top: 2px solid #2196F3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.checkmark {
  font-size: 1rem;
  font-weight: bold;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #fafafa;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.invalid {
  border-color: #f44336;
  background: #fff5f5;
}

.error-message {
  color: #f44336;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.profile-picture-section {
  align-items: center;
}

.profile-picture-container {
  display: flex;
  justify-content: center;
}

.profile-picture-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.profile-picture-wrapper:hover {
  transform: scale(1.05);
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.profile-picture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
}

.profile-picture-wrapper:hover .profile-picture-overlay {
  opacity: 1;
}

.camera-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.file-input {
  display: none;
}


@media (max-width: 768px) {
  .user-profile {
    padding: 1rem;
    margin: 1rem;
  }
  
  .profile-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .save-status {
    min-width: auto;
    text-align: left;
  }
}
</style>