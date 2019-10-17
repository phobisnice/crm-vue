<script>
import { Doughnut, mixins } from "vue-chartjs";

export default {
  extends: Doughnut,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object,
    charOptions: Object
  },
  mounted() {
    this.renderChart(this.chartData, this.charOptions);
  }
};
</script>
