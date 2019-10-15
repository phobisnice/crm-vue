<template>
  <div class="col m12 l6 mb-3">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          />
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Минимальное значение {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn btn-large z-depth-3 cyan waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      title: "",
      limit: 100
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  methods: {
    ...mapActions(["createCategory"]),
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        const category = await this.createCategory({
          title: this.title,
          limit: this.limit
        });

        this.title = "";
        this.limit = 100;
        this.$v.$reset();
        this.$emit("created", category);
        this.$message("Категория создана");
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    window.M.updateTextFields();
  }
};
</script>
