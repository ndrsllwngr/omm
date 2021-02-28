import { vol } from 'memfs'
const { ufs } = require('unionfs')
import { patchFs } from 'fs-monkey'
import fs from 'fs'

// Based on this:
// https://github.com/streamich/fs-monkey/issues/139

const USE_MEMFS = process.env.NEXT_PUBLIC_USE_MEMFS

const FS_PATH = USE_MEMFS === 'true' ? '/virtual' : 'storage'

// If the application should use an in-memory filesystem -> initialize it
if (USE_MEMFS === 'true') {
  //back up original "normal" 'fs'
  const ofs = { ...fs }

  // Create a new virual volume
  vol.fromJSON(
    {
      './.keep': 'keep', // without at least 1 entry, it doesn't work
    },
    FS_PATH
  )
  // Patch file system if it has not been patched yet
  if (!ufs.fss.includes(vol)) {
    // Union/Combine virtual and original fs
    ufs.use(vol).use(ofs)
    // Patch the original fs with the new union file system to be able to use the memfs everywhere (including  external libraries)
    patchFs(ufs)
    console.log('Filesystem Patched!')
  }
}

// Wrapper so the right filesystem can be used in other files
export function customFs() {
  return fs
}

// Get a path on the custom filesystem
export function getCustomFSPath(path) {
  return FS_PATH + '/' + path
}

// Helper function to correctly remove directories from the custom filesystem (recursive deletion does not work out of the box)
export function clearDirectory(path) {
  fs.readdirSync(path).forEach((file) => {
    console.log(file)
    fs.unlinkSync(path + file)
  })
  fs.rmdirSync(path)
}
