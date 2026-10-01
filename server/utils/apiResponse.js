/**
 * server/utils/apiResponse.js
 * 統一 API 回傳格式 (Result Pattern)
 */

class ApiResponse {
  /**
   * 成功回應
   * @param {*} data 回傳資料
   * @param {string} message 成功訊息
   * @param {object} meta 額外中繼資料 (例如分頁)
   */
  static ok(data = null, message = 'Success', meta = null) {
    const response = {
      success: true,
      message,
      data,
      errorCode: 0,
      timestamp: new Date().toISOString()
    };
    if (meta) {
      response.meta = meta;
    }
    return response;
  }

  /**
   * 失敗回應
   * @param {string} message 錯誤訊息
   * @param {number} errorCode 錯誤代碼 (預設 500)
   * @param {*} details 錯誤細節 (選填)
   */
  static fail(message = 'Internal Server Error', errorCode = 500, details = null) {
    return {
      success: false,
      message,
      data: null,
      errorCode,
      details,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = ApiResponse;
