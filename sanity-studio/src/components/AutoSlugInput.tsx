import {useEffect} from 'react'
import {set, useFormValue, type SlugInputProps} from 'sanity'
import {slugify} from '../lib/slugify' // same function your frontend uses

export function AutoSlugInput(props: SlugInputProps) {
  const {value, onChange, renderDefault} = props
  const title = useFormValue(['title']) as string | undefined

  useEffect(() => {
    if (!value?.current && title) {
      onChange(set({_type: 'slug', current: slugify(title)}))
    }
  }, [title, value?.current, onChange])

  return renderDefault(props)
}
