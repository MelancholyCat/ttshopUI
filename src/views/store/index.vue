<template>
  <div class="app-container">
    <!-- <el-row type="flex" justify="end">
      <el-button type="primary" round @click="addShopkeeper()">添加店主</el-button>
    </el-row> -->
    <el-row>
      <el-radio v-model="radio" label="all" @change="select">all</el-radio>
      <el-radio v-model="radio" label="alive" @change="select">alive</el-radio>
      <el-radio v-model="radio" label="deleted" @change="select">deleted</el-radio>
    </el-row>
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <!-- <el-table-column align="center" label="序号" width="85">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column> -->
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="店主姓名" align="center">
        <template slot-scope="scope">{{ scope.row.shopkeeper_name }}</template>
      </el-table-column>
      <el-table-column label="店铺头像" align="center">
        <template slot-scope="scope">
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="60" :src="scope.row.pic_url" @error="errorHandler" :fit="fits[1]">
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
              </el-avatar>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺地址" align="center">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="联系方式" align="center">
        <template slot-scope="scope">{{ scope.row.contact }}</template>
      </el-table-column>
      <el-table-column label="总营收" align="center">
        <template slot-scope="scope">{{ scope.row.total_revenue }}</template>
      </el-table-column>
      <!-- <el-table-column label="密码" align="center">
        <template slot-scope="scope">{{ scope.row.password }}</template>
      </el-table-column>-->
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" align="center" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_delete | statusFilter">{{ scope.row.is_delete }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editStore(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteStore(scope.row.id)"
            v-show="scope.row.is_delete!='deleted'"
          >删除</el-button>
        </template>
      </el-table-column>
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
    </div> -->
  </div>
</template>

<script>
import { getList } from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
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
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      radio: 'all',
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    errorHandler() {
      return true;
    },
    // addShopkeeper(){
    //   this.$router.push("/addshopkeeper/index");
    // },
    editStore(id) {
      this.$router.push("/shop/store/edit/" + id);
    },
    deleteStore(id) {
      var vm = this;
      this.axios({
        method: "GET",
        url:
          "http://localhost:8080/store/delete/" +
          id
      }).then(function(resp) {
        if (resp.data.code == 200) {
          // 弹框
          vm.$message({
            message: "删除编号为" + id + "的店铺信息成功",
            type: "success"
          });
        } else {
          // 弹框
          vm.$message.error("删除编号为" + id + "的店铺信息失败");
        }
        vm.axios({
          method: "GET",
          url: "http://localhost:8080/store/list"
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
          url:
            "http://localhost:8080/store/list"
        }).then(function(resp) {
          vm.list = resp.data.data;
        });
      } else {
        this.axios({
          method: "GET",
          url:
            "http://localhost:8080/store/list/"+vm.radio
        }).then(function(resp) {
          vm.list = resp.data.data;
        });
      }
    },
    fetchData() {
      var vm = this;
      this.axios({
        method: "GET",
        url:
          "http://localhost:8080/store/list"
      }).then(function(resp) {
        vm.list = resp.data.data;
      });
    }
  }
};
</script>
