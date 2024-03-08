import { capitalizeFirstLetter } from 'app/helpers/capitalize-first-letter'

export const generateListTypesTemplate = (
  pluralName: string
): string => `import PaginateType from 'app/features/base/types/paginate-type'

export type List${capitalizeFirstLetter(pluralName)}Input = {
  criteria?: string
} & PaginateType`
