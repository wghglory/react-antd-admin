import { getPagination, getById, getByIdsBatch, create, update, deleteById } from '../utils/api'

/**
 * 分页查询
 * @param {int} pageIndex 当前页
 * @param {int} pageSize  每页显示多少数据
 */
export const getOrganizations = (pageIndex = 0, pageSize) => getPagination('organizations', pageIndex, pageSize)

/**
 * 根据多个id批量获取对应的组织
 * ?id=1&id=2
 * @param {array of int} ids 
 */
export const getOrganizationsBatch = (ids) => getByIdsBatch('organizations', ids)

export const createOrganization = (model) => create('organizations', model)

export const updateOrganization = (id, model) => update('organizations', id, model)

// there is no backend api
// export const deleteOrganization = id => deleteById('organizations', id)