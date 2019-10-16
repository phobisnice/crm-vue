<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <Loader v-if="loading" />
      <p v-else-if="!records.length" class="text-center">
        Записей пока нет.
        <router-link to="/record">Создать новую</router-link>
      </p>
      <HistoryTable v-else :records="records" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "history",
  components: {
    HistoryTable
  },
  data() {
    return {
      records: [],
      loading: true
    };
  },
  methods: {
    ...mapActions(["fetchCategories", "fetchRecords"])
  },
  async mounted() {
    try {
      const categories = await this.fetchCategories();
      const records = await this.fetchRecords();

      this.records = records.map(record => {
        return {
          ...record,
          recordClass: record.type === "income" ? "green" : "red",
          recordType: record.type === "income" ? "Доход" : "Расход",
          categoryName: categories.find(c => c.id === record.categoryId).title
        };
      });
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
