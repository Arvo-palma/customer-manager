import Entity from 'app/models/entity-model'

export const postServiceFileTemplate = (entity: Entity) => {
  const attributeNames = Object.keys(entity.attributes)
  const attributeValues = Object.values(entity.attributes)

  const hasMedia = attributeValues.some((value) => value.type === 'media')

  if (hasMedia) {
    const mediaAttributes = attributeValues.filter((value) => value.type === 'media')
    const mediaAttributeNames = mediaAttributes.map(
      (attribute) => attributeNames[attributeValues.indexOf(attribute)]
    )
    const header = `import { inject } from '@adonisjs/core/build/standalone'
import FileRepository from 'app/features/base/repositories/file-repository'
import BaseService from 'app/features/base/services/base-service'
import ${entity.displayName} from 'app/models/${entity.singularName}-model'
import { DateTime } from 'luxon'
import Create${entity.displayName}Repository from '../repositories/create-${entity.singularName}-repository'
import Create${entity.displayName}Input from '../types/create-${entity.singularName}-types'

@inject([Create${entity.displayName}Repository, FileRepository])
export default class Create${entity.displayName}Service extends BaseService<typeof ${entity.displayName}> {
  constructor(
    protected repo: Create${entity.displayName}Repository,
    private files: FileRepository
  ) {
    super(${entity.displayName})
  }

  public async execute(input: Create${entity.displayName}Input): Promise<${entity.displayName}> {\n`

    const mediaNamesContent = mediaAttributeNames.map((name) => `${name},`)
    const uploadedMediaContent = mediaAttributeNames.map((name) =>
      [
        `
        let ${name}Uploaded: string | undefined = undefined
        
        if (${name}) {
        ${name}Uploaded = await this.files.insert(`,
        `°${entity.pluralName}/${name}/§{${entity.singularName}.id}-§{DateTime.now().toUnixInteger()}.§{${name}.extname}°`
          .replace(/§/g, '$')
          .replace(/°/g, '`'),
        `,
      ${name}
    )
  }\n
  `,
      ].join('')
    )
    const mediaFieldsContent = mediaAttributeNames.map((name) => {
      if (mediaAttributeNames.indexOf(name) === mediaAttributeNames.length - 1) {
        return ` ${name}: ${name}Uploaded`
      }
      return ` ${name}: ${name}Uploaded,`
    })

    const body =
      `const {`.concat(' ', ...mediaNamesContent) +
      ` ...props } = input
  const ${entity.singularName} = await this.repo.create(props)\n`.concat(...uploadedMediaContent) +
      `const updated${entity.displayName} = await this.repo.update(${entity.singularName}.id, {
      ...${entity.singularName},`.concat(...mediaFieldsContent) +
      `})

    return updated${entity.displayName}!
  }
} 
  `

    return header + body
  }

  return `import { inject } from '@adonisjs/core/build/standalone'
    import BaseService from 'app/features/base/services/base-service'
    import ${entity.displayName} from 'app/models/${entity.singularName}-model'
    import { DateTime } from 'luxon'
    import Create${entity.displayName}Repository from '../repositories/create-${entity.singularName}-repository'
    import Create${entity.displayName}Input from '../types/create-${entity.singularName}-types'
    
    @inject([Create${entity.displayName}Repository])
    export default class Create${entity.displayName}Service extends BaseService<typeof ${entity.displayName}> {
      constructor(protected repo: Create${entity.displayName}Repository) {
        super(${entity.displayName})
      }
    
      public async execute(input: Create${entity.displayName}Input): Promise<${entity.displayName}> {
    
        const ${entity.singularName} = await this.repo.create(input)
    
        return ${entity.singularName}!
      }
    }
    `
}
