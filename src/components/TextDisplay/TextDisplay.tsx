const TextDisplay = ({
  leftText,
  rightText,
  fontSize = 'text-sm',
  textColor = 'text-gray-500',
}: {
  leftText: string
  rightText: string
  fontSize?: string
  textColor?: string
}) => {
  return (
    <div className={`${fontSize} ${textColor}`}>
      <b>{leftText}</b> <span>{rightText}</span>
    </div>
  )
}

export default TextDisplay
