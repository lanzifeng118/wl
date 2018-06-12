<template>
  <div class="login">
    <div class="login-box">
      <h3 class="login-title">管理系统</h3>
      <Form ref="form" :model="form" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="form.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('form')">登陆</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import api from 'libs/api'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      ruleInline: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
          // {
          //   type: 'string',
          //   min: 3,
          //   message: 'The password length cannot be less than 6 bits',
          //   trigger: 'blur'
          // }
        ]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return
        }
        this.axios(api.signin(this.form)).then(res => {
          let data = res.data
          console.log(data)
          if (data.code === 200) {
            let redirect = this.$route.query.redirect
            if (redirect) {
              this.$router.push(redirect)
            } else {
              this.$router.push('/home')
            }
          } else if(data.code === 101) {
            this.$Message.error('账户或密码错误')
          } 
        })
      })
    }
  }
}
</script>
<style>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #292f3b;
}
.login-box {
  width: 350px;
  margin: 200px auto;
  padding: 20px;
  background: #fff;
}
.login-title {
  text-align: center;
  margin-bottom: 15px;
}
</style>
