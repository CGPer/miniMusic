<template>
  <div v-show="isShow" class="message" :style="messageStyle">
    <div class="message-icon">
      <img :src="messageIcon" />
    </div>
    <div class="message-text">{{ message }}</div>
    <div class="message-close" @click="closeMessage">
      <img src="@/assets/close.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      isShow: false,
      message: "消息提醒",
      type: "success",
      duration: 3000,
      messageIcon: require("@/assets/message-success.svg"),
      successIcon: require("@/assets/message-success.svg"),
      warningIcon: require("@/assets/message-warning.svg"),
      errorIcon: require("@/assets/message-error.svg"),
      messageStyle: {},
      messageColor: "#f0f9eb",
      fontColor: "#67c23a",
    };
  },
  methods: {
    showMessage(options) {
      options.message = options.message || "消息提醒";
      options.type = options.type || "success";
      options.duration = options.duration || 3000;

      this.message = options.message;
      this.type = options.type;
      this.duration = options.duration;

      switch (this.type) {
        case "success":
          this.messageIcon = this.successIcon;
          this.messageColor = "#f0f9eb";
          this.fontColor = "#67c23a";
          break;

        case "warning":
          this.messageIcon = this.warningIcon;
          this.messageColor = "#fdf6ec";
          this.fontColor = "#e6a23c";
          break;

        case "error":
          this.messageIcon = this.errorIcon;
          this.messageColor = "#fef0f0";
          this.fontColor = "#f56c6c";
          break;
      }

      this.isShow = true;
      this.messageStyle = {
        animation: "messageCome 0.2s linear forwards",
        backgroundColor: this.messageColor,
        color: this.fontColor,
      };

      setTimeout(() => {
        this.messageStyle = {
          animation: "messageBack 0.2s linear forwards",
          backgroundColor: this.messageColor,
          color: this.fontColor,
        };
        setTimeout(() => {
          this.isShow = false;
        }, 200);
      }, this.duration);
    },

    closeMessage() {
      this.isShow = false;
    },
  },
};
</script>

<style>
.message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  padding: 10px 10px;
  width: 40%;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.message-icon {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-icon > img {
  width: 100%;
  height: 100%;
}

.message-text {
  padding: 0 10px;
  font-size: 15px;
}

.message-close {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-close > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.message-close > img:hover {
  cursor: pointer;
  transform: scale(1.2);
  box-shadow: 0 0 15px #7e57c2;
}

.message-close > img:active {
  transform: scale(1.5);
}

@keyframes messageCome {
  from {
    top: 0;
  }
  to {
    top: 3%;
  }
}

@keyframes messageBack {
  from {
    top: 3%;
  }
  to {
    top: 0;
  }
}
</style>
