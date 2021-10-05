<template>
  <div class="app-container">
    <div style="margin-top: 15px">
      <el-input
        placeholder="请输入要添加的分类，左边选择该分类的等级"
        v-model="categoryName"
        class="input-with-select blog-add-input"
        @keyup.enter.native="handleAddCategory"
        clearable
      >
        <el-select v-model="categoryGrade" slot="prepend" placeholder="请选择">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: 15px"
        @click="handleAddCategory"
        :loading="addCategoryLoading"
        >添加</el-button
      >
      <el-table :data="tableData" v-loading="tableLoading" border>
        <el-table-column
          type="index"
          label="序号"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="博客类别"
          min-width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="articleCount"
          label="文章数量"
          min-width="160"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" min-width="150" align="center">
          <template slot-scope="{ row }">
            <el-tooltip content="编辑" placement="top">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="handleModify(row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="handleDelete(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="modifyVisible"
      title="请编辑该分类信息"
      append-to-body
    >
      <el-form
        :model="categoryForm"
        ref="categoryForm"
        :rules="categoryFormRules"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" tabIndex="1"></el-input>
        </el-form-item>
        <el-form-item label="排序等级" prop="sort">
          <el-select v-model="categoryForm.order" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
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
import {
  getBlogCategory,
  addBlogCategory,
  updateOneBlogCategory,
  delBlogCategory,
  findOneBlogCategory,
} from "@/api/blogCategory";
export default {
  data() {
    return {
      categoryGrade: "1",
      categoryName: "",
      addCategoryLoading: false,
      tableData: [],
      tableLoading: false,
      modifyVisible: false,
      categoryForm: {},
      categoryFormRules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        order: [
          { required: true, message: "请输入排序等级", trigger: "blur" },
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
      getBlogCategory().then((res) => {
        this.tableData = res.data;
        this.tableLoading = false;
      });
    },
    handleAddCategory() {
      if (!this.categoryName) {
        this.$message.error("分类名称不能为空！");
      } else {
        this.addCategoryLoading = true;
        addBlogCategory({
          name: this.categoryName,
          order: this.categoryGrade,
        })
          .then(() => {
            this.addCategoryLoading = false;
            this.$message.success("添加成功");
            this.handleLoadData();
          })
          .catch(() => {
            this.addCategoryLoading = false;
          });
      }
    },
    handleModify({ id }) {
      findOneBlogCategory(id).then((res) => {
        this.categoryForm = res.data;
        console.log(res);
        this.modifyVisible = true;
      });
    },
    handleDelete({ id }) {
      this.$confirm(
        "删除该分类后，该分类下的所有文章将变成未分类状态，是否继续？",
        "是否删除该文章分类",
        {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          delBlogCategory(id).then(() => {
            this.$message.success("删除成功");
            this.handleLoadData();
          });
        })
        .catch(() => {});
    },
    handleSave() {
      this.$refs["categoryForm"].validate((valid) => {
        if (valid) {
          this.$confirm("确定修改吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.modifyLoading = true;
              updateOneBlogCategory({
                data: this.categoryForm,
                id: this.categoryForm.id,
              })
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
.blog-add-input {
  width: 450px;
  margin-bottom: 20px;
}
</style>