<template>
  <v-layout
    column
  >
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-5 blue darken-4">
          <v-toolbar-title class="white--text">
            <h4 class="mb-5">
              Demo
            </h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form ref="form" @submit.prevent="onSubmit">
                <ValidationProvider v-slot="{ errors }" rules="required|email" name="email">
                  <v-text-field
                    v-model.trim="email"
                    :error="errors != undefined && errors.length > 0"
                    :error-count="1"
                    :error-messages="errors[0]"
                    label="Email address"
                    name="email"
                    data-vv-as="email"
                    placeholder="foo@bar.ext"
                    outlined
                  />
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" rules="required|min:8" name="password">
                  <v-text-field
                    v-model.trim="password"
                    :append-icon="e1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="e1 ? 'password' : 'text'"
                    :error="errors != undefined && errors.length > 0"
                    :error-count="1"
                    :error-messages="errors[0]"
                    label="Password"
                    name="password"
                    min="8"
                    data-vv-as="password"
                    placeholder="Password"
                    outlined
                    @click:append="() => (e1 = !e1)"
                  />
                </ValidationProvider>
                <v-layout justify-space-between>
                  <v-btn :loading="loading" class="'blue darken-4 white--text'" type="submit">
                    Login
                  </v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      valid: false,
      e1: true,
      email: '',
      password: '',
      submitted: false,
      loading: false,
      returnUrl: '',
      responseError: ''
    }
  },
  computed: {
    hasError () {
      return this.responseError !== ''
    }
  },
  methods: {
    onSubmit () {
      if (this.loading) {
        return
      }
      let hasErrors = false

      if (!this.$refs.form.validate()) {
        this.$notifier.showMessage({ content: 'Form contain errors.', color: 'warning' })
        hasErrors = true
      }
      /*
      Object.entries(this.$refs.form.errorBag).forEach((entry) => {
        if (entry[1]) {
          this.$notifier.showMessage({ content: 'Form contain errors.', color: 'warning' })
          hasErrors = true
        }
      })
      */

      if (hasErrors) {
        return
      }

      this.submitted = true
      this.loading = true
      this.responseError = ''

      this.$auth.loginWith('local', { data: { email: this.email, password: this.password } })
        .catch((error) => {
          if (error.data != null) {
            this.responseError = error.data.message
          }
          if (error.message.includes('422')) {
            this.$notifier.showMessage({ content: 'Account not found.', color: 'error' })
          } else {
            this.$notifier.showMessage({ content: 'Wops! Someting went wrong.', color: 'error' })
          }
          // eslint-disable-next-line no-console
          console.log(error)
        }).finally(() => {
          this.loading = false
          this.submitted = false
        })
    }
  }
}
</script>
