<template>
  <div class="app-container">
    <el-row>
      <el-radio v-model="radio" label="all" @change="select">all</el-radio>
      <el-radio v-model="radio" label="alive" @change="select">alive</el-radio>
      <el-radio v-model="radio" label="deleted" @change="select">deleted</el-radio>
    </el-row>
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID">
        <template slot-scope="scope"><span class="link-type" @click="editCommodity_type(scope.row.id)">{{ scope.row.id }}</span></template>
      </el-table-column>
      <!-- <el-table-column label="用户" align="center">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column label="商店" align="center">
        <template slot-scope="scope">{{ scope.row.storeId }}</template>
      </el-table-column> -->
      <!-- <el-table-column label="用户名" align="center">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="商店名" align="center">
        <template slot-scope="scope">{{ scope.row.storeName }}</template>
      </el-table-column> -->
      <!-- <el-table-column label="收货地址" align="center">
        <template slot-scope="scope">{{ scope.row.addressDetailId }}</template>
      </el-table-column> -->
      <!-- <el-table-column label="收货地址" align="center">
        <template slot-scope="scope">{{ scope.row.addressDetail }}</template>
      </el-table-column> -->
      <el-table-column label="总价" align="center">
        <template slot-scope="scope">{{ scope.row.totalPrice }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="支付结果" align="center" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isPay | statusFilter">{{ scope.row.isPay }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单状态" align="center" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isDelete | statusFilter">{{ scope.row.isDelete }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editCommodity_type(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteCommodity_type(scope.row.id)"
            v-show="scope.row.is_delete!='deleted'"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- <div class="block" v-show="list.length<=70">
      <el-row type="flex" justify="center">
        <el-pagination layout="prev, pager, next" :total="50" size="10"></el-pagination>
      </el-row>
    </div>
    <div class="block" v-show="list.length>70">
      <el-row type="flex" justify="center">
        <el-pagination layout="prev, pager, next" :total="1000" type="flex" justify="center" size="10"></el-pagination>
      </el-row>
    </div>-->
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        已完成: "success",
        已支付: "gray",
        已取消: "danger",
        支付成功: "success",
        未支付: "gray",
        支付失败: "danger",
        alive: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      radio: "all",
      fits: ["fill", "contain", "cover", "none", "scale-down"],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    errorHandler() {
      return true;
    },
    addCommodity_type() {
      this.$router.push("/order/add");
    },
    editCommodity_type(id) {
      this.$router.push("/order/edit/" + id);
    },
    deleteCommodity_type(id) {
      var vm = this;
      this.axios({
        method: "GET",
        // url: "http://203.195.219.146:8080/commodity-type/delete/" + id
        url: "http://localhost:8080/order/delete/" + id
        // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/delete" + id
      }).then(function(resp) {
        if (resp.data.code == 200) {
          // 弹框
          vm.$message({
            message: "删除编号为" + id + "的商品品类成功",
            type: "success"
          });
        } else {
          // 弹框
          vm.$message.error("删除编号为" + id + "的商品品类失败");
        }
        vm.axios({
          method: "GET",
          // url: "http://203.195.219.146:8080/commodity-type/list"
          url: "http://localhost:8080/order/list"
          // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/list"
        }).then(function(resp) {
          vm.list = resp.data.data;
        });
      });
    },
    select() {
      var vm = this;
      if (vm.radio == "all") {
        this.axios({
          method: "GET",
          // url: "http://203.195.219.146:8080/commodity-type/list"
          url: "http://localhost:8080/order/list"
          // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/list"
        }).then(function(resp) {
          vm.list = resp.data.data;
        });
      } else {
        this.axios({
          method: "GET",
          // url: "http://203.195.219.146:8080/commodity-type/list/" + vm.radio
          url: "http://localhost:8080/order/list/" + vm.radio
          // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/list/" + vm.radio
        }).then(function(resp) {
          if (resp.data.code == 200) {
            vm.list = resp.data.data;
          } else {
            vm.$message.error("拉取数据失败，" + resp.data.msg);
          }
        });
      }
    },
    fetchData() {
      var vm = this;
      this.axios({
        method: "GET",
        // url: "http://203.195.219.146:8080/commodity-type/list"
        url: "http://localhost:8080/order/list"
        // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/list"
      }).then(function(resp) {
        if (resp.data.code == 200) {
          vm.list = resp.data.data;
        } else {
          vm.$message.error("拉取数据失败，" + resp.data.msg);
        }
      });
    }
  }
};
</script>
