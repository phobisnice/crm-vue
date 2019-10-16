<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
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
import { mapActions, mapGetters } from "vuex";
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "history",
  components: {
    HistoryTable
  },
  mixins: [paginationMixin],
  data() {
    return {
      records: [],
      loading: true
    };
  },
  methods: {
    ...mapActions(["fetchRecords"])
  },
  async mounted() {
    try {
      this.records = await this.fetchRecords();

      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            recordClass: record.type === "income" ? "green" : "red",
            recordType: record.type === "income" ? "Доход" : "Расход"
          };
        })
      );
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
