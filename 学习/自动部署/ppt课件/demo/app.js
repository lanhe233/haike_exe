const express = require('express');
const path = require('path');
const fs = require('fs');
const hljs = require('highlight.js');
const marked = require('marked');
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code, lang) => {
        let res;
        if (lang) {
            res = hljs.highlight(lang, code, true).value;
        } else {
            res = hljs.highlightAuto(code).value;
        }
        return res;
    },
});
const app = express();
app.use('/', (req, res, next) => {
    fs.readFile(path.join(__dirname, 'public/note/龙渊GM游戏通用平台node自动化集成部署.md'), 'utf-8', (err, data) => {
const html = `
    <div class="topheader">
      <a href="http://issue.lilidong.cn" target="_blank">
        <h1>西门互联</h1></a>
      <span>mdtohtml</span>
    </div>

    <div id="output">
        <div class="themes-config"></div>
        <div class="wrapper" id="outputCtt">
        ` + marked(data) + `  
        </div>
    </div>
`
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        const css = fs.readFileSync('./public/stylesheets/style.css');
        const style = `<style>${css}</style>`; 
        res.end(style + html);
     
    })
})

app.listen(3001, () => {
    console.log('server start at http://localhost:3001');
})