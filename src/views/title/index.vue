<template>
  <div class="app-container title-wrapper">
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      v-loading="tableLoading"
    >
      <el-table-column
        type="index"
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
            :src="row.midImg2"
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
            :src="row.bigImg2"
            fit="fill"
            style="width: 100px; height: 100px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center" fixed="right">
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
    <!-- 提示和内容一行显示 -->
    <el-dialog :visible.sync="modifyVisible" title="请编辑信息" append-to-body>
      <el-form :model="infoForm" :rules="infoFormRules" ref="infoForm">
        <el-form-item label="标语" prop="title">
          <el-input
            v-model="infoForm.title"
            type="input"
            tabIndex="1"
            placeholder="请输入标语内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="infoForm.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            tabIndex="2"
            placeholder="请输入描述内容"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图" prop="midImg">
              <upload v-model="infoForm.midImg" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图" prop="bigImg">
              <upload v-model="infoForm.bigImg" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          plain
          @click="modifyVisible = false"
          >取消</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="handleSave"
          :loading="modifyLoading"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner";
import { server_URL } from "@/urlConfig";
import Upload from "@/components/Upload";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      modifyVisible: false,
      infoForm: {},
      infoFormRules: {
        title: [{ required: true, message: "请输入标语内容", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述内容", trigger: "blur" },
        ],
      },
      modifyLoading: false,
    };
  },
  created() {
    this.handleLoadData();
  },
  methods: {
    handleLoadData() {
      this.tableLoading = true;
      getBanner()
        .then((res) => {
          this.tableData = res.data;
          this.tableData.forEach((item) => {
            item.midImg2 = `${server_URL}${item.midImg}`;
            item.bigImg2 = `${server_URL}${item.bigImg}`;
          });
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleModify(data) {
      this.infoForm = { ...data };
      this.modifyVisible = true;
    },
    handleSave() {
      this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          this.$confirm("确定修改吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.modifyLoading = true;
              const temp = [...this.tableData];
              temp.forEach((item, index) => {
                if (item.id == this.infoForm.id) {
                  temp[index] = this.infoForm;
                }
              });
              setBanner(temp)
                .then(() => {
                  this.modifyLoading = false;
                  this.modifyVisible = false;
                  this.$message.success("修改成功！");
                  this.handleLoadData();
                })
                .catch(() => {
                  this.modifyLoading = false;
                });
            })
            .catch(() => {});
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: right;
}
</style>