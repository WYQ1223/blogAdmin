<template>
  <div class="app-container">
    <div class="title">文章标题</div>
    <el-input
      v-model="blogForm.title"
      placeholder="请输入文章标题"
      clearable
    ></el-input>
    <div class="title">文章编辑</div>
    <editor />
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      blogForm: {
        title: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 15px 0;
  font-weight: 100;
}
</style>