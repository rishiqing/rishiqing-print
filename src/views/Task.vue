<template>
  <div class="task-print-list">
    <table>
      <tbody>
        <tr v-for="(item, index) in printContentList" v-bind:key="index">
          <td class="task-info">{{ item.name }}</td>
          <td
            :class="['task-main', item.class]"
            v-if="item.needHtml"
            v-html="xss(item.content)"></td>
          <td :class="['task-main', item.class]" v-else>{{ item.content }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import xss from '@/lib/common/xss';
import { PrintMap } from '@/constants/task';

export default {
  props: ['taskId', 'type', 'printList'],
  computed: {
    ...mapState('task', {
      name: state => state.name,
      note: state => state.note,
    }),
    ...mapGetters('task', [
      'starCommentsString',
      'membersString',
      'subTasksString',
      'dateString',
      'fromString',
    ]),
    printContentList() {
      return this.printList.map((type) => {
        const { name } = PrintMap[type];
        return {
          name,
          content: this[type] ? this[type] : this.getPrintContent(type),
          needHtml: PrintMap[type].needHtml,
          class: PrintMap[type].class,
        };
      });
    },
  },
  beforeMount() {
    this.getTaskItem({
      type: this.type,
      taskId: this.taskId,
    });
  },
  methods: {
    ...mapActions('task', [
      'getTaskItem',
    ]),
    getPrintContent(type) {
      if (type === 'starComments') return this.starCommentsString;
      if (type === 'members') return this.membersString;
      if (type === 'subTasks') return this.subTasksString;
      if (type === 'date') return this.dateString;
      if (type === 'from') return this.fromString;
    },
    xss(content) {
      return xss(content);
    },
  },
};
</script>
<style lang="scss" scoped>
  table {
    width: 70%;
    margin: auto;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #747474;
    font-size: 14px;
    line-height: 24px;
    .task-info {
      vertical-align: top;
      width: 100px;
      background: #dcdcdc;
      font-weight: bold;
      padding: 10px 0;
      padding-left: 6px;
      border-right: 2px solid #747474;
    }
    .task-main {
      padding: 10px 6px;
      vertical-align: top;
    }
    tr + tr {
      border-top: 1px solid #747474;
    }
  }

</style>
