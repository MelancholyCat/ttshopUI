<template>
  <div class="app-container">
    <el-form ref="form" :model="type" label-width="120px">
      <!-- <el-form-item label="ID">
        <el-input v-model="type.id" disabled size="small" />
      </el-form-item> -->
      <el-form-item label="商品品类名">
        <el-input v-model="type.name" />
      </el-form-item>
      <el-form-item  label="父品类ID">
        <el-select v-model="type.parent" filterable placeholder="请选择商品品类" >
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      
      <!-- <el-form-item label="是否注销">
        <template>
          <el-radio v-model="type.is_delete" label="alive">alive</el-radio>
          <el-radio v-model="type.is_delete" label="deleted">deleted</el-radio>
        </template>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
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
      type: {
        "id": "",
        "name": "",
        "create_time": "",
        "update_time": "",
        "is_delete": "alive"
      },
      types:null,
    };
  },
  methods: {
    fatchDataById() {
      var vm = this;
      this.axios({
        method: "GET",
        url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/alivelist"
      }).then(function(resp) {
        vm.types = resp.data.data;
      });
    },
    onSubmit() {
      var vm = this;
      this.axios({
        method: "POST",
        url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/add"
        // url: "http://localhost:8080/type/add",
        // data: vm.type
      }).then(function(resp) {
        if (resp.data.code == 200) {
          vm.$message({
            message: "添加" + vm.type.id + "信息成功",
            type: "success"
          });
          vm.$router.push("/shop/commodity/type/index");
        }else{
          vm.$message.error("添加新的商品品类信息失败");
        }
      });
    },
    onCancel() {
      this.$router.push("/shop/commodity/type/index");
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

