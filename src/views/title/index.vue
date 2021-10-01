<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column
        prop="index"
        label="序号"
        width="70"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="150"
      ></el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        min-width="270"
      ></el-table-column>
      <el-table-column
        prop="midImg"
        label="中图预览"
        width="160"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-image
            :src="row.midImg"
            fit="fill"
            style="width: 100px; height: 100px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="bigImg"
        label="大图预览"
        width="180"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-image
            :src="row.midImg"
            fit="fill"
            style="width: 100px; height: 100px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="{ row }">
          <el-tooltip content="编辑" placement="top" effect="dark">
            <el-button
              type="primary"
              size="mini"
              circle
              @click="handleModify(row)"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBanner } from "@/api/banner";
import { server_URL } from "@/urlConfig";
export default {
  data() {
    return {
      tableData: [{}],
    };
  },
  created() {
    this.handleLoadData();
  },
  methods: {
    handleLoadData() {
      getBanner().then((res) => {
        // this.tableData = res.data;
      });
    },
    handleModify(data) {},
  },
};
</script>

<style>
</style>