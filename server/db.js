import ShortUniqueId from "short-unique-id";

export const createDb = (initialValue) => {
  const uid = new ShortUniqueId({ length: 10 })
  
  let data = Array.isArray(initialValue)
    ? initialValue.map(item => ({...item, id: uid.rnd()}))
    : []

  const readAll = () => structuredClone(data);

  const readById = (id) => {
    const found = data.find(item => item.id === id)
    return found
      ? structuredClone(found)
      : null
  }

  const create = (item) => {
    const toSave = {
      ...item,
      id: uid.rnd()
    }
    data.push(toSave)
    return structuredClone(toSave)
  }

  const removeById = (id) => {
    const toRemove = readById(id)

    if (toRemove === null) {
      return null
    }

    const withoutItem = data.filter(item => item.id !== id)
    data = withoutItem
    return structuredClone(toRemove)
  }

  const updateById = (id, updates) => {
    const toUpdate = readById(id)

    if (toUpdate === null) {
      return null
    }

    const updated = { ...toUpdate, ...updates }
    const withUpdated = data.map(item => item.id === id ? updated : item)
    data = withUpdated
    return structuredClone(updated)
  }

  const replaceById = (id, updates) => {
    const toReplace = readById(id)

    if (toReplace === null) {
      return null
    }

    const withReplaced = data.map(item => item.id === id ? updates : item)
    data = withReplaced
    return structuredClone(updates)
  }

  return { readAll, readById, replaceById, updateById, removeById, create }
}