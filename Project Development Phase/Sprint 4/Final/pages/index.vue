<template>
  <div class="flex h-screen bg-screen">
      <div class="m-auto">
        <div class="w-96 h-3/4 bg-white rounded-lg px-8 py-8">
          <div v-if="page == 'login'">
            <LoginPage />
          </div>
          <div v-if="page == 'reg'">
            <RegPage />            
          </div>
        </div>
      </div>   
      <div v-if="isLoading">
        <div class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 opacity-75">
          <LoadingPage />
        </div>
      </div>      
    </div>
</template>

<script>

import LoginPage from './login.vue'
import RegPage from './register.vue'
import LoadingPage from './loading.vue'
import ProfilePage from './profile.vue'

export default {
  data: () => ({
    isWarning: false,
    isLoading: false,
    page: 'login',
    posts: [],
    isValid: false,
    uid: '',
    username: "",
    password: "",
    carName: "",
    regNo: "",
    regDate: "",
    url: 'http://127.0.0.1:5000/login?'
  }),
  name: 'IndexPage',
  components: {
    LoginPage,
    RegPage,
    LoadingPage,
    ProfilePage,
  },
  mounted() {
    
  },
  methods: {    
    changePage(page) {
      return this.page = page
    },
    setLoading(action) {
      return this.isLoading = action
    },
    
    changeAfterReg(uid,username,carname,regno,regdate) {
      this.uid = uid
      this.username = username
      this.carName = carname
      this.regNo = regno
      this.regDate = regdate
      var tmpdata = {
        'uid': uid,
        'username': username,
        'carname': carname,
        'regno': regno,
        'regdate': regdate
      }
    }
  }, 
  created() {
    this.$root.$refs.index = this;
  } 
}
</script>
