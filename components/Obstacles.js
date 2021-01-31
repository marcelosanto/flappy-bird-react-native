import React from 'react'
import { Text, View } from 'react-native'

export default Obstacles = ({
  obstaclesLeft,
  obstaclesWidth,
  obstaclesHeight,
  gap,
  color,
  randomBottom,
}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: randomBottom + obstaclesHeight + gap,
        }}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstaclesWidth,
          height: obstaclesHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
        }}
      />
    </>
  )
}
