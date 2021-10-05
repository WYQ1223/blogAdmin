<template>
  <div>
    <div class="article-item">
      <div class="title">文章标题</div>
      <el-input
        v-model="articleForm.title"
        placeholder="请输入文章标题"
        clearable
        maxlength="50"
        show-word-limit
      ></el-input>
    </div>
    <div class="article-item">
      <div class="title">文章编辑</div>
      <editor
        :initialValue="articleForm.editorText"
        height="calc(100vh - 300px)"
        ref="toastuiEditor"
        :options="editorOptions"
      />
    </div>
    <div class="article-item">
      <div class="title">文章描述</div>
      <el-input
        v-model="articleForm.description"
        type="textarea"
        height="200px"
        :rows="6"
      ></el-input>
    </div>
    <div class="article-item">
      <upload
        v-model="articleForm.thumb"
        uploadTitle="文章头图"
        class="article-img"
      />
    </div>
    <div class="article-item">
      <div class="title">选择分类</div>
      <el-select v-model="articleForm.categoryId" placeholder="选择分类">
        <el-option
          v-for="category in blogCategory"
          :label="category.name"
          :value="category.id"
          :key="category.id"
        ></el-option>
      </el-select>
    </div>
    <div class="article-footer">
      <el-button
        type="primary"
        @click="handlePublish"
        v-text="mode == 'add' ? '发布文章' : '确定修改'"
      ></el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/i18n/zh-cn";
import Upload from "@/components/Upload";
import { getBlogCategory } from "@/api/blogCategory";
import { addBlog, modifyBlog, findOneBlog } from "@/api/blog";
export default {
  props: {
    mode: {
      type: String,
      default: "add", // add/modify
    },
  },
  components: {
    Editor,
    Upload,
  },
  data() {
    return {
      articleId: "",
      articleForm: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        categoryId: "",
      },
      blogCategory: "",
      imageURL: "",
      editorOptions: {
        language: "zh-CN",
      },
    };
  },
  created() {
    getBlogCategory().then(({ data }) => {
      this.blogCategory = data;
    });
    if (this.mode == "modify") {
      this.articleId = this.$route.params.id;
      findOneBlog(this.articleId).then(({ data }) => {
        this.articleForm = data;
        this.articleForm.categoryId = data.category ? data.category.id : "";
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
      });
    }
  },
  methods: {
    // 发布文章
    handlePublish() {
      let htmlContent = this.$refs.toastuiEditor.invoke("getHTML");
      let markdownContent = this.$refs.toastuiEditor.invoke("getMarkdown");
      const { title, description, categoryId, thumb } = this.articleForm;
      if (
        title &&
        description &&
        htmlContent &&
        markdownContent &&
        categoryId
      ) {
        let params = {
          title,
          description,
          categoryId,
          toc: [],
          createDate: new Date().getTime(),
          htmlContent,
          thumb,
          markdownContent,
        };
        if (this.mode == "add") {
          addBlog(params).then(() => {
            this.$message.success("添加成功");
            this.$router.push("/blog/blogList");
          });
        } else {
          modifyBlog({ id: this.articleId, data: params }).then(() => {
            this.$message.success("修改成功");
            this.$router.push("/blog/blogList");
          });
        }
      } else {
        this.$message.error("请将文章信息填写完整！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.article-item {
  .title {
    margin: 15px 0;
    font-weight: 100;
  }
}
.article-footer {
  margin-top: 20px;
}
</style>