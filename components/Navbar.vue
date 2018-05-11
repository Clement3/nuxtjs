<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <el-menu-item index="/">Accueil</el-menu-item>
        <el-menu-item v-if="!$store.state.auth" index="/auth/login">Connexion</el-menu-item>
        <el-menu-item v-if="$store.state.auth" index="/auth/logout">Déconnexion</el-menu-item>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '/'
      }
    },

    mounted() {
      this.activeIndex = this.$route.fullPath 
    }
  }
</script>