import Vue from 'vue'
import { ValidationProvider, ValidationObserver, setInteractionMode, extend } from 'vee-validate'
/* eslint-disable-next-line camelcase */
import { required, min, max, email, numeric, confirmed, regex, oneOf, ext, size } from 'vee-validate/dist/rules.umd.min.js'

extend('required', required)
extend('min', min)
extend('max', max)
extend('email', email)
extend('numeric', numeric)
extend('confirmed', confirmed)
extend('regex', regex)
extend('oneOf', oneOf)
extend('ext', ext)
extend('size', size)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
setInteractionMode('lazy')
