import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./pagination.week4.js"; //匯入分頁元件

const site = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'luckymia';

let productModal = null;
let delProductModal = null;

const app = createApp ({
    data(){
        return{
            products:[],
            tempProduct:{
              imagesUrl: [],
            },
            isNew: false,
            page:{},
        };
    },
    methods: {
        checkLogin(){
            const checkUrl = `${site}/api/user/check`;
            axios.post(checkUrl) //驗證
              .then(()=>{
                this.getProducts();
              }) 
              .catch((err)=>{
                alert(err.data.message);
                window.location = 'login.week4.html';
              })
        },
        getProducts(page = 1){ //參數預設值
            const getProductsUrl = `${site}/api/${apiPath}/admin/products/?page=${page}`;
            axios.get(getProductsUrl)  //取得產品
              .then((res)=>{
                this.products = res.data.products;
                this.page = res.data.pagination;
              })
              .catch((err)=>{
                alert(err.data.message);
              })
        },
        updateProduct(){
          let url = `${site}/api/${apiPath}/admin/product`;
          //用this.isNew判斷api要如何運行
          let method = 'post';
          if (!this.isNew){
            url = `${site}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
            method = 'put';
          }
          axios[method](url, {data:this.tempProduct}) //新增產品或編輯產品
            .then(()=>{
              this.getProducts();
              productModal.hide(); //關閉modal
            })
            .catch((err)=>{
              alert(err.data.message);
            })
        },
        deleteProduct(){
          const url = `${site}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
          axios.delete(url) //新增產品或編輯產品
            .then(()=>{
              this.getProducts();
              delProductModal.hide(); //關閉modal
            })
            .catch((err)=>{
              alert(err.data.message);
            })
        },
        openModal(status, product){
          if (status === 'create'){  //判斷是編輯還是新增
            productModal.show(); //點擊後打開modal
            this.isNew = true;
            //帶入初始化資料
            this.tempProduct = {
              imagesUrl: [],
            };
          } else if (status === 'edit'){
            productModal.show(); 
            this.isNew = false;
            //帶入當前要編輯的資料
            this.tempProduct = { ...product };
          } else if (status === 'delete'){
            delProductModal.show();
            this.tempProduct = { ...product }; //判斷id使用
          }
        },
    },
    components:{
        pagination,
      },
    mounted() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
        this.checkLogin();

        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
    },
});

app.component("product-modal", {
    props:["tempProduct","updateProduct","isNew"],
    template:"#product-modal-template",
  });

app.component('delete-modal',{
  props:['tempProduct','deleteProducts'],
  template:'#delProduct-modal-template',
});
  
app.mount('#app');