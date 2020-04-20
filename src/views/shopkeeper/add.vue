<template>
  <div class="app-container">
    <el-form ref="form" :model="shopkeeper" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="shopkeeper.name" placeholder="请输入内容"/>
      </el-form-item>
      <el-form-item label="头像">
        <div class="demo-image">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/picture/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="密码" placeholder="123456">
        <el-input v-model="shopkeeper.password" maxlength="32" show-password clearable />
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
    this.fatchData();
  },
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      imgUrl:'',
      shopkeeper: {
        "id":"",
        "name": "",
        "pic_url": "",
        "password": "",
        "created_time":"",
        "update_time":"",
        "is_delete":"alive"
      }
    };
  },
  methods: {
    handleAvatarSuccess(resp,file) {
      this.shopkeeper.pic_url = resp.data;
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
    fatchData() {

    },
    onSubmit() {
      var vm = this;
      this.axios({
        method: "POST",
        url:
          "http://localhost:8080/shopkeeper/add",
        data: vm.shopkeeper
      }).then(function(resp) {
        if (resp.data.code == 200) {
          vm.$notify({
            title: '成功',
            message: "添加编号为" + resp.data.data + "的店主信息成功",
            type: 'success'
          });
          // vm.$message({
          // message: '恭喜你，这是一条成功消息',
          // type: 'success'
          // });
          vm.$router.push("/shopkeeper");
          vm.$message("头像更新较慢，请耐心等候");
        } else {
          vm.$message.error("添加编号为" + resp.data.data + "的店主信息失败");
        }
      });
    },
    onCancel() {
      this.$router.push("/shop/shopkeeper/index");
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

