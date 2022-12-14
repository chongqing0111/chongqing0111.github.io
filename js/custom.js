// 存数据
// name：命名 data：数据
function saveData (name, data) {
  localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData (name, time) {
  let d = JSON.parse(localStorage.getItem(name));
  // 过期或有错误返回 0 否则返回数据
  if (d) {
    let t = Date.now() - d.time
    if (t < (time * 60 * 1000) && t > -1) return d.data;
  }
  return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用

// 读取背景
try {
  let data = loadData('blogbg', 1440)
  if (data) changeBg(data, 1)
  else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
function changeBg (s, flag) {
  let bg = document.getElementById('web_bg')
  if (s.charAt(0) == '#') {
    bg.style.backgroundColor = s
    bg.style.backgroundImage = 'none'
    console.log("测试");
    Snackbar.show({ text: '已经切换背景！', backgroundColor: '#00c4b6', actionTextColor: '#ffffff', pos: 'top-right', duration: '2000' });

  } else {
    bg.style.backgroundImage = s
    console.log("测试");
    Snackbar.show({ text: '已经切换背景！', backgroundColor: '#00c4b6', actionTextColor: '#ffffff', pos: 'top-right', duration: '2000' });
  }
  if (!flag) { saveData('blogbg', s) }
}

// 随机访问一篇文章的实现
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
  fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
      let ls = data.querySelectorAll('url loc');
      while (true) {
          let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
          if (location.href == url) continue;
          location.href = url;
          return;
      }
  })
}




