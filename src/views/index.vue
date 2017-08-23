<template>
  <div>
    <vHead></vHead>
    <vDragLoad></vDragLoad>
    <vFoot></vFoot>
  </div>
</template>

<script>
import vHead from '../components/head.vue'
import vDragLoad from '../components/dragLoad.vue'
import vFoot from '../components/foot.vue'

export default {
  data () {
    return {
      
    }
  },
  components: {
    vHead,
    vFoot,
    vDragLoad
  }
}
</script>
<style scoped>

</style>

