import { Attributes } from 'app/models/entity-model'

type CreateEntityInput = {
  displayName: string
  singularName: string
  pluralName: string
  attributes: Attributes
}

export default CreateEntityInput
