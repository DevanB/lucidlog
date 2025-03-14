import { DreamType } from './types'

interface DreamProps {
  dream: DreamType
}

export default function Dream({ dream }: DreamProps) {
  return (
    <div>
      <p>
        <strong>Title:</strong>
        {dream.title?.toString()}
      </p>
      <p>
        <strong>Body:</strong>
        {dream.body?.toString()}
      </p>
      <p>
        <strong>Dream date:</strong>
        {dream.dream_date?.toString()}
      </p>
    </div>
  )
}
