import type {FieldProps} from 'sanity'

export function HiddenField(props: FieldProps) {
  return <div style={{display: 'none'}}>{props.renderDefault(props)}</div>
}
