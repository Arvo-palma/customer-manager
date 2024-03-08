import Entity from 'app/models/entity-model'

export const updateServiceFileTemplate = (entity: Entity) => {
  const attributeNames = Object.keys(entity.attributes)
  const attributeValues = Object.values(entity.attributes)

  const hasMedia = attributeValues.some((value) => value.type === 'media')

  if (hasMedia) {
    const mediaAttributes = attributeValues.filter((value) => value.type === 'media')
    const mediaAttributeNames = mediaAttributes.map(
      (attribute) => attributeNames[attributeValues.indexOf(attribute)]
    )
    const header = `import { inject } from '@adonisjs/core/build/standalone'
import CustomHttpException from 'app/exceptions/custom-http-exceptions'
import FileRepository from 'app/features/base/repositories/file-repository'
import BaseService from 'app/features/base/services/base-service'
import ${entity.displayName} from 'app/models/${entity.singularName}-model'
import { DateTime } from 'luxon'
import Update${entity.displayName}Repository from '../repositories/update-${entity.singularName}-repository'
import Update${entity.displayName}Input from '../types/update-${entity.singularName}-types'

@inject([Update${entity.displayName}Repository, FileRepository])
export default class Update${entity.displayName}Service extends BaseService<typeof ${entity.displayName}> {
  constructor(
    protected repo: Update${entity.displayName}Repository,
    private files: FileRepository
  ) {
    super(${entity.displayName})
  }

  public async execute(input: Update${entity.displayName}Input): Promise<${entity.displayName}> {\n`

    const mediaNamesContent = mediaAttributeNames.map((name) => `${name}`)

    const rowValidation = `const ${entity.singularName} = await this.repo.find(id)
    if (!${entity.singularName}) {
      throw new CustomHttpException(404, °${entity.displayName} id '§{id}' not found°)
    }\n
    `
      .replace(/§/g, '$')
      .replace(/°/g, '`')

    const mediaUpload = mediaAttributeNames.map((name) =>
      [
        `
        let ${name}ToUpdate: ${entity.displayName}['${name}'] | null = ${entity.singularName}.${name}

    if (${name}) {
      await this.files.delete(${entity.singularName}.${name})
      const ${name}Uploaded = await this.files.insert(
        °${entity.pluralName}/${name}/§{${entity.singularName}.id}-§{DateTime.now().toUnixInteger()}.§{${name}.extname}°,
        ${name}
      )

      ${name}ToUpdate = ${name}Uploaded
    }\n`
          .replace(/§/g, '$')
          .replace(/°/g, '`'),
      ].join('')
    )

    const mediaFieldsContent = mediaAttributeNames.map((name) => {
      if (mediaAttributeNames.indexOf(name) === mediaAttributeNames.length - 1) {
        return ` ${name}: ${name}ToUpdate`
      }
      return ` ${name}: ${name}ToUpdate,`
    })

    const body =
      `const { id, ${mediaNamesContent}, ...props } = input\n
    ` +
      rowValidation.concat(...mediaUpload) +
      `let updated${entity.displayName}: ${entity.displayName} | null

    try {
      updated${entity.displayName} = await this.repo.update(id, { ...props, `.concat(
        ...mediaFieldsContent
      ) +
      ` })\n`

    const footer = `} catch (error) {
      throw new CustomHttpException(400, error.message)
    }

    if (!updated${entity.displayName}) {
      throw new CustomHttpException(500, 'Data received could not be processed')
    }
    return updated${entity.displayName}
  }
}`
    return header + body + footer
  }

  return `import { inject } from '@adonisjs/core/build/standalone'
import CustomHttpException from 'app/exceptions/custom-http-exceptions'
import BaseService from 'app/features/base/services/base-service'
import ${entity.displayName} from 'app/models/${entity.singularName}-model'
import { DateTime } from 'luxon'
import Update${entity.displayName}Repository from '../repositories/update-${entity.singularName}-repository'
import Update${entity.displayName}Input from '../types/update-${entity.singularName}-types'

@inject([Update${entity.displayName}Repository])
export default class Update${entity.displayName}Service extends BaseService<typeof ${entity.displayName}> {
  constructor(protected repo: Update${entity.displayName}Repository) {
    super(${entity.displayName})
  }

  public async execute(input: Update${entity.displayName}Input): Promise<${entity.displayName}> {
    const { id, ...props } = input

    const ${entity.singularName} = await this.repo.find(id)
    if (!${entity.singularName}) {
      throw new CustomHttpException(404, §${entity.displayName} id '§§' not found§)
    }

    let updated${entity.displayName}: ${entity.displayName} | null
    try {
      updated${entity.displayName} = await this.repo.update(id, { ...props })
    } catch (error) {
      throw new CustomHttpException(400, error.message)
    }

    if (!updated${entity.displayName}) {
      throw new CustomHttpException(500, 'Data received could not be processed')
    }
    return updated${entity.displayName}
  }
}
`
    .replace('§§', '${id}')
    .replace(/§/g, '`')
}
