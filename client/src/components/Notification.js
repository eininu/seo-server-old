const sendNotification = (params) => {
  if (typeof params === "string") {
    /* global One:readonly */
    return One.helpers("jq-notify", {
      type: "success",
      icon: "fa fa-info-circle me-1",
      message: params,
    });
  } else {
    const [text, type] = [...params];
    /* global One:readonly */
    return One.helpers("jq-notify", {
      type: type ?? "success",
      icon: "fa fa-info-circle me-1",
      message: text,
    });
  }
};

export default sendNotification;
