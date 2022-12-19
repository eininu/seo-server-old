const sendNotification = (text, type) => {
  /* global One:readonly */
  return One.helpers("jq-notify", {
    type: type ?? "success",
    icon: "fa fa-info-circle me-1",
    message: text,
  });
};

export default sendNotification;
