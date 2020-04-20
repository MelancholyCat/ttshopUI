<template>
  <div class="app-container">
    <el-row >
      <el-button type="primary" round @click="reblack()">返回</el-button>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button type="primary" round @click="addstandard(commodity_id)">添加商品规格</el-button>
    </el-row>
    <!-- <el-row>
      <el-radio v-model="radio" label="all" @change="select">所有规格</el-radio>
      <el-radio v-model="radio" label="alive" @change="select">使用中</el-radio>
      <el-radio v-model="radio" label="deleted" @change="select">未使用</el-radio>
    </el-row> -->
    <el-table :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <!-- <el-table-column align="center" label="序号" width="85">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>-->
      <el-table-column align="center" label="ID" width="50px">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="商品名" align="center">
        <template slot-scope="scope">{{ scope.row.commodityName }}</template>
      </el-table-column>
      <!-- <el-table-column label="规格描述" align="center">
        <template slot-scope="scope">{{ scope.row.type_name }}</template>
      </el-table-column>-->

      <el-table-column label="规格描述">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.detail" class="edit-input" size="small" width="100px" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >取消</el-button>
          </template>
          <span v-else>{{ scope.row.detail }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="单价" align="center">
        <template slot-scope="scope">{{ scope.row.store_name }}</template>
      </el-table-column>-->

      <el-table-column min-width="50px" label="单价">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input v-model="scope.row.unitPrice" class="edit-input" size="small" width="100px" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >取消</el-button>
          </template>
          <span v-else>{{ scope.row.unitPrice }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="商品规格" align="center" width="130">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editstandards(scope.row.id)">设置商品规格</el-button>
        </template>
      </el-table-column>-->
      <!-- <el-table-column label="密码" align="center">
        <template slot-scope="scope">{{ scope.row.password }}</template>
      </el-table-column>-->
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
      <el-table-column class-name="status-col" label="Status" align="center" width="110px">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <!-- <el-input v-model="scope.row.isDelete" class="edit-input" size="small" width="100px"/> -->
            <el-select v-model="scope.row.isDelete" placeholder="请选择">
              <el-option
                value="alive"
                label="alive">
              </el-option>
              <el-option
                value="deleted"
                label="deleted">
              </el-option>
            </el-select>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(scope.row)"
            >取消</el-button>
          </template>
          <el-tag :type="scope.row.isDelete | statusFilter" v-else>{{ scope.row.isDelete }}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editstandard(scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deletestandard(scope.row.id)"
            v-show="scope.row.is_delete!='deleted'"
          >删除</el-button>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="Actions" >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)"
          >完成</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="scope.row.edit=!scope.row.edit"
          >编辑</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="deletestandard(scope.row.id)"
            v-show="scope.row.isDelete!='deleted'"
          >删除</el-button> -->
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
      commodity_id:null,
      fits: ["fill", "contain", "cover", "none", "scale-down"]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    reblack(){
      this.$router.push("/commodity/index");
    },
    cancelEdit(standard) {
      standard.edit = false;
      // this.$router.push("/standard/index/" + standard.commodityId);
      this.fetchData();
    },
    confirmEdit(standard) {
      var vm = this;
      this.axios({
        method: "POST",
        url: "http://203.195.219.146:8080/standard/update",
        // url: "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/standard/update",
        data: standard
      }).then(function(resp) {
        if (resp.data.code == 200) {
          vm.$message({
            message: "修改" + standard.id + "信息成功",
            type: "success"
          });
          vm.$router.push("/standard/index/" + standard.commodityId);
          standard.edit = false;
          // this.fetchData();
          // console.log(standard.edit)
        } else {
          vm.$message.error("更新编号为" + standard.id + "的商品规格失败");
          standard.edit = false;
          this.fetchData();
          vm.$router.push("/standard/index/" + commodity_id);
        }
      });
      
    },
    errorHandler() {
      return true;
    },
    addstandard(id) {
      this.$router.push("/standard/add/" + id);
    },
    // editstandards(id){
    //   this.$router.push("/shop/standard/index/" + id);
    // },
    // editstandard(id) {
    //   this.$router.push("/shop/standard/edit/" + id);
    // },
    deletestandard(id) {
      var vm = this;
      this.axios({
        method: "GET",
        url: "http://203.195.219.146:8080/standard/delete/" + id
        // url:"https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/standard/delete/"+id
      }).then(function(resp) {
        if (resp.data.code == 200) {
          // 弹框
          vm.$message({
            message: "删除编号为" + id + "的商品规格成功",
            type: "success"
          });
        } else {
          // 弹框
          vm.$message.error("删除编号为" + id + "的商品规格失败");
        }
        vm.axios({
          method: "GET",
          url: "http://203.195.219.146:8080/standard/list/"+vm.commodity_id
          // url:"https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/standard/list"
        }).then(function(resp) {
          vm.list = resp.data.data;
        });
      });
    },
    select() {
      var vm = this;
      // if (vm.radio == "all") {
      this.axios({
        method: "GET",
        url: "http://203.195.219.146:8080/standard/list/"+vm.commodity_id
        // url:
        //   "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/standard/list/"+vm.commodity_id
      }).then(function(resp) {
        vm.list = resp.data.data;
      });
      // } else {
      //   this.axios({
      //     method: "GET",
      //     url: "http://203.195.219.146:8080/standard/list/" + vm.radio+"/"+vm.commodity_id
      //     // url:
      //     //   "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/standard/list/" +vm.radio+"/"+vm.commodity_id
            
      //   }).then(function(resp) {
      //     if (resp.data.code == 200) {
      //       vm.list = resp.data.data;
      //     } else {
      //       vm.$message.error("拉取数据失败，" + resp.data.msg);
      //     }
      //   });
      // }
    },
    fetchData() {
      this.commodity_id = this.$route.params.id;
      var vm = this;
      this.axios({
        method: "GET",
        url: "http://203.195.219.146:8080/standard/list/"+ vm.commodity_id
        // url:
        //   "https://www.fastmock.site/mock/06c8be06c16b30764c466badda582793/ttshop/standard/list/" + vm.commodity_id
      }).then(function(resp) {
        if (resp.data.code == 200) {
          vm.list = resp.data.data;
          //   console.log(vm.list);
        } else {
          vm.$message.error("拉取数据失败，" + resp.data.msg);
        }
      });
    }
  }
};
</script>
