<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">{{recordType}}</a>
      </div>
      <div class="row">
        <div class="col m12 l6">
          <div class="card card-gradient">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p v-html="'Сумма: ' + formatAmount"></p>
              <p>Категория: {{record.categoryName}}</p>

              <small>{{record.date | date('date')}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="center">Такой записи не сущесвтует</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import currencyFilter from "@/filters/currency.filter";

export default {
  name: "detail-record",
  metaInfo: {
    title: "Подробная информация"
  },
  data() {
    return {
      record: null,
      loading: true
    };
  },
  methods: {
    ...mapActions(["fetchRecordById"])
  },
  computed: {
    formatAmount() {
      return currencyFilter(this.record.amount);
    },
    recordType() {
      return this.record.type === "income" ? "Доход" : "Расход";
    }
  },
  async mounted() {
    try {
      this.record = await this.fetchRecordById(this.$route.params.id);
      this.loading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
