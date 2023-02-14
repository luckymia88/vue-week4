export default {
  props:['pages', 'getProducts'],
  template:`<nav aria-label="Page navigation example">
  <ul class="pagination">

    <li class="page-item" :class="{ disabled: !pages.has_pre}" >
      <a class="page-link" href="#" aria-label="Previous" 
      @click.prevent ="getProducts(pages.current_page - 1)">
        <span aria-hidden="true">&laquo;</span>
      </a>

    </li>
    <li class="page-item" v-for="page in pages.total_pages" :key="page+'123'"
    :class="{ active: page === pages.current_page}" >
      <a class="page-link" href="#" @click.prevent ="$emit('change-page', page)">{{page}}</a>
    </li>
 
    <li class="page-item" :class="{ disabled: !pages.has_next}" >
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
  
}