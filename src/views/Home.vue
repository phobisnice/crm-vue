<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button
        class="btn waves-effect waves-light btn-small btn-refresh z-depth-5"
        type="button"
        @click.prevent="refreshCurrency"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :currency="currency" />

      <HomeCurrency :currency="currency" :currencyDate="currencyDate" />
    </div>
  </div>
</template>

<script>
import messages from "@/utils/messages";
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
import { mapActions } from "vuex";

export default {
  name: "home",
  components: {
    HomeBill,
    HomeCurrency
  },
  data() {
    return {
      loading: true,
      currency: null,
      currencyDate: null
    };
  },
  methods: {
    ...mapActions(["fetchCurrency"]),
    refreshCurrency() {
      this.loading = true;
      this.fetchCurrency().then(r => {
        this.currency = r.rates;
        this.currencyDate = r.date;
        this.loading = false;
      });
    }
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
    this.fetchCurrency().then(r => {
      this.currency = r.rates;
      this.currencyDate = r.date;
      this.loading = false;
    });
  }
};
</script>
