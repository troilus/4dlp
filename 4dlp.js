const version = 'V1.0.1';

let obj = JSON.parse($response.body);

const previewSwitchPath = obj?.Response?.body?.["online-preview"];
const watermarkPath = obj?.Response?.body?.["water-mark"];

if (previewSwitchPath?.["online-preview-switch"] === "1") {
    previewSwitchPath["online-preview-switch"] = "0";
}

$done({ body: JSON.stringify(obj) });
