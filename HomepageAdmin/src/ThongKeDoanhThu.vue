<script setup>
import { ref, onMounted } from "vue";

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: [
      "Tháng 01",
      "Tháng 02",
      "Tháng 03",
      "Tháng 04",
      "Tháng 05",
      "Tháng 06",
      "Tháng 07",
      "Tháng 08",
      "Tháng 09",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Sales",
        data: [540, 325, 702, 620, 550, 100, 390, 653, 345, 652, 123, 764],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const selectedMonth = ref();
const months = ref([
  { month: "Tháng 01", code: "T01" },
  { month: "Tháng 02", code: "T02" },
  { month: "Tháng 03", code: "T03" },
  { month: "Tháng 04", code: "T04" },
  { month: "Tháng 05", code: "T05" },
  { month: "Tháng 06", code: "T06" },
  { month: "Tháng 07", code: "T07" },
  { month: "Tháng 08", code: "T08" },
  { month: "Tháng 09", code: "T09" },
  { month: "Tháng 10", code: "T10" },
  { month: "Tháng 11", code: "T11" },
  { month: "Tháng 12", code: "T12" },
]);
</script>

<template>
  <div style="margin-top: 38rem" class="px-8">
    <div class="flex">
      <div
        class="border-round-top border-300 border-1 h-3rem w-12rem flex justify-content-center align-items-center selected-item cursor-pointer hover:text-blue-600"
      >
        <span>Thống kê theo Tháng</span>
      </div>
      <div
        class="border-round-top border-300 border-1 h-3rem w-12rem flex justify-content-center align-items-center text-800 hover:surface-200 deselect-item hover:text-900 cursor-pointer hover:text-blue-600"
      >
        <span>Thống kê theo ngày</span>
      </div>
    </div>
    <div class="w-full bg-white border-round-bottom pt-4 shadow-1">
      <div class="card flex justify-content-end pr-3">
        <Dropdown
          v-model="selectedMonth"
          :options="months"
          optionLabel="month"
          placeholder="Chọn Tháng"
          class="w-full md:w-9rem"
        />
      </div>
      <div class="flex justify-content-center h-20rem">
        <Chart
          type="bar"
          :data="chartData"
          :options="chartOptions"
          class="flex justify-content-center bg-white p-2 h-full align-items-center"
          style="width: 32rem"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected-item {
  background-color: white;
  font-weight: 600;
  border-bottom: none;
}
.deselect-item {
  background-color: rgb(248, 248, 248);
}
</style>
