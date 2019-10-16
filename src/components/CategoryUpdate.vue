<template>
  <div class="col m12 l6 mb-3">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  props: {
    categories: Array
  },
  data() {
    return {
      title: "",
      limit: 100,
      current: null
    };
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  watch: {
    current(id) {
      const { title, limit } = this.categories.find(cat => cat.id === id);
      this.title = title;
      this.limit = limit;
    }
  },
  methods: {
    ...mapActions(["updateCategory"]),
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const category = {
        id: this.current,
        title: this.title,
        limit: this.limit
      };

      try {
        await this.updateCategory(category);
        this.$emit("updated", category);
        this.$message("Категория обновлена");
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    const { title, limit, id } = this.categories[0];
    this.title = title;
    this.limit = limit;
    this.current = id;
  },
  mounted() {
    const select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();

    this.$on("hook:beforeDestroy", () => {
      select.destroy();
    });
  }
};
</script>
