<template>
  <table class="responsive-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record,index) in records" :key="record.id">
        <td>{{index + 1}}</td>
        <td>{{record.amount}} &#8381;</td>
        <td>{{record.date | date('date')}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="record.recordClass">{{record.recordType}}</span>
        </td>
        <td>
          <button
            v-tooltip="'Подробнее'"
            class="btn-small btn z-depth-0 cyan"
            @click.prevent="$router.push(`/detail-record/${record.id}`)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: Array
  }
};
</script>
