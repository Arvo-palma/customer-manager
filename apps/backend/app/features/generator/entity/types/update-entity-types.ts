import { Attributes } from 'app/models/entity-model'

type UpdateEntityInput = {
  displayName: string
  singularName: string
  pluralName: string
  attributes: Attributes
}

export default UpdateEntityInput
