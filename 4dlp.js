const version = 'V1.0.0';

// 解析响应内容
let obj = JSON.parse($response.body);

if (obj?.Response?.body?.["online-preview"]?.["online-preview-switch"]) {
    obj.Response.body["online-preview"]["online-preview-switch"] = "0";
    console.log(`[${version}] online-preview-switch has been set to "0"`);
} else {
    console.log(`[${version}] No online-preview-switch found or already "0"`);
}

$done({ body: JSON.stringify(obj) });
