# xp-loadjs
动态导入js，支持promise

### Usage

```js
import loadjs from 'xp-loadjs'

// single file
loadjs('https://cdn.bootcss.com/jquery/3.3.1/jquery.js')
  .then(() => {
    console.log('load success')
  })
  .catch(() => {
    console.log('load error')
  })

// custom dataset
// <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js" id="1"></script>
loadjs({
  url: 'https://cdn.bootcss.com/jquery/3.3.1/jquery.js',
  extraPropMap: {
    id: 1
  }
})

// multiple files
loadjs(['https://cdn.bootcss.com/jquery/3.3.1/jquery.js', 'https://cdn.bootcss.com/lodash.js/4.17.4/lodash.js'])
  .then(() => {
    console.log('load success')
  })
  .catch(() => {
    console.log('load error')
  })
```
