<template>
  <div class="login">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card shadow="hover">
          <el-alert v-if="form.error" :title="form.error" type="error" show-icon></el-alert>
          <el-form ref="form" :model="form">
            <el-form-item label="E-mail" :required="true">
              <el-input type="email" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Mot de passe" :required="true">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item> 
            <el-form-item label="Se souvenir de moi ?">
              <el-switch v-model="form.rememberMe"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="onSubmit">Se connecter</el-button>
            </el-form-item>                             
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {

    middleware: 'notConnected',

    data() {
      return {
        loading: false,
        form: {
          email: '',
          password: '',
          rememberMe: false,
          error: null
        }
      }
    },
    methods: {
      async onSubmit() {
        this.loading = true
        try {
          await this.$store.dispatch('login', {
            remember: this.form.rememberMe,
            username: this.form.email,
            password: this.form.password
          })
          this.form.email = ''
          this.form.password = ''
          this.form.error = null
          this.loading = false
          this.$router.push('/')
        } catch (e) {
          this.form.error = e.message
          this.loading = false
        }
      },      
    }
  }
</script>

<style scoped>
.login {
  margin-top: 4rem;
}
.el-button {
  width: 100%;
}
</style>
