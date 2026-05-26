<script setup lang="ts">
const email = ref('demo@example.com')
const password = ref('demo-password-123')
const pending = ref(false)
const errorMessage = ref<string | null>(null)
const { signInWithPassword } = useAuth()

async function signIn(): Promise<void> {
  pending.value = true
  errorMessage.value = null

  try {
    await signInWithPassword({
      email: email.value,
      password: password.value,
    })
    await navigateTo('/')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Sign-in failed.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <main class="page">
    <section class="card">
      <header class="page-header">
        <p class="eyebrow">Nuxt + Express</p>
        <h1>Sign in</h1>
        <p>Demo credentials are already filled in.</p>
      </header>

      <form class="form" @submit.prevent="signIn">
        <label class="field">
          <span>Email</span>
          <input v-model="email" autocomplete="email" required type="email" />
        </label>
        <label class="field">
          <span>Password</span>
          <input v-model="password" autocomplete="current-password" required type="password" />
        </label>

        <button :disabled="pending" type="submit">
          {{ pending ? 'Signing in...' : 'Sign in' }}
        </button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </section>
  </main>
</template>
