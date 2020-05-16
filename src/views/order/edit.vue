<template>
  <div class="app-container">
    <el-form ref="form" :model="order" label-width="120px">
      <el-form-item label="ID">
        <el-input v-model="order.id" disabled size="small" />
      </el-form-item>
      <el-form-item label="用户">
        <el-input v-model="order.userName" disabled />
      </el-form-item>
      <el-form-item label="店铺">
        <el-input v-model="order.storeName" disabled />
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="order.address" />
      </el-form-item>
      <el-form-item label="选购商品列表">
        <!-- <el-input v-model="order.pickCommodityIdList" /> -->
        <el-table :data="order.pickCommodityList" element-loading-text="Loading" border fit highlight-current-row>
          <!-- <el-table-column label="Choose" align="center">
            <el-checkbox slot-scope="scope" v-model="scope.row.id"></el-checkbox>
          </el-table-column> -->
          <el-table-column label="商品名" align="center">
            <template slot-scope="scope">{{ scope.row.commodityName }}</template>
          </el-table-column>
          <el-table-column label="商品照片" align="center">
            <template slot-scope="scope">
              <div class="demo-basic--circle">
                <div class="block">
                  <el-avatar :size="60" :src="scope.row.commodityPicUrl" @error="errorHandler" :fit="fits[1]">
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                  </el-avatar>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="商品规格" align="center">
            <template slot-scope="scope">{{ scope.row.standardDetail }}</template>
          </el-table-column>
          <el-table-column label="单价" align="center">
            <template slot-scope="scope">{{ scope.row.unitPrice }}</template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">{{ scope.row.quantity }}</template>
          </el-table-column>
          <el-table-column label="总价" align="center">
            <template slot-scope="scope" >{{ scope.row.totalPrice }}</template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="总价">
        <el-input v-model="order.totalPrice" disabled />
      </el-form-item>
      <el-form-item label="支付结果">
        <template>
          <el-radio v-model="order.isPay" label="支付成功">支付成功</el-radio>
          <el-radio v-model="order.isPay" label="支付失败">支付失败</el-radio>
          <el-radio v-model="order.isPay" label="未支付">未支付</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="订单状态">
        <template>
          <el-radio v-model="order.status" label="新建">新建</el-radio>
          <el-radio v-model="order.status" label="已支付">已支付</el-radio>
          <el-radio v-model="order.status" label="已完成">已完成</el-radio>
          <el-radio v-model="order.status" label="已取消">已取消</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="是否注销">
        <template>
          <el-radio v-model="order.isDelete" label="alive">alive</el-radio>
          <el-radio v-model="order.isDelete" label="deleted">deleted</el-radio>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button order="primary" @click="onSubmit">提交</el-button>
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
    // var vm = this;
    // this.axios({
    //   method: "GET",
    //   // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-order/alivelist"
    //   // url: "http://203.195.219.146:8080/order/list/alive"
    //   url: "http://localhost:8080/order/list/alive"
    // }).then(function(resp) {
    //   vm.orders = resp.data.data;
    // });
  },
  data() {
    return {
      // urlheads: ["https://", "http://"],
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      imgUrl:"",
      order: {
        "id": "",
        "userId": "",
        "storeId": "",
        "addressDetailId": "",
        "pickCommodityList": "",
        "totalPrice": "",
        "create_time": "",
        "update_time": "",
        "isPay": "",
        "status": "",
        "is_delete": ""
      },
      // orders:null,
    };
  },
  methods: {
    fatchDataById() {
      var id = this.$route.params.id;
      var vm = this;
      this.axios({
        method: "GET",
        url: "http://localhost:8080/order/" + id
        // url: "http://203.195.219.146:8080/order/" + id
        // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-order/" + id
      }).then(function(resp) {
        vm.order = resp.data.data;
      });
    },
    onSubmit() {
      var vm = this;
      this.axios({
        method: "POST",
        // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-order/update"
        // url: "http://203.195.219.146:8080/order/update",
        url: "http://localhost:8080/order/update",
        data: vm.order
      }).then(function(resp) {
        if (resp.data.code == 200) {
          vm.$message({
            message: "修改" + vm.order.id + "信息成功",
            order: "success"
          });
          vm.$router.push("/order/index");
        }else{
          vm.$message.error("更新编号为" + vm.order.id + "的商品品类信息失败");
        }
      });
    },
    onCancel() {
      this.$router.push("/order/index");
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

