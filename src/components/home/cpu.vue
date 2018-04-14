<template>
  <note :data="data" type="cpu"></note>
</template>
<script>
import note from './note';
export default {
  props: ['data'],
  components: {
    note
  }
}
</script>
