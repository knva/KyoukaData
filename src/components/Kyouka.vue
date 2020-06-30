<template>
  <div>
    <x-header :left-options="{showBack: false}">镜华</x-header>

    <group title="查询方式" label-width="5em">
      <popup-picker
        title="查询方式"
        :data="selectType"
        v-model="selectNum"
        @on-show="onShow"
        @on-hide="onHide"
        @on-change="onChange"
        :placeholder="selectType[selectNum]"
      ></popup-picker>
    </group>
    <group title="查询内容">
      <x-input v-model="selectData" placeholder @on-change="onChange" :keyboard="keyMode"></x-input>
    </group>
    <div style="margin-top:15px">
      <flexbox>
        <flexbox-item>
          <div class="flex-demo">
            <x-button @click.native="lineselect">查询当前档线</x-button>
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">
            <x-button type="primary" @click.native="select">查询</x-button>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
import { XHeader, XInput, XButton } from "vux";
import { Flexbox, FlexboxItem, PopupPicker } from "vux";

export default {
  components: {
    Group,
    Cell,
    XHeader,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem,
    PopupPicker
  },
  data() {
    return {
      selectType: [["按排名", "按公会名", "按会长名", "按分数"]],
      selectNum: ["按排名"],
      selectData: "",
      keyMode:"number"
    };
  },

  methods: {
    onChange(val) {
      switch (this.selectNum[0]) {
        case "按排名":
          this.keyMode="number";
          break;
        case "按分数":
          this.keyMode="number";
          break;
        default:
          this.keyMode="";
          break;
      }
    },
    onShow() {
      console.log("on show");
    },
    onHide(type) {
      console.log("on hide", type);
    },
    select() {
      this.$router.push({
        name: "KyoukaData",
        params: { type: this.selectNum[0], data: this.selectData }
      });
    },
    lineselect() {
      this.$router.push({
        name: "KyoukaData",
        params: { type: 0, data: this.selectData }
      });
    }
  }
};
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
