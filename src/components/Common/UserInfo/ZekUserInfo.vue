<template>
    <div class="user-info-container" @click="toggle = !toggle" v-click-outside="close" :style="styleObject" :class="customClass">
      <div v-if="showName && namePosition != 'right'" class="user-info-details">
        <span class="user-info-username">{{ firstName }} {{ lastName }}</span>
        <span v-if="status" class="user-info-status"> {{ status }} </span>
      </div>
      <a :title="`${firstName} ${lastName}`">
        <img v-if="avatar" class="user-info-avatar" :src="avatar" alt="User Avatar" />
        <div
          v-else
          class="user-info-avatar"
          alt="avatar"
          :style="{
            backgroundColor: backgroundColor,
          }"
        >
          <span>{{ firstName[0] }} {{ lastName[0] }}</span>
        </div>
      </a>
      <div v-if="showName && namePosition == 'right'" class="user-info-details">
        <span class="user-info-username">{{ firstName }} {{ lastName }}</span>
        <span v-if="status" class="user-info-status"> {{ status }} </span>
      </div>
      <i
        v-if="showAvatarArrow && dropdownLinks?.length > 0"
        :class="toggle ? 'fa fa-angle-up' : 'fa fa-angle-down'"
        style="cursor: pointer"
      />
      <div v-if="toggle" class="user-info-dropdown" :style="dropdownCustomStyle">
        <a v-for="(link, i) in dropdownLinks" :key="i" :href="link.url" :style="dropdownLinkStyle" @click="$emit('linkClicked',link)" >
          <i v-if="link.icon" :class="link.icon" style="color: inherit"/>
          {{link.label}}
          </a>
      </div>
    </div>
  </template>
  
  <script>
 import vClickOutside from 'click-outside-vue3'
  export default {
    name: "ZekUserInfo",
    props: {
      avatar: {
        type: String,
      },
      firstName: {
        type: String,
        default: 'first'
      },
      lastName: {
        type: String,
        default: 'name'
      },
      showAvatarArrow: {
          type: Boolean,
          default: true
      },
      showName: {
        type: Boolean,
        default: true,
      },
      namePosition: {
        type: String,
        default: "right",
      },
      status: {
        type: String,
      },
      dropdownLinks: {
        type: Array,
      },
      dropdownLinkStyle: {
        type: Object,
      },
      customStyle: {
        type: Object,
      },
      dropdownCustomStyle: {
        type: Object,
      },
      customClass: {
        type: String,
        default: ''
    },
    },
    emits: ['linkClicked'],
    data() {
      return {
        toggle: false,
        backgroundColor: this.getRandomColor()
      };
    },
    computed: {
      styleObject() {
        return {
          ...this.customStyle,
        };
      },
    },
    methods: {
      getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
      },
      close() {
          this.toggle = false;
      },
    },
    directives: {
        clickOutside: vClickOutside.directive
    }
  };
  </script>
  
  <style scoped lang="scss">
  .user-info-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    height: 40px;
    position: relative;
    cursor: pointer;
  }
  .user-info-container a .user-info-avatar {
    user-select: none;
    width: 37px;
    height: 34px;
    border-radius: 50%;
    margin: 0 5px;
    box-shadow: -1px 1px 6px rgba(0, 0, 0, 0.235413);
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
    line-height: 34px;
  }
  .user-info-container .user-info-details {
    display: flex;
    flex-direction: column;
    margin: 0 5px;
  }
  .user-info-container .user-info-details .user-info-username {
    font-size: 14px;
    line-height: 17px;
    color: #333;
  }
  .user-info-container .user-info-details .user-info-status {
    font-size: 11px;
    line-height: 13px;
    color: #999;
    text-align: right;
  }
  .user-info-container .user-info-dropdown {
    position: absolute;
    top: 45px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    width: 150px;
    font-size: 16px;
  }
  .user-info-container .user-info-dropdown a {
    display: block;
    padding: 2px 5px;
    color: #333;
    text-decoration: none;
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
  .user-info-container .user-info-dropdown a i {
    margin: 0 5px;
  }
  .user-info-container .user-info-dropdown a:hover {
    background-color: #f5f5f5;
  }
  </style>
  