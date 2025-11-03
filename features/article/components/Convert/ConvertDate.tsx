'use client'

import React from 'react'
import { parseISO, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import type { ConvertDateProps } from './types'

const ConvertDate: React.FC<ConvertDateProps> = ({ dateISO }) => {
  if (!dateISO) return null

  let parsedDate: Date

  try {
    parsedDate = parseISO(dateISO)
  } catch {
    return <time>Invalid date</time>
  }

  return (
    <time dateTime={dateISO}>
      {format(parsedDate, 'yyyy年MM月dd日', { locale: ja })}
    </time>
  )
}

export default ConvertDate
