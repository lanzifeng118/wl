<template>
  <div class="shop-cards f-clearfix">
    <div class="shop-card" v-for="item in data" @click="toDetail(item.app_id)">
      <Card>
        <div class="shop-cards-title f-clearfix">
          <h4>{{item.app_name}}</h4>
          <p>{{item.version}}</p>
        </div>
        <p class="shop-cards-brief">{{item.brief}}</p>
        <div class="shop-cards-buttoms">
          <Button v-if="item.install_status === '0'" type="success" size="small" @click.stop="action">安装</Button>
          <Button v-if="item.install_status === '2'" type="warning" size="small" @click.stop="action">更新</Button>
          <Button v-if="item.install_status === '1' || item.install_status === '2'" size="small" @click.stop="action">卸载</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    methods: {
      toDetail(id) {
        console.log(id)
        this.$router.push({
          path: '/shop/detail',
          query: {
            id
          }
        })
      },
      action(e) {
        // e.stoppropagation()
        console.log(e)
      }
    }
  }
</script>
<style>
.shop-card {
  float: left;
  cursor: pointer;
  width: 300px;
  margin-bottom: 10px;
  margin-right: 10px;
}
.shop-cards-title {
  margin-bottom: 5px;
}
.shop-cards-title > h4{
  float: left;
}
.shop-cards-title > p{
  float: right;
}
.shop-cards-brief {
  color: #aaa;
  margin-bottom: 5px;
}
.shop-cards-buttoms {
  text-align: right;
}
</style>

