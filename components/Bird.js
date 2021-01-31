import React, { Component } from 'react'
import { View } from 'react-native'

export default Bird = ({ birdBottom, birdLeft }) => {
  const birdWidth = 50
  const birdHeight = 60

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'blue',
        width: birdWidth,
        height: birdHeight,
        bottom: birdBottom - birdWidth / 2,
        left: birdLeft - birdHeight / 2,
      }}
    ></View>
  )
}
