const { remote } = require('electron')
const mainProcess = remote.require('./main.js')

const dirList = document.getElementById('dirList')
const files = mainProcess.listFiles(__dirname)

files.forEach(function (file) {
  const li = document.createElement('li')
  console.log(li)
  li.appendChild(document.createTextNode(file))
  console.log(dirList)
  dirList.appendChild(li)
})

const imageContainer = document.querySelector('.image-container')

const images = mainProcess.getImages(__dirname)
console.log(images)
images.forEach(function (image) {
  const img = document.createElement('img')
  img.src = image
  imageContainer.appendChild(img)
})
