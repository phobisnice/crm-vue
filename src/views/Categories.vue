<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory" />
        <CategoryUpdate
          @updated="updateCategories"
          v-if="categories.length"
          :key="categories.length + count"
          :categories="categories"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CategoryCreate from "@/components/CategoryCreate";
import CategoryUpdate from "@/components/CategoryUpdate";

export default {
  name: "categories",
  components: {
    CategoryCreate,
    CategoryUpdate
  },
  data() {
    return {
      categories: [],
      loading: true,
      count: 0
    };
  },
  methods: {
    ...mapActions(["fetchCategories"]),
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      const index = this.categories.findIndex(cat => cat.id === category.id);
      this.categories[index].title = category.title;
      this.categories[index].limit = category.limit;
      this.count++;
    }
  },
  async mounted() {
    this.categories = await this.fetchCategories();
    this.loading = false;
  }
};
</script>
