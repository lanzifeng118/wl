<template>
  <div class="me-password">
    <Form ref="form" :model="form" :rules="rule" :label-width="80">
      <FormItem label="原密码" prop="oldPasswd">
        <Input type="password" v-model="form.oldPasswd"></Input>
      </FormItem>
      <FormItem label="新密码" prop="passwd">
        <Input type="password" v-model="form.passwd"></Input>
      </FormItem>
      <FormItem label="确认" prop="passwdCheck">
        <Input type="password" v-model="form.passwdCheck"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit('form')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import api from 'libs/api'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'))
      } else {
        if (this.form.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.form.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.passwd) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    const validateOld = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空'))
      } else {
        callback()
      }
    }

    return {
      form: {
        passwd: '',
        passwdCheck: '',
        oldPasswd: ''
      },
      rule: {
        passwd: [{ validator: validatePass, trigger: 'blur' }],
        passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
        oldPasswd: [{ validator: validateOld, trigger: 'blur' }]
      }
    }
  },
  computed: {
    username() {
      return this.$store.getters.username
    }
  },
  created() {
    console.log(this.username)
    
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (!valid) {
          return
        }

        this.axios(api.personal.changePasswd({
          username: this.username,
          old_passwd: this.form.oldPasswd,
          new_passwd: this.form.passwd,
        })).then(res => {
          let data = res.data
          console.log(res)
          if (data.code === 101) {
            this.$Message.error('原密码有误')
          } else if (data.code === 200) {
            this.$Message.success('修改密码成功')
            this.$router.push('/me/message')
          } else {
            this.$Message.error('修改密码失败')
          }
        })
      })
    }
  }
}
</script>

<style>
.me-password {
  width: 300px;
  padding-top: 50px;
}
</style>
