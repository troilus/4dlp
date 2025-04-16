var body = $response.body;
var url = $request.url;

if (url.includes("/common/comp/getConfig")) {
    try {
        let obj = JSON.parse(body);
        if (obj.Response && obj.Response.body && obj.Response.body["online-preview"]) {
            obj.Response.body["online-preview"]["online-preview-switch"] = "0";
        }
        body = JSON.stringify(obj);
    } catch (e) {
        console.log("Error parsing JSON: " + e);
    }
}

$done({body});
