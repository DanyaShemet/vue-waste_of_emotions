<template>
  <div class="sort-menu">
    <button @click="$emit('showBalancePerDay')"  :class="sort2">День</button>
    <button>Неделя</button>
    <button>Месяц</button>
    <button>Год</button>
    <button @click="$emit('showAllBalance')">Все время</button>
  </div>
</template>

<script>
export default {
  props: ['sort'],
  data: () => ({

  }),
  computed:{
    sort2(){
        return this.sort
    }
  }
}
</script>

<style lang="scss">
  .sort-menu{
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    transition: all .4s;
    &.novisible{
      left: -300px;
    }
    button{
      cursor: pointer;
      border: 1px solid #fff;
      font-size: 30px;
      font-weight: 500;
      padding: 10px 0;
      width: 230px;
      margin-bottom: 30px;
    }
  }
</style>