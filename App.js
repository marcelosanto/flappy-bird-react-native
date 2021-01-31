import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native'

import Bird from './components/Bird'
import Obstacles from './components/Obstacles'

export default function App() {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  )
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const gravity = 3
  const obstaclesWidth = 60
  const obstaclesHeight = 400
  const gap = 200

  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesLeftTimerIdTwo

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity)
      }, 30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])

  //start first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstaclesWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5)
      }, 30)

      return () => {
        clearInterval(obstaclesLeftTimerId)
      }
    } else {
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight(-Math.random() * 100)
      setScore((score) => score + 1)
    }
  }, [obstaclesLeft])

  //start second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -obstaclesWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5)
      }, 30)

      return () => {
        clearInterval(obstaclesLeftTimerIdTwo)
      }
    } else {
      setObstaclesLeftTwo(screenWidth)
      setObstaclesNegHeightTwo(-Math.random() * 100)
      setScore((score) => score + 1)
    }
  }, [obstaclesLeftTwo])

  //check for collisions
  useEffect(() => {
    console.log(obstaclesLeft)
    console.log(screenWidth / 2)
    console.log(obstaclesLeft > screenWidth / 2)
    if (
      ((birdBottom < obstaclesNegHeight + obstaclesHeight + 30 ||
        birdBottom > obstaclesNegHeight + obstaclesHeight + gap - 30) &&
        obstaclesLeft > screenWidth / 2 - 30 &&
        obstaclesLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstaclesNegHeightTwo + obstaclesHeight + 30 ||
        birdBottom > obstaclesNegHeightTwo + obstaclesHeight + gap - 30) &&
        obstaclesLeftTwo > screenWidth / 2 - 30 &&
        obstaclesLeftTwo < screenWidth / 2 + 30)
    ) {
      console.log('game over')
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesLeftTimerId)
    clearInterval(obstaclesLeftTimerIdTwo)
    setIsGameOver(true)
  }

  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50)
      console.log('jumped')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>Score: {score}</Text>}
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />

        <Obstacles
          color={'green'}
          obstaclesLeft={obstaclesLeft}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
        />

        <Obstacles
          color={'red'}
          obstaclesLeft={obstaclesLeftTwo}
          obstaclesWidth={obstaclesWidth}
          obstaclesHeight={obstaclesHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
