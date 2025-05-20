// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const resultSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    result: Type.Integer()
  },
  { $id: 'Result', additionalProperties: false }
)
export const resultValidator = getValidator(resultSchema, dataValidator)
export const resultResolver = resolve({})

export const resultExternalResolver = resolve({})

// Schema for creating new entries
export const resultDataSchema = Type.Pick(resultSchema, ['name', 'result'], {
  $id: 'ResultData'
})
export const resultDataValidator = getValidator(resultDataSchema, dataValidator)
export const resultDataResolver = resolve({})

// Schema for updating existing entries
export const resultPatchSchema = Type.Partial(resultSchema, {
  $id: 'ResultPatch'
})
export const resultPatchValidator = getValidator(resultPatchSchema, dataValidator)
export const resultPatchResolver = resolve({})

// Schema for allowed query properties
export const resultQueryProperties = Type.Pick(resultSchema, ['id', 'name', 'result'])
export const resultQuerySchema = Type.Intersect(
  [
    querySyntax(resultQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export const resultQueryValidator = getValidator(resultQuerySchema, queryValidator)
export const resultQueryResolver = resolve({})
