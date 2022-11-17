<template lang="">
    <div>
        <h1 class="pb-3 font-Montserrat-500">Username</h1>
        <input v-model="username" class="font-Montserrat-400 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
        <h1 class="pt-4 pb-3 font-Montserrat-500">Car Name</h1>
        <input v-model="carName" class="font-Montserrat-400 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="carname" type="text" placeholder="Car Name">
        <h1 class="pt-4 pb-3 font-Montserrat-500">Registration Number</h1>
        <input v-model="regNo" class="font-Montserrat-400 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="regno" type="text" placeholder="Registration Number">
        <h1 class="pt-4 pb-3 font-Montserrat-500">Registration Date</h1>
        <div class="shadow appearance-none border rounded w-full py-2 px-3">
            <datepicker v-model="tmpDate" @input="handleChange(tmpDate)" :placeholder="datePh" format="dd/MM/yyyy" />
        </div>
        <h1 class="pt-4 pb-3 font-Montserrat-500">Password</h1>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
        <div class="pt-4 flex items-center justify-around">
            <div v-if="isValid">
                <button @click="register(username,carName,regNo,regDate,password)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign Up
                </button>
            </div>
            <div v-else>
                <div class="cursor-default bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign Up
                </div>
            </div>  
            <div @click="loginpage()" class="cursor-default bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Cancel
            </div>          
        </div>
    </div>
</template>
<script>

import moment from 'moment'

export default {
    name: 'RegPage',    
    components: {

    },
    data: () => ({
        posts: [],
        tmpDate: "",
        datePh: "Select Date",
        isValid: false,
        username: "",
        password: "",
        carName: "",
        regNo: "",
        regDate: "",
        url: 'http://127.0.0.1:5000/register?'
    }),
    mounted() {
        document.getElementById('username').addEventListener('input', (e) => {
            if(this.username.length > 0 && this.carName.length > 0 && this.regNo.length > 0 && this.regDate.length > 0 && this.password.length > 0) {
                this.isValid = true
            } else {
                this.isValid = false
            }
            console.log(this.regDate)
        })
        document.getElementById('carname').addEventListener('input', (e) => {
            if(this.username.length > 0 && this.carName.length > 0 && this.regNo.length > 0 && this.regDate.length > 0 && this.password.length > 0) {
                this.isValid = true
            } else {
                this.isValid = false
            }
            console.log(this.regDate)
        })
        document.getElementById('regno').addEventListener('input', (e) => {
            if(this.username.length > 0 && this.carName.length > 0 && this.regNo.length > 0 && this.regDate.length > 0 && this.password.length > 0) {
                this.isValid = true
            } else {
                this.isValid = false
            }
            console.log(this.regDate)
        })        
        document.getElementById('password').addEventListener('input', (e) => {
            if(this.username.length > 0 && this.carName.length > 0 && this.regNo.length > 0 && this.regDate.length > 0 && this.password.length > 0) {
                this.isValid = true
            } else {
                this.isValid = false
            }
            console.log(this.regDate)
        })
    },
    methods: {
      loginpage() {
        this.$root.$refs.index.changePage('login');
      }, 
      handleChange(e) {
        var date = moment(e).format('MM/DD/YYYY')
        this.regDate = date
        console.log(this.regDate)
        if(this.username.length > 0 && this.carName.length > 0 && this.regNo.length > 0 && this.regDate.length > 0 && this.password.length > 0) {
            this.isValid = true
        } else {
            this.isValid = false
        }        
      },
      async register(username,carName,regNo,regDate,password) {
        this.$root.$refs.index.setLoading(true);
        const res = await fetch(this.$server.url + 'register?' + new URLSearchParams({username: username.toLowerCase(), carName: carName, regNo: regNo, regDate: regDate, password: password}),{method: "POST"})
        if(res.status == 200) {
            this.posts =  await res.json()
            if(this.posts['success'] != false) {
                console.log('success')
                var resp = {
                    'uid': this.posts['success'],
                    'username': this.username.toUpperCase(),
                    'carname': this.carName.toUpperCase(),
                    'regno': this.regNo.toUpperCase(),
                    'regdate': this.regDate,
                    'claim': ''
                }               
                this.$root.$refs.index.setLoading(false);
                this.$router.push({name: 'profile', params: {data: resp}})
            } else {
                console.log('failed')
            }
        }        
      },
    },
}
</script>
<style lang="">
    
</style>