<template>
  <div>
    <div class="block">{{ uploadTitle }}</div>
    <el-upload
      action="/api/upload"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      class="avatar-uploader"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { server_URL } from "@/urlConfig";
export default {
  props: {
    // 标题
    uploadTitle: {
      type: String,
      default: "",
    },
    // 图片的地址
    value: {
      type: String,
      type: "",
    },
  },
  computed: {
    imageUrl() {
      if (this.value) {
        return `${server_URL}${this.value}`;
      }
    },
    headers() {
      return {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      };
    },
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style>
.block {
  margin: 15px 0;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>