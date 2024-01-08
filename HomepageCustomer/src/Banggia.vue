<script setup>
import TopBar from './TopBar.vue';
import Menu from './Menu.vue';
import BaseFooter from './BaseFooter.vue'
</script>
<template>
    <div>
      <div>
        <!-- TopBar -->
        <TopBar></TopBar>
        <!-- Menu -->
        <Menu></Menu>
        <table class="Table-list-dichvu">
          <!-- Table header -->
          <thead>
            <tr>
              <th>Tên dịch vụ</th>
              <th>Giá</th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody>
            <tr v-for="dichvu in alldichvu" :key="dichvu.MADV">
              <td>{{ dichvu.TENDV }}</td>
              <td>{{ dichvu.GIA }}</td>
            </tr>
          </tbody>
        </table>
        <!-- BaseFooter -->
        <BaseFooter></BaseFooter>
      
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

export default {
  data() {
    return {
      alldichvu: [],
    };
  },
  mounted() {
    this.fetchAlldichvu();
  },
  methods: {
    async fetchAlldichvu() {
      try {
        const response = await axios.get('http://localhost:3000/api/alldichvu');
        this.alldichvu = response.data;
      } catch (error) {
        console.error('Error fetching dichvu:', error);
      }
    }, 
    }
}
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 150px;
}

thead {
  background-color: #f2f2f2;
}

th,
td {
  padding: 10px;
  border: 1px solid hwb(0 0% 100% / 0.92);
  text-align: left;
}

th {
  font-weight: bold;
  background-color: rgb(137, 212, 200);
}

.Table-list-dichvu {
  border-color: black;
  font-size: 20px;
  background-color: rgb(137, 184, 219);
}
</style>