<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, session } = await requireAuth()
const { pending, refreshSession, logout } = useAuth()
const errorMessage = ref<string | null>(null)

const displayName = computed(() => user.displayName ?? user.email ?? user.id)

async function refreshCurrentSession(): Promise<void> {
  errorMessage.value = null

  try {
    await refreshSession()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Session refresh failed.'
  }
}

async function signOut(): Promise<void> {
  await logout()
  await navigateTo('/sign-in')
}
</script>

<template>
  <main class="page">
    <section class="card card--wide">
      <header class="page-header">
        <p class="eyebrow">Authenticated</p>
        <h1>{{ displayName }}</h1>
        <p>{{ user.email }}</p>
      </header>

      <dl class="facts">
        <div>
          <dt>Session</dt>
          <dd>{{ session.status ?? 'active' }}</dd>
        </div>
        <div>
          <dt>Session ID</dt>
          <dd>{{ session.id }}</dd>
        </div>
        <div>
          <dt>User ID</dt>
          <dd>{{ user.id }}</dd>
        </div>
      </dl>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="actions">
        <button :disabled="pending" class="button-secondary" type="button" @click="refreshCurrentSession">
          Refresh
        </button>
        <button :disabled="pending" type="button" @click="signOut">Sign out</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.facts {
  display: grid;
  gap: 12px;
  margin: 0;
}

.facts div {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr);
  gap: 14px;
}

.facts dt {
  color: #617083;
  font-weight: 800;
}

.facts dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

@media (max-width: 560px) {
  .facts div {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
