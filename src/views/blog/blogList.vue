<template>
  <div class="app-container">
    <el-table :data="tableData" v-loading="tableLoading" width="100%" border>
      <el-table-column
        type="index"
        label="序号"
        width="70"
        align="center"
      ></el-table-column>
      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="{ row }">
          <el-popover
            placement="top-start"
            title="博客预览图"
            trigger="hover"
            width="220"
          >
            <el-image
              :src="row.thumb"
              fit="contain"
              style="width: 200px"
              :preview-src-list="srcList"
            ></el-image>
            <a
              slot="reference"
              href="#"
              target="_blank"
              @click.prevent="handleJump(row)"
              >{{ row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="文章描述"
        min-width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="scanNumber"
        label="浏览数"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="commentNumber"
        label="评论数"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="category.name"
        label="所属分类"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="200"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ handleDate(row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120" align="center">
        <template slot-scope="{ row }">
          <el-tooltip content="编辑" placement="top" :hide-after="1000">
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
    <!-- <el-pagination background layout="prev, pager, next" :total="toatl">
    </el-pagination> -->
    <div class="pag-con">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="page"
        :page-size="limit"
        :page-sizes="[1, 10, 20]"
        layout="prev, pager, next, total, ->, sizes, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getBlogList, delOneBlog } from "@/api/blog";
import { server_URL, frontEnd_URL } from "@/urlConfig";
import { formatDate } from "@/utils/tool";
export default {
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      keyword: "",
      categoryId: "",
      tableData: [],
      tableLoading: false,
      srcList: [], // 预览图地址
    };
  },
  created() {
    this.handleLoadData();
    const a = {
      id: "608cc9903cddc5584a708c46",
      title: "vue响应式原理",
      description:
        "vue通过Object.defineProperty，将对象的属性变成getter和setter，当运行getter时记录依赖，当运行setter时派发更新",
      createDate: 1619941606475,
      scanNumber: 10,
      commentNumber: 10,
      category: {
        id: "60852e6c3587f282fd5c5e80",
        name: "vue",
      },
      toc: [
        { name: "章节1", anchor: "title-1" },
        {
          name: "章节2",
          anchor: "title-2",
          children: [
            { name: "章节2-1", anchor: "title-2-1" },
            { name: "章节2-2", anchor: "title-2-2" },
          ],
        },
      ],
      thumb: "/static/upload/2021-4-25-10-25-33-23-62de35.jpg",
    };
  },
  methods: {
    handleLoadData() {
      this.tableLoading = true;
      const { page, limit, keyword, categoryId } = this;
      getBlogList({ page, limit, keyword, categoryId }).then((res) => {
        this.tableLoading = false;
        this.tableData = res.data.rows;
        this.tableData.forEach((item, index) => {
          this.tableData[index].thumb = `${server_URL}${item.thumb}`;
          this.srcList.push(item.thumb);
        });
        this.total = res.data.total;
        if (this.page > this.total) {
          this.page = this.total;
          this.handleLoadData();
        }
      });
    },
    handleJump(data) {
      window.open(`${frontEnd_URL}/article/${data.id}`);
    },
    handleModify(data) {},
    handleDelete(data) {
      this.$confirm(
        "删除文章后，该文章相关的所有评论也会一并删除，是否继续？",
        "是否删除此篇文章",
        {
          type: "warning",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(() => {
          delOneBlog(data.id).then((res) => {
            if (res.data) {
              this.$message.success("删除成功");
              if (this.page > this.total) {
                this.page = this.total;
                this.handleLoadData();
              }
              this.handleLoadData();
            }
          });
        })
        .catch(() => {});
    },
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.page = 1;
      this.handleLoadData();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.handleLoadData();
    },

    handleDate(timestamp) {
      return formatDate(timestamp);
    },
  },
};
</script>

<style>
</style>