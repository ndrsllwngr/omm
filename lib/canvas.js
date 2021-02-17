import { registerFont } from 'canvas'
import path from 'path'
import { fabric } from 'fabric'

registerFont(path.resolve('./public/assets/fonts/Anton-Regular.ttf'), { family: 'Anton' })
registerFont(path.resolve('./public/assets/fonts/Allan-Regular.ttf'), { family: 'Allan' })
registerFont(path.resolve('./public/assets/fonts/RobotoMono-Regular.ttf'), {
  family: 'Roboto Mono',
})
registerFont(path.resolve('./public/assets/fonts/ComicNeue-Regular.ttf'), {
  family: 'Comic Neue',
})

export function getFabric() {
  return fabric
}
