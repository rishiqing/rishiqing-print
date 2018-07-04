<template>
  <div class="doc-check">
    <div :class="[{'no-info-more': isEssay}, 'title']">
      <div class="title-content">{{ name }}</div>
      <div class="info-more" v-if="!isEssay" >
        <div class="doc-date-banner">
          <div class="doc-date-banner-wrapper clear-both-by-after">
            <div class="doc-date-banner-date">
              <p class="pull-left doc-date-banner-left">{{ dateTip.left }}</p>
              <div class="doc-date-banner-right-wrapper pull-right" v-if="isDaily">
                <p class="doc-date-banner-right-top">{{ dateTip.rightTop }}</p>
                <p class="doc-date-banner-right-bottom">{{ dateTip.rightBottom }}</p>
              </div>
              <p
                class="pull-left doc-date-banner-right"
                v-if="isWeek || isMonth">{{ dateTip.right }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="info-area">{{ info }}</div>
      <div class="body-area editor-style" v-html="xss(note)"></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import xss from '@/lib/common/xss';

export default {
  props: ['docId'],
  beforeMount() {
    this.getDetail({
      docId: this.docId,
    });
  },
  methods: {
    ...mapActions('doc', [
      'getDetail',
    ]),
    xss(content) {
      return xss(content);
    },
  },
  computed: {
    ...mapState('doc', {
      name: state => state.name,
      note: state => state.note,
    }),
    ...mapGetters('doc', [
      'info',
      'isEssay',
      'isDaily',
      'isWeek',
      'isMonth',
      'dateTip',
    ]),
  },
};
</script>
<style lang="scss" scoped>
  .doc-check {
    padding: 0 80px;
    padding-top: 57px;
    padding-bottom: 40px;
    max-width: 840px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.18);
    border-radius: 3px;
    .title {
      position: relative;
      padding: 20px 0;
      padding-right: 110px;
      border-bottom: 1px solid #eaeaea;
      &.no-info-more {
        padding-right: 0px;
        .info-more {
          display: none;
        }
      }
      .title-content {
        word-break: break-all;
        min-height: 47px;
        font-size: 1.75rem;
        color: #333;
      }
      .info-more {
        position: absolute;
        right: 0;
        top: 20px;
        bottom: 0;
        width: 100px;
        text-align: center;
        .doc-date-banner {
          display: inline-block;
          padding-top: 4px;
          &.disable-date-select {
            cursor: default;
          }
          p {
            font-weight: normal;
            margin-bottom: 0;
            line-height: 1;
          }
          .doc-date-banner-left {
            margin-right: 5px;
            font-size: 2.375rem;
            color: #666;
          }
          .doc-date-banner-right-top {
            margin-top: 5px;
            font-size: .875rem;
            color: #666;
          }
          .doc-date-banner-right-bottom {
            line-height: 1.15;
            font-size: .875rem;
            color: #666;
          }
          .doc-date-banner-right {
            line-height: 3.7;
            font-size: .875rem;
            color: #666;
          }
          .doc-date-banner-right-wrapper {
            text-align: right;
          }
          .doc-date-banner-set-date {
            display: none;
          }
          &.show-set-date {
            .doc-date-banner-date {
              display: none;
            }
            .doc-date-banner-set-date {
              display: block;
            }
          }
        }
      }
    }
    .content {
      .info-area {
        padding: 13px 0;
        font-size: 12px;
        color: #a3a3a3;
      }
      .body-area {
        min-height: 500px;
      }
    }
  }
  @media print {
    .doc-check {
      box-shadow: none;
      width: 100%;
      padding: 0;
      max-width: 100%;
    }
  }
</style>
