<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { store } from './store'

const router = useRouter()
const isAuthenticated = ref(false)

const checkAuth = () => {
  isAuthenticated.value = store.hasLogin
}

const logout = () => {
  localStorage.removeItem('token')
  store.updateHasLogin(false)
  store.updateProfile({ name : null, email : null})
  router.push('/login')
}

onMounted(() => {
  checkAuth()
})

window.addEventListener('storage', checkAuth)
</script>

<template>
  <div id="app">
    <header class="top-navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <h1>My App</h1>
        </div>
        
        <nav class="navbar-menu">
          <ul class="navbar-nav">
            <template v-if="isAuthenticated">
              <li class="nav-item">
                <RouterLink to="/todo" class="nav-link" @click="checkAuth">
                  Todo List
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/profile" class="nav-link" @click="checkAuth">
                  Profile
                </RouterLink>
              </li>
              <li class="nav-item">
                <button @click="logout" class="nav-link logout-btn">
                  Logout
                </button>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <RouterLink to="/login" class="nav-link">
                  Login
                </RouterLink>
              </li>
            </template>
          </ul>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.navbar-brand h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  position: relative;
}

.nav-link:hover {
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-container {
    padding: 0 1rem;
    height: 56px;
  }
  
  .navbar-brand h1 {
    font-size: 1.25rem;
  }
  
  .navbar-nav {
    gap: 0.25rem;
  }
  
  .nav-link {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .nav-icon {
    font-size: 1rem;
  }
  
  .main-content {
    padding: 1rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .navbar-container {
    flex-direction: column;
    height: auto;
    padding: 0.75rem;
    gap: 0.5rem;
  }
  
  .navbar-brand {
    order: 1;
  }
  
  .navbar-menu {
    order: 2;
  }
}
</style>
