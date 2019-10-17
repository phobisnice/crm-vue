<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4 v-html="filteredBill"></h4>
    </div>

    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Создать новую</router-link>
    </p>
    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend}} из {{category.limit}} &#8381;
        </p>
        <div class="progress" v-tooltip="category.tooltipText">
          <div
            class="determinate"
            :class="category.progressColor"
            :style="{width: category.progress + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";

export default {
  name: "planning",
  metaInfo: {
    title: "Планирование"
  },
  data() {
    return {
      loading: true,
      categories: []
    };
  },
  computed: {
    ...mapGetters(["getInfo"]),
    filteredBill() {
      return currencyFilter(this.getInfo.bill);
    }
  },
  methods: {
    ...mapActions(["fetchCategories", "fetchRecords"])
  },
  async mounted() {
    try {
      const categories = await this.fetchCategories();
      const records = await this.fetchRecords();

      this.categories = categories.map(cat => {
        const spend = records
          .filter(r => r.categoryId === cat.id && r.type === "outcome")
          .reduce((total, record) => {
            return (total += +record.amount);
          }, 0);

        const percent = (100 * spend) / cat.limit;
        const progress = percent > 100 ? 100 : percent;
        let progressColor;

        switch (true) {
          case progress < 60:
            progressColor = "green";
            break;
          case progress < 100:
            progressColor = "yellow";
            break;
          case progress === 100:
            progressColor = "red";
            break;
        }

        const balance = cat.limit - spend;
        const tooltipText = `${
          balance < 0 ? "Превышение лимита на" : "Остаток на счете"
        } ${currencyFilter(Math.abs(balance))}`;

        return {
          ...cat,
          spend,
          progress,
          progressColor,
          tooltipText
        };
      });
    } catch (e) {
      console.log(e);
    }

    this.loading = false;
  }
};
</script>
