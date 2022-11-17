<template lang="">
    <div>
        <div class="flex h-screen bg-screen">
            <div class="m-auto">
                <div class="h-3/4 bg-white rounded-lg px-8 py-8">
                    <span class="flex pb-3">
                        <h1 class="w-56 pr-10 font-Montserrat-500">Username</h1>
                        <a class="font-Montserrat-500 font-semibold">{{username}}</a>
                    </span>
                    <span class="flex pt-4 pb-3">
                        <h1 class="w-56 pr-10 font-Montserrat-500">Car Name</h1>
                        <a class=" font-Montserrat-500 font-semibold">{{carname}}</a>
                    </span>
                    <span class="flex pt-4 pb-3">
                        <h1 class="w-56 pr-10 font-Montserrat-500">Registration Number</h1>
                        <a class="font-Montserrat-500 font-semibold">{{regno}}</a>
                    </span>
                    <span class="flex pt-4 pb-3">
                        <h1 class="w-56 pr-10 font-Montserrat-500">Registration Date</h1>
                        <a class="font-Montserrat-500 font-semibold">{{regdate}}</a>
                    </span>
                    <div v-if="isAnalyzed">
                        <span class="flex pt-4 pb-3">
                            <h1 class="w-56 pr-10 font-Montserrat-500">Amount Claimable</h1> 
                            <h1 class="font-Montserrat-500 font-semibold text-green-600">₹ {{claim}}</h1>
                        </span>                
                    </div>  
                    <div v-else>
                        <span class="flex pt-4 pb-3">
                            <h1 class="w-56 pr-10 font-Montserrat-500">Images</h1>
                            <input id="fileInput" type="file" multiple="multiple" accept="image/png, image/gif, image/jpeg" style="display:none"/>        
                            <button id="fileInputButton" onclick="document.getElementById('fileInput').click()" class="font-Montserrat-500 text-sm font-semibold bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Add
                            </button>
                        </span>                
                    </div>
                    <div id="imgBox" class="pt-6 flex flex-col">                        
                    </div>                    
                    <div v-if="isAnalyzed">
                        <div class="flex pt-10 items-center justify-center">
                            <button @click="logout()" class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Logout
                            </button>                      
                        </div>
                    </div>
                    <div v-else>
                        <div class="flex pt-10 items-center justify-around">
                            <button @click="logout()" class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Logout
                            </button>   
                            <button id="uploadButton" @click="waning(true)" class="hidden bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Upload
                            </button>                   
                        </div>
                    </div>                
                </div>
            </div>
        </div>
        <div v-if="isWarning">
        <div class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700/75">
          <WarningPage />
        </div>
      </div> 
        <div v-if="isLoading">
            <div class="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700 opacity-75">
                <LoadingPage />
            </div>
        </div>
        <div @click="dismiss()" id="imagediv" class="hidden justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 w-full z-50 overflow-hidden bg-gray-700/75">
            <img @click="" id="viewer" src="" alt="">            
        </div>        
    </div>
</template>
<script>

import LoadingPage from './loading.vue'
import WarningPage from './uploadWarning.vue'
// import ImageViewer from './imageViewer.vue'

let imgData = [];
let nameSetter = 1;
let source = ""

