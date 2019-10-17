<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div v-if="!loading && records.length" class="history-chart">
      <HistoryPieChart :chartData="chartData" :charOptions="chartOptions" />
    </div>

    <section>
      <div class="row">
        <div class="col s12">
          <Loader v-if="loading" />
          <p v-else-if="!records.length" class="text-center">
            Записей пока нет.
            <router-link to="/record">Создать новую</router-link>
          </p>
          <HistoryTable v-else :records="currentItems" />
          <Paginate
            v-if="pageCount > 1"
            v-model="defaultPage"
            :page-count="pageCount"
            :click-handler="pageChangeHandler"
            :prev-text="'Назад'"
            :next-text="'Вперед'"
            :container-class="'pagination'"
            :page-class="'waves-effect'"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import HistoryTable from "@/components/HistoryTable";
import HistoryPieChart from "@/components/HistoryPieChart";
import generateColorArray from "@/utils/randomColorArray.util";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "history",
  components: {
    HistoryTable,
    HistoryPieChart
  },
  metaInfo: {
    title: "История"
  },
  mixins: [paginationMixin],
  data() {
    return {
      records: [],
      loading: true,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Расходы по категориям",
            backgroundColor: [],
            data: [],
            borderWidth: 3
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    ...mapActions(["fetchRecords", "fetchCategories"]),
    setup() {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            recordClass: record.type === "income" ? "green" : "red",
            recordType: record.type === "income" ? "Доход" : "Расход"
          };
        })
      );
    },
    chartInit(categories) {
      this.chartData.labels = categories.map(cat => cat.title);
      this.chartData.datasets[0].backgroundColor = generateColorArray(
        categories.length,
        "blue"
      );
      this.chartData.datasets[0].data = categories.map(cat => {
        return this.records.reduce((total, record) => {
          if (record.categoryId === cat.id && record.type === "outcome") {
            total += +record.amount;
          }

          return total;
        }, 0);
      });
    }
  },
  async mounted() {
    try {
      this.records = await this.fetchRecords();
      const categories = await this.fetchCategories();

      this.chartInit(categories);
      this.setup();

      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
