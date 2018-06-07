<template>
  <div class="appstore-cards f-clearfix" :style="{height: height + 'px'}">
    <div class="appstore-card" v-for="item in data" @click="toDetail(item.name)">
      <Card>
        <div class="appstore-card-title f-clearfix">
          <h4>{{item.alias}}</h4>
          <p>{{item.version}}</p>
        </div>
        <p class="appstore-card-brief">{{item.brief}}</p>
        <div class="appstore-card-buttoms">
          <buttons :item="item" @change="change"></buttons>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import buttons from 'components/appstore/buttons.vue'
import api from 'libs/api'
export default {
  props: ['data'],
  computed: {
    height() {
      return this.$store.getters.winHeigth - 160
    }
  },
  methods: {
    toDetail(name) {
      this.$router.push({
        path: '/appstore/detail',
        query: {
          name
        }
      })
    },
    change() {
      this.$emit('change')
    }
  },
  components: {
    buttons
  }
}
</script>
<style>
.appstore-cards {
  overflow: auto;
}
.appstore-card {
  float: left;
  cursor: pointer;
  width: 270px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.appstore-card-title {
  margin-bottom: 5px;
}
.appstore-card-title > h4 {
  float: left;
}
.appstore-card-title > p {
  float: right;
}
.appstore-card-brief {
  color: #aaa;
  margin-bottom: 5px;
}
.appstore-card-buttoms {
  text-align: right;
}
</style>