export default {
    name: 'profilePage',
    data: () => ({
        username: '',
        carname: '',
        regno: '',
        regdate: '',
        claim: '',
        userID: '',
        imgData: [],
        isAnalyzed: true,
        isLoading: true,
        isWarning: false,
        isImageView: false
    }), 
    components: {        
        LoadingPage,
        WarningPage,
    },
    beforeMount(){
        if(this.$route.params.data === undefined) {
            this.$router.push({name: 'index'})
        } else {
            var data = this.$route.params.data
            this.userID = data['uid']
            this.username = data['username']
            this.carname = data['carname']
            this.regno = data['regno']
            this.regdate = data['regdate']
            this.claim = data['claim']
            if(data['claim'] === '') {
                this.isAnalyzed = false
            } else {
                this.isAnalyzed = true                
            }
            this.isLoading = false
        }
    },   
    mounted() {
        var id = this.userID
        console.log(this.username)
        if(!this.isAnalyzed) {
            document.getElementById("fileInput").addEventListener("change", (e) => {
                if(e.target.files.length > 4 || (imgData.length + e.target.files.length) > 4) {
                    alert("Only 4 files accepted.");
                    e.preventDefault();
                } else {
                    var reader = new FileReader();
                    var files = e.target.files
                    function readFile(index,id) {
                        if( index >= files.length ) {
                            return
                        };
                        var file = files[index];
                        var tmpData = {}
                        reader.onload = function(e) {  
                            console.log(file)
                            tmpData['filename'] = id + '_' + nameSetter.toString() + '.jpg'
                            tmpData['data'] = reader.result.split(',')[1].toString()
                            imgData.push(tmpData)
                            addImage(reader.result,tmpData['filename'])
                            nameSetter = nameSetter + 1
                            readFile(index+1,id)
                        }
                        reader.readAsDataURL(file);
                    }
                    readFile(0,id)               
                    function addImage(data,name) {
                        var divElement = document.createElement("div");
                        var imgElement = document.createElement("img");
                        var buttonElement = document.createElement("div")
                        divElement.id = name
                        buttonElement.setAttribute('name',name)
                        buttonElement.appendChild(document.createTextNode('Remove'));
                        divElement.classList.add('flex', 'items-center', 'space-x-3',);
                        buttonElement.classList.add('cursor-pointer', 'px-2', 'py-1.5', 'rounded-md', 'text-sm', 'font-semibold', 'text-white', 'bg-red-600', 'hover:bg-red-800', 'items-center', 'justify-center');
                        imgElement.classList.add('w-32', 'h-16','pr-10', 'pb-3', 'cursor-default');
                        imgElement.src = data                        
                        buttonElement.onclick = function delImg(e) {
                            imgData.splice(imgData.findIndex(x => x.filename === e.target.attributes.name.value),1)
                            console.log(imgData)
                            document.getElementById(e.target.attributes.name.value).remove()
                            document.getElementById('fileInputButton').classList.remove('hidden')
                            if(imgData.length > 0) {
                                document.getElementById('uploadButton').classList.remove('hidden')
                                document.getElementById('uploadButton').classList.add('flex')
                            } else {
                                document.getElementById('uploadButton').classList.add('hidden')
                                document.getElementById('uploadButton').classList.remove('flex')
                            }
                        }
                        divElement.appendChild(imgElement)
                        divElement.appendChild(buttonElement)
                        document.getElementById('imgBox').appendChild(divElement);
                        if(imgData.length > 3) {
                            document.getElementById('fileInputButton').classList.add('hidden')
                        } else {
                            document.getElementById('fileInputButton').classList.remove('hidden')
                        }
                        document.getElementById('uploadButton').classList.remove('hidden')
                        document.getElementById('uploadButton').classList.add('flex')
                    }                                    
                }            
            });
        } else {
            this.getImg()
        }       
    },
    methods: {
        async waning(action) {
            this.isWarning = action
        },
        async upload() {
            this.isWarning = false
            this.isLoading = true
            var totalAmount = 0
            var url = this.$server.url
            let formdata = new FormData()
            formdata.append('uid', this.userID)
            imgData.forEach(element => {
                formdata.append(element['filename'], element['data'])
            });
            const res = await fetch(url + 'postImage',{method: "post",body: formdata})
            this.posts =  await res.json()
            for (let i = 0; i < this.posts.length; i++) {
                document.getElementById("imgBox").firstChild.remove()
                var imgurl = url + 'viewImage?' + 'uid=' + this.userID + '&' + 'filename=' + this.posts[i]['filename'] 
                await this.addImage2(imgurl,this.posts[i]['area'],this.posts[i]['amount'])  
                totalAmount = totalAmount + parseInt(this.posts[i]['amount'], 10);          
            }
            this.claim = totalAmount.toString()
            this.isAnalyzed = true
            this.isLoading= false
        },
        async addImage2(imgurl, damage, amount) {
            var viewerImg = document.getElementById('viewer')
            var divElement = document.createElement("div");
            var imgElement = document.createElement("img");
            var resultElement = document.createElement("h1")
            var estElement = document.createElement("h1")
            divElement.classList.add('pt-4', 'flex', 'items-center', 'justify-between');
            imgElement.classList.add('w-32', 'h-16','pr-10', 'cursor-default');
            resultElement.classList.add('font-Montserrat-500');
            estElement.classList.add('font-Montserrat-500', 'font-semibold');
            imgElement.src = imgurl  
            imgElement.onclick = function () {
                document.getElementById('viewer').src = imgurl
                document.getElementById('imagediv').classList.add('flex')
                document.getElementById('imagediv').classList.remove('hidden')
            }
            resultElement.appendChild(document.createTextNode(damage + ' cm'));
            estElement.appendChild(document.createTextNode('₹ '+ amount));                      
            divElement.appendChild(imgElement)
            divElement.appendChild(resultElement)
            divElement.appendChild(estElement)
            document.getElementById('imgBox').appendChild(divElement);
            
        },
        async getImg() {
            
            var totalAmount = 0
            var res = await fetch(this.$server.url + 'getImage?' + new URLSearchParams({uid: this.userID}),{method: "POST"})
            this.posts =  await res.json()
            console.log(this.posts)
            for (let i = 0; i < this.posts.length; i++) {
                var imgurl = this.$server.url + 'viewImage?' + 'uid=' + this.userID + '&' + 'filename=' + this.posts[i]['filename'] 
                await this.addImage2(imgurl,this.posts[i]['area'],this.posts[i]['amount'])  
                totalAmount = totalAmount + parseInt(this.posts[i]['amount'], 10);          
            }
            this.claim = totalAmount.toString()
            this.isLoading= false
        },
        async dismiss() {
            document.getElementById('imagediv').classList.add('hidden')
            document.getElementById('imagediv').classList.remove('flex')
            document.getElementById('viewer').src = ""
        },
        async logout() {
            this.$router.push({name: 'index'}) 
        }
    },
    created() {
        this.$root.$refs.profile = this;
    },
}
</script>
<style lang="">
    
</style>