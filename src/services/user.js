import { getPagination, getById, getByIdsBatch, create, update, deleteById } from '../utils/api'

export const getUsers = (pageIndex = 0, pageSize) => getPagination('users', pageIndex, pageSize)

// todo：没有做客户端校验，email and phone cannot be saved to db
export const createUser = (model) => create('users', model)

export const updateUser = (id, model) => update('users', id, model)

export const deleteUser = id => deleteById('users', id)