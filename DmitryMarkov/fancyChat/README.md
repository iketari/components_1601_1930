### demo: https://dmitrymarkov.github.io/components_1601_1930/DmitryMarkov/fancyChat/

### Commands
```
pug --client chat/templates/modal.pug --extension pug.js --name modal_tmpl
pug --client chat/templates/chat.pug --extension pug.js --name chat_tmpl
sass --watch chat/sass:chat
```
### TODO

- [ ] overflow-y
- [ ] audio blink sound
- [ ] setTimeout for botik messages
- [ ] localStore username and botik use this name
- [ ] textarea auto resize with text
- [ ] chat window auto scroll
- [x] pug templates
- [x] scss file with vars and mixins
- [ ] show/hide button component
- [ ] replace emojis
- [ ] date divider
- [ ] bem styles
- [ ] event-oriented interface
- [ ] accent corners
- [ ] chat with me button closed
- [ ] my own background
- [ ] webpack conf
- [ ] generic form component with extends