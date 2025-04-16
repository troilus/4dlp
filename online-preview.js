const scriptName = "4DLP Config Modifier";
const $ = MagicJS(scriptName, "INFO");

(() => {
  if ($.isResponse) {
    const targetUrl = "https://im.4dlp.com.cn:7660/common/comp/getConfig";
    
    if ($.request.url.includes(targetUrl)) {
      try {
        let obj = JSON.parse($.response.body);
        
        // 深度遍历修改 online-preview-switch
        const modifyConfig = (config) => {
          if (typeof config !== 'object' || config === null) return;
          
          for (const key in config) {
            if (key === "online-preview-switch" && config[key] === "1") {
              $.logger.info(`修改 online-preview-switch: 1 → 0`);
              config[key] = "0";
            } else if (typeof config[key] === 'object') {
              modifyConfig(config[key]);
            }
          }
        };
        
        modifyConfig(obj);
        
        $.done({
          body: JSON.stringify(obj),
          headers: $.response.headers
        });
        
      } catch (err) {
        $.logger.error(`处理响应时出错: ${err}`);
        $.done();
      }
    } else {
      $.done();
    }
  } else {
    $.done();
  }
})();

// MagicJS 工具函数 (精简版)
function MagicJS(scriptName="MagicJS",logLevel="INFO") {
  const env = {
    isLoon: typeof $loon !== "undefined",
    isQuanX: typeof $task !== "undefined",
    isSurge: typeof $httpClient !== "undefined" && !env.isLoon
  };
  
  const logger = {
    _level: logLevel,
    _log: (msg, level="INFO") => {
      if (["ERROR", "WARNING", "INFO"].includes(level)) {
        console.log(`[${level}] ${msg}`);
      }
    },
    info: (msg) => logger._log(msg, "INFO"),
    error: (msg) => logger._log(msg, "ERROR"),
    warning: (msg) => logger._log(msg, "WARNING")
  };
  
  return {
    scriptName,
    logger,
    env,
    get isRequest() { return typeof $request !== "undefined" && typeof $response === "undefined"; },
    get isResponse() { return typeof $response !== "undefined"; },
    get request() { return $request; },
    get response() { return $response; },
    done: (value={}) => { if (typeof $done !== "undefined") $done(value); }
  };
}
