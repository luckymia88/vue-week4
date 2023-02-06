import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = {
    data(){
        return{
            user:{
                username:'',
                password:'',
            }
        }
    },
    methods:{
        login(){
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios.post(api, this.user)
              .then((res)=>{
                const { expired, token } = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
                window.location = 'products.week4.html';
              })
              .catch((err)=>{
                alert(err.res.data.message);
              })
        },
    }
}

createApp(app).mount('#app')