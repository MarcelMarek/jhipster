<template>
  <div v-if="authenticated">
    <h1>Hello there, Sunshine!</h1>
    <h2>Go to Todos:</h2>
    <router-link to="/todo">Click Here</router-link>
  </div>
  <div v-else>
    <h1>Hello there, Sunshine!</h1>
    <h2>You need to Login first</h2>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
