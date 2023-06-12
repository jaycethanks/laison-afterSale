<template>
  <div>
    <!-- prettier-ignore -->
    <div v-if="!value.name" class="icon-wrapper" ref="iconWrapper">
      <div class="icon-place-holder">
        <svg t="1642124860048" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="991" width="24" height="24"><path d="M512 46.545455a34.909091 34.909091 0 0 1 34.909091 34.90909v395.636364H954.181818a34.909091 34.909091 0 0 1 0 69.818182H546.909091v395.636364a34.909091 34.909091 0 0 1-69.818182 0v-395.636364H93.090909a34.909091 34.909091 0 0 1 0-69.818182h384v-395.636364A34.909091 34.909091 0 0 1 512 46.545455z" p-id="992" ></path></svg>
        <a-icon class="a-icon" type="edit" />
      </div>
    </div>
    <div v-else class="icon-selected-box" :style="{ backgroundColor: value.color }">
      <img :src="getIcon(value.name)" alt="" />
      <a-icon class="a-icon" type="edit" />
    </div>
    <a-modal
      :closable="false"
      :title="null"
      :footer="null"
      v-model="visible"
      :mask="false"
      ok-text="确认"
      cancel-text="取消"
      width="460px"
    >
      <div class="color-select-wrapper">
        <span style="font-weight: 600; width: 12em; display: inline-block">背景色:</span>
        <div class="color-btn" v-for="(item, index) in colors" :key="index">
          <div @click="setColor(item)" :style="{ backgroundColor: item }" class="color-item"></div>
        </div>
      </div>
      <a-input style="margin: 10px 0" placeholder="过滤 （输入拼音）" type="text" v-model="searchText" />

      <div class="icon-selected-modal-wrapper">
        <template v-for="(item, index) in filterIcons">
          <div
            :title="item.name"
            class="icon-box"
            :key="index"
            :style="{ backgroundColor: target.color }"
            @click="handleSelected(item.name)"
          >
            <img :src="item.file" />
          </div>
        </template>
      </div>
    </a-modal>
  </div>
</template>
<script>
import icons from '@/assets/flowform_icons/index.js';

export default {
  name: 'iconSelect',
  props: {
    value: {
      type: Object,
      default: {
        name: undefined,
        color: '#017ffd',
      },

      required: true,
      // validator: function (value) {
      //   return value.name && value.color
      // },
    },
  },
  model: {
    prop: 'value',
    event: 'cusEvent',
  },
  computed: {
    filterIcons() {
      const { searchText, icons } = this;
      let filterArr = new Array();

      // 过滤数组
      filterArr = icons.filter((p) => p.name.indexOf(searchText) !== -1);

      return filterArr;
    },
  },
  data() {
    return {
      searchText: '',
      visible: false,
      icons: icons,
      colors: ['#017ffd', '#62bcf4', '#1fbb7d', '#fb973f', '#f1441d', '#fc6569', '#817ef6', '#ffbc17'],
      target: {
        name: '',
        color: '#017ffd',
      },
    };
  },
  watch: {
    target: {
      handler: function () {
        this.$emit('cusEvent', this.target);
      },
    },
  },
  methods: {
    show() {
      this.target = {
        name: '',
        color: '#017ffd',
      };
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    handleSelected(iconName) {
      let iconObj = this.icons.find((it) => it.name === iconName);
      this.target.name = iconObj.name;
      this.hide();
    },
    getIcon(iconName) {
      let iconObj = this.icons.find((it) => it.name === iconName);
      return iconObj.file;
    },
    setColor(color) {
      this.target.color = color;
    },
  },
};
</script>
<style lang="css" scoped>
::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background: rgb(151, 151, 151);
}
::-webkit-scrollbar-track {
  border-radius: 50px;
  background: rgba(242, 242, 242, 0.492);
}
::-webkit-scrollbar {
  border-radius: 50px;
  width: 5px;
  height: 5px;
  overflow: auto;
  float: left;
  margin: 0 10px;
}
</style>
<style scoped lang="scss">
.icon-wrapper {
  position: relative;
  width: 64px;
  height: 64px;
  background-color: rgb(248, 248, 248);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #84c3ff;
  .a-icon {
    position: absolute;
    bottom: 3px;
    right: 3px;
    color: #84c3ff;
  }
  svg {
    fill: #84c3ff;
  }
  &:hover {
    border: 1px dashed #1890ff;

    svg {
      fill: #1890ff;
    }
    .a-icon {
      color: #1890ff;
    }
  }
}
.icon-selected-box {
  width: 64px;
  height: 64px;
  background-color: rgb(235, 235, 235);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  position: relative;
  border: 1px dashed rgba(255, 255, 255, 0);

  img {
    width: 32px;
    // height: 32px;
  }
  .a-icon {
    position: absolute;
    bottom: 3px;
    right: 3px;
    color: #f1f1f1;
  }
  &:hover {
    border: 1px dashed #1890ff;
    .a-icon {
      color: #ffffff;
    }
  }
}
.icon-selected-modal-wrapper {
  display: flex;
  overflow-y: scroll;
  max-height: 36rem;
  // width: 500px;
  // border: 1px solid red;
  // justify-content: space-between;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  .icon-box {
    cursor: pointer;
    background-color: rgb(199, 199, 199);
    border: 1px solid rgb(238, 238, 238);
    // border: 1px solid red;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    &:hover {
      background-color: #dbedff;
      transform: scale(1.1);
      transition: all 0.2s;
    }
    img {
      width: 28px;
      // height: 26px;
    }
  }
  // &:hover {
  // }
}

.color-select-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  padding: 10px;
  gap: 10px;

  .color-btn {
    .color-item {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        border: 1px solid rgb(240, 240, 240);
        transform: scale(1.2);
        transition: all 0.2s;
      }
    }
  }
}
</style>
