const version = 'V1.0.1';

let obj = JSON.parse($response.body);

const previewSwitchPath = obj?.Response?.body?.["online-preview"];
const watermarkPath = obj?.Response?.body?.["water-mark"];

if (previewSwitchPath?.["online-preview-switch"] === "1") {
    previewSwitchPath["online-preview-switch"] = "0";
    console.log(`[${version}] online-preview-switch changed to "0"`);
}

if (watermarkPath?.["water-mark-switch"] === "1") {
    watermarkPath["water-mark-switch"] = "0";
    console.log(`[${version}] water-mark-switch changed to "0"`);
}

$done({ body: JSON.stringify(obj) });
