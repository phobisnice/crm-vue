<template>
  <div class="col s12 m6 l8">
    <div class="card bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{currencyInRub[cur].toFixed(3)}}</td>
              <td>{{currencyDate | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currency: Object,
    currencyDate: String
  },
  data() {
    return {
      currencies: ["USD", "EUR"]
    };
  },
  computed: {
    currencyInRub() {
      const rubCurrency = {};
      for (let key in this.currency) {
        if (key !== "EUR" && key !== "RUB") {
          rubCurrency[key] =
            (this.currency["EUR"] / this.currency[key]) * this.currency["RUB"];
        }

        if (key === "EUR") {
          rubCurrency[key] = this.currency["RUB"];
        }
      }
      return rubCurrency;
    }
  }
};
</script>
