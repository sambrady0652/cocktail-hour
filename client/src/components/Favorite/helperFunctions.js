export const getIds = (favs) => {
  const favIds = []
  for (let fav of favs) {
    const { id } = fav
    favIds.push(id)
  }
  return favIds
}