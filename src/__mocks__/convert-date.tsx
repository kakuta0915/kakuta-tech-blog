import React from 'react'

export const mockConvertDate = () =>
  jest.mock('@/src/components/Convert/ConvertDate', () => ({
    __esModule: true,
    default: ({ dateISO }: { dateISO: string }) => <span>{dateISO}</span>,
  }))
