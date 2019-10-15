<template>
  <div class="col s12 m6 l4">
    <div class="card bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur in currencies" :key="cur" class="currency-line">
          <span v-html="getCurrency(cur)"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    currency: Object
  },
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"]
    };
  },
  computed: {
    ...mapGetters(["getInfo"]),
    base() {
      return this.getInfo.bill / this.currency["RUB"];
    }
  },
  methods: {
    getCurrency(rate) {
      return this.$options.filters.currencyFilter(
        (this.base * this.currency[rate]).toFixed(2),
        rate
      );
    }
  }
};
</script>
