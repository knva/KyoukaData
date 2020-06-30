<template>
  <div>
    <x-header :left-options="{showBack: true}">镜华</x-header>
    <div style="padding:0 15px;">
      <card
        v-for="(row, rindex) in rows"
        :key="rindex"
        :header="{title: '第'+row['rank']+ '位 公会名：'+row['clan_name']}"
        @click.native="cardClick(row)"
      >
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{row["member_num"]}}/30</span>
            <br />成员人数
          </div>
          <div class="vux-1px-r">
            <span>{{row["damage"]}}</span>
            <br />合计分数
          </div>
          <div class="vux-1px-r">
            <span>{{row["leader_name"]}}</span>
            <br />会长名
          </div>
          <div>
            <span>88</span>
            <br />工会头像
          </div>
        </div>
      </card>
    </div>
    <load-more tip="我是有底线的" :show-loading="false" background-color="#fbf9fe"></load-more>
    <div v-transfer-dom>
      <loading :show="loadingState" text="正在获取"></loading>
    </div>
  </div>
</template>

<script>
import {
  XTable,
  LoadMore,
  Card,
  TransferDomDirective as TransferDom
} from "vux";
import { Loading, XHeader ,Badge } from "vux";
import { defsel, allsel, linesel } from "@/api/api.js";
export default {
  directives: {
    TransferDom
  },
  components: {
    Card,
    XTable,
    LoadMore,
    Loading,
    XHeader,
    Badge 
  },
  props: {},
  data() {
    return {
      loadingState: true,
      dataList: [],
      selType: "",
      selectData: "",
      page: 0,
      rows: {},
      bossData: {
        scoreRate: [
          [1, 1, 1.1, 1.1, 1.2],
          [1.2, 1.2, 1.5, 1.7, 2]
        ],
        hp: [6000000, 8000000, 10000000, 12000000, 20000000],
        max: 2,
        baseTime: 1593464400,
        endTime: 1593964800
      }
    };
  },
  mounted() {
    if (!this.$route.params.type) {
      this.$router.push("/");
    }
    this.selType = this.$route.params.type;
    this.selectData = this.$route.params.data;
    if (this.selType == 0) {
      this.lineSelxx();
    } else {
      if (this.selectData == "") {
        this.defSelxx();
      } else {
        this.allSelxx();
      }
    }
  },
  methods: {
    defSelxx() {
      if (this.selectData == "") {
        defsel().then(res => {
          this.loadingState = false;
          this.rows = res.data;
        });
      }
    },
    lineSelxx() {
      linesel().then(res => {
        this.loadingState = false;
        this.rows = res.data;
      });
    },
    allSelxx() {
      let params = {};
      let query = 0;
      let apiName;
      setTimeout(() => {
        switch (this.selType) {
          case "按排名":
            query = parseInt(this.selectData);
            apiName = "rank/";
            break;
          case "按公会名":
            params["clanName"] = this.selectData;
            apiName = "name/";
            break;
          case "按会长名":
            params["leaderName"] = this.selectData;
            apiName = "leader/";
            break;
          case "按分数":
            query = parseInt(this.selectData);
            apiName = "score/";
            break;
          default:
            break;
        }
        if (isNaN(query)) {
          query = 0;
          this.$vux.toast.show({
            text: "参数错误",
            type: "text"
          });
        }
        allsel(apiName + query, params).then(res => {
          this.rows = res.data;
          this.loadingState = false;
        });
      }, 0);
    },
    cardClick(row) {
      this.calcHp(row.clan_name, row.damage);
    },
    calcHp(clanName, hpBase) {
      var zm = 1;
      var king = 1;
      var cc = 0.0;
      var remain = 0.0;
      var damage = 0;
      var remainHp = 0.0;
      var remainPer = 0.0;
      while (true) {
        var nowZm = zm > this.bossData.max ? this.bossData.max - 1 : zm - 1;
        cc +=
          this.bossData.scoreRate[nowZm][king - 1] * this.bossData.hp[king - 1];
        if (cc > hpBase) {
          cc -=
            this.bossData.scoreRate[nowZm][king - 1] *
            this.bossData.hp[king - 1];
          remain = (hpBase - cc) / this.bossData.scoreRate[nowZm][king - 1];
          damage += remain;
          remainPer = 1.0 - remain / this.bossData.hp[king - 1];
          remainHp = this.bossData.hp[king - 1] - remain;
          break;
        }
        damage += this.bossData.hp[king - 1];
        if (king == 5) {
          zm++;
          king = 1;
          continue;
        }
        king++;
      }
      remainPer *= 100;
      let showData =
        zm +
        "周目" +
        king +
        "王 [" +
        parseInt(remainHp) +
        "/" +
        this.bossData.hp[king - 1] +
        "] <p>进度：" +
        remainPer.toFixed(2) +
        "%</p>";
      console.log(clanName);
      console.log(showData);

      // 显示
      this.$vux.alert.show({
        title: clanName,
        content: showData,

        onShow() {
          console.log("Plugin: I'm showing");
        },
        onHide() {
          console.log("Plugin: I'm hiding");
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
@import "~vux/src/styles/1px.less";

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #ff3399;
}
</style>