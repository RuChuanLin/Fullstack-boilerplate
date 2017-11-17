import { FETCH_USER } from '../actions/types';
// 一個使用者是否登入，其實有分為3種狀態：未登入、已登入、登入中等待回應
// 未登入: 回傳false
// 已登入: 回傳User model
// 登入中: 回傳null，這個狀態會出現在載入頁面的一瞬間或者按下登入/登出時，等待server回傳data
// 此時UI上不該顯示「按下google登入」，也不該顯示使用者資訊。
// 登入中的狀態是預設的，所以用參數預設的語法表示
// 在未登入的情況下，action.payload會回傳空字串，使用 || 來改變成false
// 已登入的情況下回傳 User model
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
