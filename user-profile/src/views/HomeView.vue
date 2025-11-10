<script setup lang="ts">
import { store } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToTodos = () => {
  router.push('/todo')
}

const goToProfile = () => {
  router.push('/profile')
}
</script>

<template>
  <main>
    <div class="home-container">
      <div class="welcome-section">
        <h1>Welcome{{ store.name ? `, ${store.name}` : '' }}!</h1>
        <p class="subtitle">What would you like to do today?</p>
      </div>
      
      <div class="action-cards">
        <div class="card" @click="goToTodos">
          <div class="card-icon">
            <i class="pi pi-list"></i>
          </div>
          <h3>Todo List</h3>
          <p>Manage daily tasks </p>
          <button class="card-button">Go to Todos</button>
        </div>
        
        <div class="card" @click="goToProfile">
          <div class="card-icon">
            <i class="pi pi-user"></i>
          </div>
          <h3>Profile</h3>
          <p>View and edit your personal information</p>
          <button class="card-button">View Profile</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  min-height: calc(100vh - 64px);
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-section h1 {
  color: white;
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.action-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 800px;
  width: 100%;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.card h3 {
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.card p {
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.card-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.card-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .home-container {
    padding: 2rem 1rem;
  }
  
  .welcome-section h1 {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
  
  .action-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .card {
    padding: 2rem;
  }
  
  .card-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .welcome-section h1 {
    font-size: 2rem;
  }
  
  .card {
    padding: 1.5rem;
  }
}
</style>
