<script>
export default {
  middleware: 'isConnected',

  mounted() {
      this.logout();
  },

  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      // Bug (el-menu - default-active)
      this.$router.replace('/auth/login')
    },
  }
}
</script>