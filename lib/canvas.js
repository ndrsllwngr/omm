import { registerFont } from 'canvas'
import path from 'path'
import { fabric } from 'fabric'

// Register the fonts in for the canvas library in order to be able to use them (in the backend)
registerFont(path.resolve('./public/assets/fonts/Anton-Regular.ttf'), { family: 'Anton' })
registerFont(path.resolve('./public/assets/fonts/Allan-Regular.ttf'), { family: 'Allan' })
registerFont(path.resolve('./public/assets/fonts/RobotoMono-Regular.ttf'), {
  family: 'Roboto Mono',
})
registerFont(path.resolve('./public/assets/fonts/ComicNeue-Regular.ttf'), {
  family: 'Comic Neue',
})

// Export fabric here, so when imported from here the fonts are guaranteed to be registered
export function getFabric() {
  return fabric
}
