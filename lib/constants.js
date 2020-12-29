export const STEPS = {
  complete: 0,
  one: 1,
  two: 2,
}

export const DIRECTION = {
  prev: 0,
  next: 1,
}

export const MEME_KANVAS_NEW_TEXT = {
  id: 0,
  x: 50,
  y: 50,
  width: 50,
  height: 50,
  text: 'Oh no',
  rotation: 0,
  isDragging: false,
  fontSize: 20,
}

export const MEME_KANVAS_INITIAL_STATE = {
  template: 'https://i.imgflip.com/1if1k1.jpg?a447020',
  created_at: '1609268374',
  title: 'My Meme',
  content: [
    {
      id: 1,
      x: 150,
      y: 64,
      width: 50,
      height: 100,
      text: 'Oh no',
      rotation: 0,
      isDragging: false,
      fontSize: 30,
    },
    {
      id: 2,
      title: 'Meme 2',
      x: 366,
      y: 20,
      width: 150,
      height: 50,
      text: 'This is fine!',
      rotation: 0,
      isDragging: false,
      fontSize: 25,
    },
  ],
  images: [],
}
