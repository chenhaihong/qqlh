import Vue from "vue";

export default function confirmLink(link, options = {}) {
  const {
    showClose = true,
    showCancelButton = true,
    closeOnClickModal = true,
  } = options;

  let title = "提示";
  let desc = `即将进入新页面，点击前往 <a class="leftMenu-comfirm-link" href='${link}' target="_blank">${link}</a>`;
  return Vue.prototype
    .$confirm(desc, title, {
      showClose,
      closeOnClickModal,
      showCancelButton,

      dangerouslyUseHTMLString: true,
      closeOnClickModal: false,
      showConfirmButton: false,
      cancelButtonText: "取消",
      type: "warning",
    })
    .catch(() => {});
}
