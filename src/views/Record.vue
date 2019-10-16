<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Создать новую</router-link>
    </p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="item in categories" :key="item.id" :value="item.id">{{item.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p class="checkbox-row">
        <label class="checkbox-label">
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>Доход</span>
        </label>
        <label class="checkbox-label">
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        />
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        />
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >Напишите описание</span>
      </div>

      <button class="btn btn-large z-depth-3 cyan waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  name: "record",
  data() {
    return {
      loading: true,
      categories: [],
      category: null,
      type: "outcome",
      amount: 1,
      description: ""
    };
  },
  validations: {
    amount: { minValue: minValue(1) },
    description: { required }
  },
  computed: {
    ...mapGetters(["getInfo"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.getInfo.bill >= this.amount;
    }
  },
  methods: {
    ...mapActions(["fetchCategories", "createRecord", "updateInfo"]),
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.createRecord({
            categoryId: this.category,
            categoryName: this.categories.find(c => c.id === this.category)
              .title,
            amount: this.amount,
            type: this.type,
            description: this.description,
            date: new Date().toJSON()
          });

          const bill =
            this.type === "income"
              ? this.getInfo.bill + this.amount
              : this.getInfo.bill - this.amount;

          this.updateInfo({ bill });
          this.$message("Запись успешно создана");
          this.$v.$reset();
          this.amount = 1;
          this.description = "";
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$error(
          `На счете не хватает средств: ${Math.abs(
            this.amount - this.getInfo.bill
          )} руб.`
        );
      }
    }
  },
  async mounted() {
    try {
      this.categories = await this.fetchCategories();
      if (this.categories.length) {
        this.category = this.categories[0].id;
      }
    } catch (e) {
      console.log(e);
    }
    this.loading = false;

    setTimeout(() => {
      const select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();

      this.$on("hook:beforeDestroy", () => {
        select.destroy();
      });
    }, 0);
  }
};
</script>
