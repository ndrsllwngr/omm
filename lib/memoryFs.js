import { vol } from 'memfs'
const { ufs } = require('unionfs')
import { patchFs } from 'fs-monkey'
import fs from 'fs'

// Based on this:
// https://github.com/streamich/fs-monkey/issues/139

const MEMORY_FS_PATH = '/virtual'

//back up original 'fs'
const ofs = { ...fs }

vol.fromJSON(
  {
    './.keep': 'keep', // without at least 1 entry, it doesn't work
  },
  MEMORY_FS_PATH
)
// Patch file system if it has not been patched yet
if (!ufs.fss.includes(vol)) {
  // Union/Combine virtual and original fs
  ufs.use(vol).use(ofs)
  // Patch the original fs to be able to use the memfs everywhere (including libraries)
  patchFs(ufs)
  console.log('Filesystem Patched!')
}

export function memoryFs() {
  return fs
}

export function getMemoryFSPath(path) {
  return MEMORY_FS_PATH + '/' + path
}

export function clearDirectory(path) {
  fs.readdirSync(path).forEach((file) => {
    fs.unlinkSync(path + file)
  })
}
