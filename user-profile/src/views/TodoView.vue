<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from '../axios'

interface Todo {
  id: string
  title: string
  completed: boolean
  userEmail?: string
}

interface TodoState {
  todos: Todo[]
  isLoading: boolean
  error: string | null
}

interface NewTodo {
  title: string
}

const state = reactive<TodoState>({
  todos: [],
  isLoading: false,
  error: null
})

const newTodo = reactive<NewTodo>({
  title: ''
})

const isAddingTodo = ref(false)

const fetchTodos = async () => {
  state.isLoading = true
  state.error = null
  
  try {
    const response = await axios.get('/api/todos')
    state.todos = response.data
  } catch (error: any) {
    state.error = error.response?.data?.error || 'Failed to fetch todos'
    console.error('Error fetching todos:', error)
  } finally {
    state.isLoading = false
  }
}

// Add new todo
const addTodo = async () => {
  if (!newTodo.title.trim()) return
  
  isAddingTodo.value = true
  state.error = null
  
  try {
    const response = await axios.post('/api/todos', {
      title: newTodo.title.trim(),
      completed: false
    })
    
    state.todos.push(response.data)
    newTodo.title = ''
  } catch (error: any) {
    state.error = error.response?.data?.error || 'Failed to add todo'
    console.error('Error adding todo:', error)
  } finally {
    isAddingTodo.value = false
  }
}

const toggleTodo = async (todo: Todo) => {
  const originalCompleted = todo.completed
  todo.completed = !todo.completed 
  
  try {
    await axios.patch(`/api/todos/${todo.id}`, {
      completed: todo.completed,
      title: todo.title
    })
  } catch (error: any) {
    todo.completed = originalCompleted
    state.error = error.response?.data?.error || 'Failed to update todo'
    console.error('Error updating todo:', error)
  }
}

const deleteTodo = async (todoId: string) => {
  const originalTodos = [...state.todos]
  state.todos = state.todos.filter(todo => todo.id !== todoId) 
  
  try {
    await axios.delete(`/api/todos/${todoId}`)
  } catch (error: any) {
    state.todos = originalTodos 
    state.error = error.response?.data?.error || 'Failed to delete todo'
    console.error('Error deleting todo:', error)
  }
}

const handleEnterKey = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addTodo()
  }
}

const clearError = () => {
  state.error = null
}

onMounted(() => {
  fetchTodos()
})

const completedTodos = () => state.todos.filter(todo => todo.completed)
const incompleteTodos = () => state.todos.filter(todo => !todo.completed)
const totalTodos = () => state.todos.length
</script>

<template>
  <div class="todo-container">
    <div class="todo-header">
      <h2>My Todo List</h2>
      <div class="todo-stats">
        <span class="stat">
          <i class="pi pi-list"></i>
          Total: {{ totalTodos() }}
        </span>
        <span class="stat">
          <i class="pi pi-check-circle"></i>
          Completed: {{ completedTodos().length }}
        </span>
        <span class="stat">
          <i class="pi pi-clock"></i>
          Pending: {{ incompleteTodos().length }}
        </span>
      </div>
    </div>

    <div class="add-todo-form">
      <div class="input-container">
        <input
          v-model="newTodo.title"
          type="text"
          class="todo-input"
          placeholder="Create your todo"
          @keypress="handleEnterKey"
          :disabled="isAddingTodo"
        />
        <button
          @click="addTodo"
          class="add-button"
          :disabled="!newTodo.title.trim() || isAddingTodo"
        >
          <span v-if="isAddingTodo" class="spinner"></span>
          <i v-else class="pi pi-plus"></i>
        </button>
      </div>
    </div>

    <div v-if="state.error" class="error-message">
      <span class="error-icon">⚠️</span>
      {{ state.error }}
      <button @click="clearError" class="close-error">x</button>
    </div>

    <div v-if="state.isLoading" class="loading">
      <div class="loading-spinner"></div>
      <p>Loading todos...</p>
    </div>

    <div v-else class="todo-list">
      <div v-if="state.todos.length === 0" class="empty-state">
        <i class="pi pi-inbox empty-icon"></i>
        <h3>No todos yet</h3>
        <p>Add your first todo above to get started!</p>
      </div>

      <div v-else class="todos">
        <div v-if="incompleteTodos().length > 0" class="todo-section">
          <h3 class="section-title">
            <i class="pi pi-clock"></i>
            Pending Tasks ({{ incompleteTodos().length }})
          </h3>
          <div
            v-for="todo in incompleteTodos()"
            :key="todo.id"
            class="todo-item"
          >
            <div class="todo-content">
              <button
                @click="toggleTodo(todo)"
                class="todo-checkbox"
                :class="{ 'completed': todo.completed }"
              >
                <i v-if="todo.completed" class="pi pi-check"></i>
              </button>
              <span class="todo-title" :class="{ 'completed': todo.completed }">
                {{ todo.title }}
              </span>
            </div>
            <button
              @click="deleteTodo(todo.id)"
              class="delete-button"
              title="Delete todo"
            >
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>

        <div v-if="completedTodos().length > 0" class="todo-section">
          <h3 class="section-title">
            <i class="pi pi-check-circle"></i>
            Completed Tasks ({{ completedTodos().length }})
          </h3>
          <div
            v-for="todo in completedTodos()"
            :key="todo.id"
            class="todo-item completed-todo"
          >
            <div class="todo-content">
              <button
                @click="toggleTodo(todo)"
                class="todo-checkbox completed"
              >
                <i class="pi pi-check"></i>
              </button>
              <span class="todo-title completed">
                {{ todo.title }}
              </span>
            </div>
            <button
              @click="deleteTodo(todo.id)"
              class="delete-button"
              title="Delete todo"
            >
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="todo-actions">
      <button @click="fetchTodos" class="refresh-button" :disabled="state.isLoading">
        <i class="pi pi-refresh" :class="{ 'spinning': state.isLoading }"></i>
        Refresh
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.todo-header {
  text-align: center;
  margin-bottom: 2rem;
}

.todo-header h2 {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.todo-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat i {
  color: #667eea;
}

.add-todo-form {
  margin-bottom: 2rem;
}

.input-container {
  display: flex;
  gap: 0.75rem;
}

.todo-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-button {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
}

.add-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.add-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  color: #dc2626;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.error-icon {
  font-size: 1.1rem;
}

.close-error {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #dc2626;
  opacity: 0.7;
}

.close-error:hover {
  opacity: 1;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.empty-icon {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #374151;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.todo-section {
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.section-title i {
  color: #667eea;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  background: #fafafa;
  transition: all 0.2s ease;
}

.todo-item:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.completed-todo {
  opacity: 0.7;
  background: #f0f9ff;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.todo-checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.todo-checkbox:hover {
  border-color: #667eea;
}

.todo-checkbox.completed {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.todo-title {
  font-size: 1rem;
  color: #374151;
  flex: 1;
  transition: all 0.2s ease;
}

.todo-title.completed {
  text-decoration: line-through;
  color: #9ca3af;
}

.delete-button {
  padding: 0.5rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-button:hover {
  background: #fee2e2;
  border-color: #fca5a5;
}

.todo-actions {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.refresh-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.refresh-button:hover:not(:disabled) {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .todo-container {
    padding: 1rem;
    margin: 0.5rem;
  }
  
  .todo-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .input-container {
    flex-direction: column;
  }
  
  .add-button {
    align-self: stretch;
  }
  
  .todo-item {
    padding: 0.75rem;
  }
  
  .section-title {
    font-size: 1rem;
  }
}
</style>