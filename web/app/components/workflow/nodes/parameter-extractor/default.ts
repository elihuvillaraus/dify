import { BlockEnum } from '../../types'
import type { NodeDefault } from '../../types'
import type { ParameterExtractorNodeType } from './types'
import { ALL_CHAT_AVAILABLE_BLOCKS, ALL_COMPLETION_AVAILABLE_BLOCKS } from '@/app/components/workflow/constants'
const i18nPrefix = 'workflow'

const nodeDefault: NodeDefault<ParameterExtractorNodeType> = {
  defaultValue: {
    query: [],
    model: {
      provider: '',
      name: '',
      mode: 'chat',
      completion_params: {
        temperature: 0.7,
      },
    },
  },
  getAvailablePrevNodes(isChatMode: boolean) {
    const nodes = isChatMode
      ? ALL_CHAT_AVAILABLE_BLOCKS
      : ALL_COMPLETION_AVAILABLE_BLOCKS.filter(type => type !== BlockEnum.End)
    return nodes
  },
  getAvailableNextNodes(isChatMode: boolean) {
    const nodes = isChatMode ? ALL_CHAT_AVAILABLE_BLOCKS : ALL_COMPLETION_AVAILABLE_BLOCKS
    return nodes
  },
  checkValid(payload: ParameterExtractorNodeType, t: any) {
    let errorMessages = ''
    if (!errorMessages && (!payload.query || payload.query.length === 0))
      errorMessages = t(`${i18nPrefix}.errorMsg.fieldRequired`, { field: t(`${i18nPrefix}.nodes.parameterExtractor.inputVar`) })

    if (!errorMessages && !payload.model.provider)
      errorMessages = t(`${i18nPrefix}.errorMsg.fieldRequired`, { field: t(`${i18nPrefix}.nodes.parameterExtractor.model`) })

    if (!errorMessages && (!payload.parameters || payload.parameters.length === 0))
      errorMessages = t(`${i18nPrefix}.errorMsg.fieldRequired`, { field: t(`${i18nPrefix}.nodes.parameterExtractor.extractParameters`) })

    return {
      isValid: !errorMessages,
      errorMessage: errorMessages,
    }
  },
}

export default nodeDefault
