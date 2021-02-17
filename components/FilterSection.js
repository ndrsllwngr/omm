import { TemplateFilter } from '@/components/TemplateFilter'
import { Filter } from '@/components/Filter'
import { Sort } from '@/components/Sort'
import React from 'react'

export const FilterSection = () => {
  return (
    <div className={'flex flex-col md:flex-row justify-evenly'}>
      <TemplateFilter />
      <Filter />
      <Sort enableNotification={false} />
    </div>
  )
}
