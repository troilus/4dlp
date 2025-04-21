const version = 'V1.0.1';

let obj = JSON.parse($response.body);

const previewSwitchPath = obj?.Response?.body?.["online-preview"];
const watermarkPath = obj?.Response?.body?.["water-mark"];
const filetranslimit = obj?.Response?.body?.["file-transfer-size-limit"];

if (previewSwitchPath?.["online-preview-switch"] === "1") {
    previewSwitchPath["online-preview-switch"] = "0";
}

if (watermarkPath?.["water-mark-switch"] === "1") {
    watermarkPath["water-mark-switch"] = "0";
}

if (watermarkPath?.["water-mark-switch-text"] === "1") {
    watermarkPath["water-mark-switch-text"] = "2";
}

if (filetranslimit?.["file-transfer-pc-size-limit"] === "2048") {
    filetranslimit["file-transfer-pc-size-limit"] = "204800";
    filetranslimit["file-transfer-mb-size-limit"] = "204800";
}


$done({ body: JSON.stringify(obj) });
