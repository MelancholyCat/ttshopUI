<template>
  <div class="app-container">
    <el-row type="flex" justify="end">
      <el-button type="primary" round @click="addCommodity_type()">添加商品品类</el-button>
    </el-row>
    <el-row>
      <el-radio v-model="radio" label="all" @change="select">all</el-radio>
      <el-radio v-model="radio" label="alive" @change="select">alive</el-radio>
      <el-radio v-model="radio" label="deleted" @change="select">deleted</el-radio>
    </el-row>
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <!-- <el-table-column align="center" label="序号" width="85">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>-->
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="商品品类名" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="父品类编号" align="center">
        <template slot-scope="scope">{{ scope.row.parent }}</template>
      </el-table-column>
      <el-table-column label="父品类名" align="center">
        <template slot-scope="scope">{{ scope.row.parent_name }}</template>
      </el-table-column>
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
          <el-button type="primary" size="mini" @click="editCommodity_type(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteCommodity_type(scope.row.id)"
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
    </div>-->
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
      this.$router.push("/commodity-type/add");
    },
    editCommodity_type(id) {
      this.$router.push("/commodity-type/edit/" + id);
    },
    deleteCommodity_type(id) {
      var vm = this;
      this.axios({
        method: "GET",
        url: "http://203.195.219.146:8080/commodity-type/delete/" + id
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
          url: "http://203.195.219.146:8080/commodity-type/list"
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
          url: "http://203.195.219.146:8080/commodity-type/list"
          // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/commodity-type/list"
        }).then(function(resp) {
          vm.list = resp.data.data;
        });
      } else {
        this.axios({
          method: "GET",
          url: "http://203.195.219.146:8080/commodity-type/list/" + vm.radio
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
        url: "http://203.195.219.146:8080/commodity-type/list"
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
