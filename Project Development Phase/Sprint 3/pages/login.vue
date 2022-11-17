<template lang="">
  <div>
    <h1 class="pb-3 font-Montserrat-500">Username</h1>
    <input v-model="username" class="font-Montserrat-400 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="username">
    <h1 id="errormsg" class="hidden pt-1 font-Montserrat-400 text-sm text-red-600">Username or Password is wrong. please try again.</h1>
    <h1 class="pt-4 pb-3 font-Montserrat-500">Password</h1>
    <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password">
    <div class="pt-4 flex items-center justify-around">
        <div v-if="isValid">
            <button @click="login(username,password)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </button>
        </div>
        <div v-else>
            <div class="cursor-default bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign In
            </div>
        </div>        
        <div @click="regpage()" class="cursor-pointer text-blue-400 hover:text-blue-600 font-semibold">
          Register user
        </div>            
    </div>
  </div>
</template>
<script> 

export default {
  name: 'LoginPage',
  data: () => ({
    posts: [],
    imgData: [],    
    isValid: false,
    username: "",
    password: "",
    url: 'http://d9a5-35-196-119-233.ngrok.io/login'
  }),
  mounted() {    

    document.getElementById('username').addEventListener('input', (e) => {
      if(this.username.length > 0 && this.password.length > 0) {
        this.isValid = true
      } else {
        this.isValid = false
      }
      document.getElementById('errormsg').classList.add('hidden')
      console.log(this.isValid)
    })

    document.getElementById('password').addEventListener('input', (e) => {
      if(this.username.length > 0 && this.password.length > 0) {
        this.isValid = true
      } else {
        this.isValid = false
      }
      document.getElementById('errormsg').classList.add('hidden')
      console.log(this.isValid)
    })

  },
  methods: {
    regpage() {
      this.$root.$refs.index.changePage('reg');
    },    
    async login(username,password) {
      this.$root.$refs.index.setLoading(true);
      const res = await fetch(this.$server.url + 'login?' + new URLSearchParams({username: username.toLowerCase(), password: password}),{method: "POST"})
      this.posts =  await res.json()
      console.log(this.posts)
      if(this.posts['uid'] != false) {
          console.log('success')
          var resp = {
              'uid': this.posts['uid'],
              'username': this.posts['username'].toUpperCase(),
              'carname': this.posts['carname'].toUpperCase(),
              'regno': this.posts['regno'].toUpperCase(),
              'regdate': this.posts['regdate'],
              'claim': this.posts['claim']
          }               
          this.$root.$refs.index.setLoading(false);
          this.$router.push({name: 'profile', params: {data: resp}})
      } else {
          this.$root.$refs.index.setLoading(false);
          document.getElementById('errormsg').classList.remove('hidden')
          console.log('failed')
      }
    },    
  },
}
</script>
<style lang="">
  
</style>
