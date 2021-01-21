let timeoutVH

function setDocHeight() {
  timeoutVH = clearTimeout(timeoutVH)

  timeoutVH = setTimeout(() => {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight / 100}px`
    )
  }, 500)
}

window.addEventListener('resize', setDocHeight)
window.addEventListener('orientationchange', setDocHeight)

setDocHeight()
