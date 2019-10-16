import chunk from "@/utils/chunk.util.js";

export default {
  data() {
    return {
      defaultPage: +this.$route.query.page || 1,
      pageSize: 3,
      pageCount: 0,
      allItems: [],
      currentItems: []
    };
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = chunk(allItems, this.pageSize);
      this.pageCount = this.allItems.length;
      this.currentItems = this.allItems[this.defaultPage - 1];
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${this.defaultPage}`);
      this.currentItems = this.allItems[page - 1];
    }
  }
};
