<template>
  <div class="appstore-cards f-clearfix">
    <div class="appstore-card" v-for="item in data" @click="toDetail(item.name)">
      <Card>
        <div class="appstore-cards-title f-clearfix">
          <h4>{{item.alias}}</h4>
          <p>{{item.version}}</p>
        </div>
        <p class="appstore-cards-brief">{{item.brief}}</p>
        <div class="appstore-cards-buttoms">
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
.appstore-card {
  float: left;
  cursor: pointer;
  width: 270px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.appstore-cards-title {
  margin-bottom: 5px;
}
.appstore-cards-title > h4 {
  float: left;
}
.appstore-cards-title > p {
  float: right;
}
.appstore-cards-brief {
  color: #aaa;
  margin-bottom: 5px;
}
.appstore-cards-buttoms {
  text-align: right;
}
</style>

