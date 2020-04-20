<template>
  <div class="app-container">
    <el-form ref="form" :model="store" label-width="120px">
      <el-form-item label="店铺编号">
        <el-input v-model="store.id" disabled size="small" />
      </el-form-item>
      <el-form-item label="店名">
        <el-input v-model="store.name" />
      </el-form-item>
      <el-form-item label="店主姓名">
        <el-input v-model="store.shopkeeper_name" disabled />
      </el-form-item>
      <el-form-item label="头像">
        <div class="demo-image">
          <el-upload
            class="avatar-uploader"
            action="http://203.195.219.146:8080/picture/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="store.password" maxlength="32" show-password clearable />
      </el-form-item>
      <el-form-item label="店铺地址">
        <el-input v-model="store.address" />
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="store.contact" />
      </el-form-item>
      <el-form-item label="是否注销">
        <template>
          <el-radio v-model="store.is_delete" label="alive">alive</el-radio>
          <el-radio v-model="store.is_delete" label="deleted">deleted</el-radio>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Submit</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
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

<script>
// 发送post请求携带数据时需要导入该模块
import Qs from "qs";

export default {
  created() {
    this.fatchDataById();
  },
  data() {
    return {
      // urlheads: ["https://", "http://"],
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      imgUrl:"",
      store: {
        "id": "",
        "password": "",
        "pic_url": "",
        "name": "",
        "contact": "",
        "address": "",
        "shopkeeper_id": "",
        "shopkeeper_name": "",
        "total_revenue": "",
        "create_time": "",
        "update_time": "",
        "is_delete": ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.store.pic_url = res.data;
      this.imgUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    fatchDataById() {
      var id = this.$route.params.id;
      var vm = this;
      this.axios({
        method: "GET",
        url:
          "http://203.195.219.146:8080/store/" +
          id
      }).then(function(resp) {
        vm.store = resp.data.data;
        vm.imgUrl = vm.store.pic_url;
      });
    },
    onSubmit() {
      var vm = this;
      this.axios({
        method: "POST",
        url:
          "http://203.195.219.146:8080/store/update",
        data: vm.store
      }).then(function(resp) {
        if (resp.data.code == 200) {
          vm.$message({
            message: "修改" + vm.store.id + "信息成功",
            type: "success"
          });
          vm.$router.push("/shop/store/index");
        }else{
          vm.$message.error("更新编号为" + vm.store.id + "的店主信息失败");
        }
      });
    },
    onCancel() {
      this.$router.push("/shop/store/index");
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

