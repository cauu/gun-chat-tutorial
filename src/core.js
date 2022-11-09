import GUN from 'gun';
import 'gun/sea'
import 'gun/axe'

// 创建一个DB实例
export const db = GUN({
  peers: [
    'http://localhost:5050/gun'
  ]
});

// 
export const user = db.user().recall({ sessionStorage: true })